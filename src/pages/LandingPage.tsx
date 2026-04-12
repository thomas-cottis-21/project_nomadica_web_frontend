import { useState, useEffect } from 'react'
import './LandingPage.css'

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.5)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <main className="landing">
      <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <span className="nav-logo">Nomadica</span>

        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#bucket-list">Bucket List</a></li>
          <li><a href="#resume">Resume</a></li>
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
          <li><a href="#about" onClick={closeMenu}>About</a></li>
          <li><a href="#blog" onClick={closeMenu}>Blog</a></li>
          <li><a href="#bucket-list" onClick={closeMenu}>Bucket List</a></li>
          <li><a href="#resume" onClick={closeMenu}>Resume</a></li>
        </ul>
      </div>

      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">Travel · Code · Explore</p>
          <h1 className="hero-title">
            The world is too big<br />to stay in one place.
          </h1>
          <p className="hero-subtitle">
            A developer's journal of places visited, lessons learned,
            and destinations yet to come.
          </p>
          <div className="hero-cta">
            <a href="#blog" className="btn-primary">Read the Blog</a>
            <a href="#bucket-list" className="btn-ghost">Bucket List</a>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <section id="about" className="about">
        <div className="about-inner">
          <p className="section-label">About</p>
          <h2>Developer by day,<br />wanderer by nature.</h2>
          <p>
            I'm a software engineer with a one-way ticket mentality. This site is
            where I document the places I've been, the code I write on the road,
            and the long list of places I still need to see.
          </p>
        </div>
      </section>
    </main>
  )
}
