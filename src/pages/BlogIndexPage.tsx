import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { fetchPosts } from '../services/blogService'
import type { BlogPostSummary } from '../types/blog'
import './BlogIndexPage.css'

export default function BlogIndexPage() {
  const [posts, setPosts] = useState<BlogPostSummary[] | null>(null)
  const [activeTag, setActiveTag] = useState<string>('all')
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchPosts().then(setPosts).catch(() => setError(true))
  }, [])

  if (error) return <div className="blog-loading">Failed to load posts.</div>
  if (!posts) return <div className="blog-loading">Loading...</div>

  const allTags = ['all', ...Array.from(new Set(posts.flatMap(p => p.tags)))]
  const filtered = activeTag === 'all' ? posts : posts.filter(p => p.tags.includes(activeTag))

  const [featured, ...rest] = filtered

  return (
    <div className="blog-index-page">
      <Navbar alwaysSolid />

      {/* ── Header ── */}
      <header className="blog-header">
        <div className="blog-header-inner">
          <p className="blog-eyebrow">Blog</p>
          <h1 className="blog-header-title">Notes from the road.</h1>
          <p className="blog-header-subtitle">
            Travel dispatches, dev reflections, and the occasional opinion
            formed somewhere between check-in and departure.
          </p>
        </div>
      </header>

      {/* ── Tag filter ── */}
      <div className="blog-filters">
        {allTags.map(tag => (
          <button
            key={tag}
            className={`blog-filter-btn${activeTag === tag ? ' blog-filter-btn--active' : ''}`}
            onClick={() => setActiveTag(tag)}
          >
            {tag === 'all' ? 'All Posts' : tag}
          </button>
        ))}
      </div>

      <div className="blog-content">
        {/* ── Featured post ── */}
        {featured && (
          <Link to={`/blog/${featured.slug}`} className="blog-featured">
            <div
              className="blog-featured-image"
              style={{ backgroundImage: `url(${featured.coverImage})` }}
            />
            <div className="blog-featured-overlay" />
            <div className="blog-featured-body">
              <div className="blog-featured-tags">
                {featured.tags.map(tag => (
                  <span key={tag} className="blog-tag">{tag}</span>
                ))}
              </div>
              <h2 className="blog-featured-title">{featured.title}</h2>
              <p className="blog-featured-excerpt">{featured.excerpt}</p>
              <p className="blog-featured-meta">
                {formatDate(featured.publishedAt)} · {featured.readingTime} min read
              </p>
            </div>
          </Link>
        )}

        {/* ── Post grid ── */}
        {rest.length > 0 && (
          <div className="blog-grid">
            {rest.map(post => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="blog-card">
                <div
                  className="blog-card-image"
                  style={{ backgroundImage: `url(${post.coverImage})` }}
                />
                <div className="blog-card-body">
                  <div className="blog-card-tags">
                    {post.tags.map(tag => (
                      <span key={tag} className="blog-tag blog-tag--dark">{tag}</span>
                    ))}
                  </div>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <p className="blog-card-meta">
                    {formatDate(post.publishedAt)} · {post.readingTime} min read
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
