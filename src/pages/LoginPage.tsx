import { useState } from 'react'
import './LoginPage.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { googleAuthorize } from '../api/auth'

type Mode = 'login' | 'register'

export default function LoginPage() {
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      if (mode === 'login') {
        await login(email, password)
      } else {
        await register(email, password, displayName)
      }
      navigate('/', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>{mode === 'login' ? 'Sign in' : 'Create account'}</h1>

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="field">
              <label htmlFor="displayName">Display name</label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
          )}

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <div className="divider">or</div>

        <button type="button" className="google-btn" onClick={googleAuthorize}>
          Continue with Google
        </button>

        <p className="toggle">
          {mode === 'login' ? (
            <>No account? <button type="button" onClick={() => setMode('register')}>Register</button></>
          ) : (
            <>Already have an account? <button type="button" onClick={() => setMode('login')}>Sign in</button></>
          )}
        </p>
      </div>
    </div>
  )
}
