import { useState } from 'react'
import MovieCard from '../components/MovieCard'
import { serials } from '../data/movies'

const filters = ['Barchasi', 'Triller', 'Drama', 'Ilmiy-fantastika', 'Sarguzasht', 'Tarix']

export default function Serials() {
  const [activeFilter, setActiveFilter] = useState('Barchasi')

  const filtered = activeFilter === 'Barchasi'
    ? serials
    : serials.filter(s => s.genres.includes(activeFilter))

  return (
    <div>
      <div className="page-hero">
        <h1 className="page-hero-title">📺 Seriallar</h1>
        <p className="page-hero-subtitle">Eng zo'r seriallarni tomosha qiling, mavsum oxirini kutmang!</p>
      </div>

      <div className="filter-bar">
        {filters.map(f => (
          <button
            key={f}
            className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Featured Serial */}
      {filtered.length > 0 && (
        <div style={{ padding: '0 6% 3rem' }}>
          <div style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            aspectRatio: '21/7',
            marginBottom: '3rem',
          }}>
            <img
              src={filtered[0].backdrop}
              alt={filtered[0].title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4)' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(5,8,16,0.95) 0%, transparent 60%)',
              display: 'flex',
              alignItems: 'center',
              padding: '3rem',
            }}>
              <div>
                <div className="hero-badge" style={{ marginBottom: '1rem' }}>
                  <span />
                  Eng Ko'p Ko'rilgan
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                  {filtered[0].title}
                </h2>
                <div className="hero-meta" style={{ marginBottom: '1rem' }}>
                  <div className="rating">⭐ {filtered[0].rating}</div>
                  <div className="dot" />
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{filtered[0].seasons} mavsum · {filtered[0].episodes} qism</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                  <a href={`/watch/${filtered[0].id}`} className="btn-play" style={{ textDecoration: 'none' }}>
                    <span className="play-icon">▶</span> Ko'rish
                  </a>
                  <a href={`/movie/${filtered[0].id}`} className="btn-outline" style={{ textDecoration: 'none' }}>ℹ️ Batafsil</a>
                </div>
              </div>
            </div>
          </div>

          <div className="movies-grid">
            {filtered.map((s, i) => <MovieCard key={s.id} movie={s} index={i} />)}
          </div>
        </div>
      )}
    </div>
  )
}