import { Link } from 'react-router-dom'
import { useState } from 'react'

const BADGE_CLASS = { HD: 'badge-hd', NEW: 'badge-new', HOT: 'badge-hot', '4K': 'badge-hd' }

export default function MovieCard({ movie, index = 0 }) {
  const [hovered, setHovered] = useState(false)
  const isSerial = movie.type === 'serial'
  const thumbUrl = movie.trailerKey
    ? `https://img.youtube.com/vi/${movie.trailerKey}/mqdefault.jpg`
    : movie.poster

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="movie-card"
      style={{
        minWidth: '200px',
        flexShrink: 0,
        textDecoration: 'none',
        color: 'inherit',
        animationDelay: `${(index % 6) * 0.08}s`,
        display: 'block',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="movie-card-poster">
        {/* Poster normally, trailer thumb on hover */}
        <img
          src={hovered && movie.trailerKey ? thumbUrl : movie.poster}
          alt={movie.title}
          loading="lazy"
          style={{ transition: 'opacity 0.3s ease' }}
        />

        <div className="movie-card-overlay">
          <Link
            to={`/watch/${movie.id}`}
            onClick={e => e.stopPropagation()}
            className="card-play-btn"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >▶</Link>
          {hovered && movie.trailerKey && (
            <div style={{
              textAlign: 'center',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.7rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}>🎬 Trailer mavjud</div>
          )}
        </div>

        {movie.badge && (
          <span className={`movie-badge ${BADGE_CLASS[movie.badge] || 'badge-hd'}`}>{movie.badge}</span>
        )}
        <div className="movie-rating">⭐ {movie.rating}</div>
      </div>

      <div className="movie-card-info">
        <div className="movie-card-title">{movie.title}</div>
        <div className="movie-card-meta">
          <span>{movie.year}</span>
          <span style={{ color: 'var(--border)' }}>•</span>
          <span>{isSerial ? `${movie.seasons} mavsum` : movie.duration}</span>
          <span style={{ color: 'var(--border)' }}>•</span>
          <span className="movie-card-genre">{movie.genres[0]}</span>
        </div>
      </div>
    </Link>
  )
}