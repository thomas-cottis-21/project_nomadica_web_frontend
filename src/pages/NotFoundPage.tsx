import { Link } from 'react-router-dom'
import './NotFoundPage.css'

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-inner">
        <p className="not-found-eyebrow">404</p>
        <h1 className="not-found-title">Lost in transit.</h1>
        <p className="not-found-subtitle">
          This page doesn't exist — or it moved while you weren't looking.
        </p>
        <Link to="/" className="not-found-back">Back to home</Link>
      </div>
    </div>
  )
}
