import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { fetchBucketList } from '../api/bucketList'
import type { BucketListItem } from '../types/bucketList'
import './BucketListPage.css'

type Filter = 'all' | string

const BASE_FILTERS = [{ value: 'all', label: 'All' }]

function statusName(item: BucketListItem): string {
  return item.status?.name.toLowerCase() ?? ''
}

export default function BucketListPage() {
  const [items, setItems] = useState<BucketListItem[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchBucketList().then(setItems).catch(() => setError(true))
  }, [])

  if (error) return <div className="bl-loading">Failed to load bucket list.</div>
  if (!items.length) return <div className="bl-loading">Loading...</div>

  const uniqueStatuses = Array.from(
    new Map(items.filter(i => i.status).map(i => [i.status!.name.toLowerCase(), i.status!.name])).entries()
  ).map(([value, label]) => ({ value, label: label.charAt(0).toUpperCase() + label.slice(1).toLowerCase() }))

  const filters: { value: Filter; label: string }[] = [...BASE_FILTERS, ...uniqueStatuses]

  const countFor = (s: string) => items.filter(i => statusName(i) === s).length

  const filtered = filter === 'all' ? items : items.filter(i => statusName(i) === filter)

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
            {uniqueStatuses.map((s, i) => (
              <>
                {i > 0 && <div key={`divider-${s.value}`} className="bl-stat-divider" />}
                <div key={s.value} className="bl-stat">
                  <span className="bl-stat-number">{countFor(s.value)}</span>
                  <span className="bl-stat-label">{s.label}</span>
                </div>
              </>
            ))}
          </div>
        </div>
      </header>

      {/* ── Filter bar ── */}
      <div className="bl-filters">
        {filters.map(f => (
          <button
            key={f.value}
            className={`bl-filter-btn${filter === f.value ? ' bl-filter-btn--active' : ''}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
            {f.value !== 'all' && (
              <span className="bl-filter-count">{countFor(f.value)}</span>
            )}
          </button>
        ))}
      </div>

      {/* ── Grid ── */}
      <div className="bl-grid-wrapper">
        <div className="bl-grid">
          {filtered.map(item => {
            const status = statusName(item)
            const dest = item.destination
            return (
              <article key={item.id} className={`bl-card bl-card--${status}`}>
                <div
                  className="bl-card-image"
                  style={{ backgroundImage: dest?.coverImageUrl ? `url(${dest.coverImageUrl})` : undefined }}
                />
                <div className="bl-card-overlay" />
                <div className="bl-card-body">
                  <span className={`bl-badge bl-badge--${status}`}>
                    {status === 'visited' && '✓ '}
                    {item.status?.name ?? ''}
                  </span>
                  <div className="bl-card-footer">
                    <div>
                      <h2 className="bl-card-destination">{dest?.name ?? '—'}</h2>
                      <p className="bl-card-country">{dest?.country ?? ''}</p>
                    </div>
                  </div>
                </div>
                <div className="bl-card-description">
                  <p>{dest?.description ?? ''}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
