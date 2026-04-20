import { useNavigate } from 'react-router-dom'
import './ProfilePage.css'
import { useAuth } from '../context/AuthContext'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) return null

  const initials = user.displayName
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  async function handleLogout() {
    await logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="profile-page">
      <button className="profile-back" onClick={() => navigate(-1)}>← Back</button>
      <div className="profile-card">
        <div className="profile-avatar">
          {user.avatarUrl
            ? <img src={user.avatarUrl} alt={user.displayName} />
            : <span className="profile-initials">{initials}</span>
          }
        </div>

        <div className="profile-info">
          <h1>{user.displayName}</h1>
          <p className="profile-email">{user.email}</p>
          {user.bio && <p className="profile-bio">{user.bio}</p>}

          <div className="profile-roles">
            {user.roles.map(role => (
              <span key={role} className="role-badge">{role}</span>
            ))}
          </div>
        </div>

        <p className="profile-edit-notice">
          Profile editing is coming soon.
        </p>

        <button className="logout-btn" onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </div>
  )
}
