import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setAccessToken } from '../api/client'
import { useAuth } from '../context/AuthContext'

export default function OAuthCallbackPage() {
  const navigate = useNavigate()
  const { setUserFromToken } = useAuth()

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1))
    const token = hash.get('access_token')

    if (!token) {
      navigate('/login', { replace: true })
      return
    }

    setAccessToken(token)
    setUserFromToken()
      .then(() => navigate('/', { replace: true }))
      .catch(() => navigate('/login', { replace: true }))
  }, [])

  return null
}
