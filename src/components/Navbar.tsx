import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

const APP_VERSION = import.meta.env.VITE_APP_VERSION ?? '0.0.0'

interface NavbarProps {
  alwaysSolid?: boolean
}

export default function Navbar({ alwaysSolid = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(alwaysSolid)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user } = useAuth()

  const isEditor = user?.roles.includes('EDITOR') ?? false

  useEffect(() => {
    if (alwaysSolid) return
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.5)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [alwaysSolid])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <a href="/" className="nav-logo">Project Nomadica</a>

        <ul className="nav-links">
          <li><a href="/#about">About</a></li>
          <li><a href="/resume">Resume</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/bucket-list">Bucket List</a></li>
          {isEditor && <li><Link to="/editor/new">New Post</Link></li>}
        </ul>

        <div className="nav-auth">
          {user ? (
            <Link to="/profile" className="nav-profile">
              {user.avatarUrl
                ? <img src={user.avatarUrl} alt={user.displayName} className="nav-avatar" />
                : <span className="nav-avatar nav-avatar--initials">
                    {user.displayName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                  </span>
              }
            </Link>
          ) : (
            <Link to="/login" className="nav-signin">Sign in</Link>
          )}
        </div>

        <button
          className={`nav-hamburger${menuOpen ? ' nav-hamburger--open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div
        className={`nav-mobile-overlay${menuOpen ? ' nav-mobile-overlay--open' : ''}`}
        onClick={closeMenu}
        aria-hidden
      />
      <div className={`nav-mobile-drawer${menuOpen ? ' nav-mobile-drawer--open' : ''}`} aria-hidden={!menuOpen}>
        <ul>
          <li><a href="/#about" onClick={closeMenu}>About</a></li>
          <li><a href="/resume" onClick={closeMenu}>Resume</a></li>
          <li><a href="/blog" onClick={closeMenu}>Blog</a></li>
          <li><a href="/bucket-list" onClick={closeMenu}>Bucket List</a></li>
          {isEditor && <li><Link to="/editor/new" onClick={closeMenu}>New Post</Link></li>}
          {user
            ? <li><Link to="/profile" onClick={closeMenu}>Profile</Link></li>
            : <li><Link to="/login" onClick={closeMenu}>Sign in</Link></li>
          }
        </ul>
        {user && (
          <div className="nav-mobile-user">
            <Link to="/profile" className="nav-mobile-avatar" onClick={closeMenu}>
              {user.avatarUrl
                ? <img src={user.avatarUrl} alt={user.displayName} />
                : <span>{user.displayName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}</span>
              }
            </Link>
            <p className="nav-mobile-signed-in">Signed in as</p>
            <p className="nav-mobile-email">{user.email}</p>
          </div>
        )}
        <span className="nav-mobile-version">v{APP_VERSION}|FORMA_SYSTEMS</span>
      </div>
    </>
  )
}
