import { useState, useEffect } from 'react'
import './Navbar.css'

interface NavbarProps {
  alwaysSolid?: boolean
}

export default function Navbar({ alwaysSolid = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(alwaysSolid)
  const [menuOpen, setMenuOpen] = useState(false)

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
        <a href="/" className="nav-logo">Nomadica</a>

        <ul className="nav-links">
          <li><a href="/#about">About</a></li>
          <li><a href="/resume">Resume</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/bucket-list">Bucket List</a></li>
        </ul>

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

      <div className={`nav-mobile-drawer${menuOpen ? ' nav-mobile-drawer--open' : ''}`} aria-hidden={!menuOpen}>
        <ul>
          <li><a href="/#about" onClick={closeMenu}>About</a></li>
          <li><a href="/resume" onClick={closeMenu}>Resume</a></li>
          <li><a href="/blog" onClick={closeMenu}>Blog</a></li>
          <li><a href="/bucket-list" onClick={closeMenu}>Bucket List</a></li>
        </ul>
      </div>
    </>
  )
}
