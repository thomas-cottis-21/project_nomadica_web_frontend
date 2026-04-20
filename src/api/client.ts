const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

let accessToken: string | null = null

export function getAccessToken(): string | null {
  return accessToken
}

export function setAccessToken(token: string | null): void {
  accessToken = token
}

async function refresh(): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/api/v1/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  })
  if (!res.ok) return false
  const data = transformKeys(await res.json()) as { accessToken: string }
  setAccessToken(data.accessToken)
  return true
}

function toCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
}

function transformKeys(val: unknown): unknown {
  if (Array.isArray(val)) return val.map(transformKeys)
  if (val !== null && typeof val === 'object') {
    return Object.fromEntries(
      Object.entries(val as Record<string, unknown>).map(([k, v]) => [toCamel(k), transformKeys(v)])
    )
  }
  return val
}

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE'

export async function request<T>(
  method: Method,
  path: string,
  body?: unknown,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    credentials: 'include',
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (res.status === 401) {
    const refreshed = await refresh()
    if (!refreshed) {
      setAccessToken(null)
      window.location.href = '/login'
      throw new Error('Session expired')
    }
    return request<T>(method, path, body)
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(error.detail ?? 'Request failed')
  }

  if (res.status === 204) return undefined as T
  return transformKeys(await res.json()) as T
}
