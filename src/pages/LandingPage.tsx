import './LandingPage.css'

export default function LandingPage() {
  return (
    <main className="landing">
      <nav className="nav">
        <span className="nav-logo">Nomadica</span>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#bucket-list">Bucket List</a></li>
          <li><a href="#resume">Resume</a></li>
        </ul>
      </nav>

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
