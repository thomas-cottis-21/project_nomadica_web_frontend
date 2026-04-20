import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { fetchMe, login, logout, register, silentRefresh, type CurrentUser } from '../api/auth'

interface AuthContextValue {
  user: CurrentUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, displayName: string) => Promise<void>
  logout: () => Promise<void>
  setUserFromToken: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    silentRefresh()
      .then(ok => (ok ? fetchMe() : null))
      .then(me => setUser(me))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false))
  }, [])

  async function handleLogin(email: string, password: string) {
    await login(email, password)
    const me = await fetchMe()
    setUser(me)
  }

  async function handleRegister(email: string, password: string, displayName: string) {
    await register(email, password, displayName)
    const me = await fetchMe()
    setUser(me)
  }

  async function handleLogout() {
    await logout()
    setUser(null)
  }

  async function setUserFromToken() {
    const me = await fetchMe()
    setUser(me)
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login: handleLogin,
      register: handleRegister,
      logout: handleLogout,
      setUserFromToken,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
