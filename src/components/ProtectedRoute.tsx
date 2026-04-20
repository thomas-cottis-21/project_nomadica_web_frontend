import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  requiredRole?: string
}

export default function ProtectedRoute({ children, requiredRole }: Props) {
  const { user, isLoading } = useAuth()

  if (isLoading) return null

  if (!user) return <Navigate to="/login" replace />

  if (requiredRole && !user.roles.includes(requiredRole)) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
