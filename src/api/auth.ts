import { request, setAccessToken } from './client'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

interface AuthResponse {
  accessToken: string
}

export interface CurrentUser {
  id: string
  email: string
  displayName: string
  bio: string | null
  avatarUrl: string | null
  roles: string[]
}

export async function login(email: string, password: string): Promise<void> {
  const data = await request<AuthResponse>('POST', '/api/v1/auth/login', { email, password })
  setAccessToken(data.accessToken)
}

export async function register(email: string, password: string, displayName: string): Promise<void> {
  const data = await request<AuthResponse>('POST', '/api/v1/auth/register', { email, password, display_name: displayName })
  setAccessToken(data.accessToken)
}

export async function logout(): Promise<void> {
  await request('POST', '/api/v1/auth/logout')
  setAccessToken(null)
}

export async function fetchMe(): Promise<CurrentUser> {
  return request<CurrentUser>('GET', '/api/v1/auth/me')
}

export async function silentRefresh(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    })
    if (!res.ok) return false
    const data = await res.json()
    setAccessToken(data.access_token)
    return true
  } catch {
    return false
  }
}

export function googleAuthorize(): void {
  window.location.href = `${BASE_URL}/api/v1/auth/oauth/google/authorize`
}
