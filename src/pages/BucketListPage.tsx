import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { fetchBucketList } from '../services/bucketListService'
import type { BucketListData, BucketListStatus } from '../types/bucketList'
import './BucketListPage.css'

type Filter = BucketListStatus | 'all'

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all',      label: 'All' },
  { value: 'visited',  label: 'Visited' },
  { value: 'planned',  label: 'Planned' },
  { value: 'dreaming', label: 'Dreaming' },
]

const STATUS_LABELS: Record<BucketListStatus, string> = {
  visited:  'Visited',
  planned:  'Planned',
  dreaming: 'Dreaming',
}

export default function BucketListPage() {
  const [data, setData] = useState<BucketListData | null>(null)
  const [filter, setFilter] = useState<Filter>('all')
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchBucketList().then(setData).catch(() => setError(true))
  }, [])

  if (error) return <div className="bl-loading">Failed to load bucket list.</div>
  if (!data) return <div className="bl-loading">Loading...</div>

  const { items } = data
  const visited  = items.filter(i => i.status === 'visited').length
  const planned  = items.filter(i => i.status === 'planned').length
  const dreaming = items.filter(i => i.status === 'dreaming').length

  const filtered = filter === 'all' ? items : items.filter(i => i.status === filter)

  return (
    <div className="bl-page">
      <Navbar alwaysSolid />

      {/* ── Header ── */}
      <header className="bl-header">
        <div className="bl-header-inner">
          <p className="bl-eyebrow">Bucket List</p>
          <h1 className="bl-title">Places I need<br />to see before I die.</h1>
          <p className="bl-subtitle">
            An honest, living list — the places visited, the ones being planned,
            and the ones still waiting.
          </p>
          <div className="bl-stats">
            <div className="bl-stat">
              <span className="bl-stat-number">{visited}</span>
              <span className="bl-stat-label">Visited</span>
            </div>
            <div className="bl-stat-divider" />
            <div className="bl-stat">
              <span className="bl-stat-number">{planned}</span>
              <span className="bl-stat-label">Planned</span>
            </div>
            <div className="bl-stat-divider" />
            <div className="bl-stat">
              <span className="bl-stat-number">{dreaming}</span>
              <span className="bl-stat-label">Dreaming</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Filter bar ── */}
      <div className="bl-filters">
        {FILTERS.map(f => (
          <button
            key={f.value}
            className={`bl-filter-btn${filter === f.value ? ' bl-filter-btn--active' : ''}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
            {f.value !== 'all' && (
              <span className="bl-filter-count">
                {items.filter(i => i.status === f.value).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Grid ── */}
      <div className="bl-grid-wrapper">
        <div className="bl-grid">
          {filtered.map(item => (
            <article key={item.id} className={`bl-card bl-card--${item.status}`}>
              <div
                className="bl-card-image"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="bl-card-overlay" />
              <div className="bl-card-body">
                <span className={`bl-badge bl-badge--${item.status}`}>
                  {item.status === 'visited' && '✓ '}
                  {STATUS_LABELS[item.status]}
                  {item.year ? ` · ${item.year}` : ''}
                </span>
                <div className="bl-card-footer">
                  <div>
                    <h2 className="bl-card-destination">{item.destination}</h2>
                    <p className="bl-card-country">{item.country}</p>
                  </div>
                </div>
              </div>
              <div className="bl-card-description">
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
