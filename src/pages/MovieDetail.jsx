import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { allContent, movies } from '../data/movies'

export default function MovieDetail() {
  const { id } = useParams()
  const movie = allContent.find(m => m.id === Number(id))
  const [showTrailerModal, setShowTrailerModal] = useState(false)
  const [isFav, setIsFav] = useState(() => {
    try {
      const favs = JSON.parse(localStorage.getItem('cinemax_favs') || '[]')
      return favs.includes(Number(id))
    } catch { return false }
  })

  const toggleFav = () => {
    try {
      const favs = JSON.parse(localStorage.getItem('cinemax_favs') || '[]')
      const newFavs = isFav ? favs.filter(f => f !== movie.id) : [...favs, movie.id]
      localStorage.setItem('cinemax_favs', JSON.stringify(newFavs))
      setIsFav(!isFav)
    } catch {}
  }

  if (!movie) return (
    <div style={{ padding: '10rem 6%', textAlign: 'center' }}>
      <p style={{ fontSize: '3rem' }}>😕</p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginTop: '1rem' }}>Film topilmadi</h2>
      <Link to="/movies" className="btn-play" style={{ display: 'inline-flex', marginTop: '2rem', textDecoration: 'none' }}>← Orqaga</Link>
    </div>
  )

  const related = [...movies].filter(m => m.id !== movie.id && m.genres.some(g => movie.genres.includes(g))).slice(0, 6)
  const castColors = ['#e63946', '#4cc9f0', '#f4a261', '#06d6a0']

  return (
    <div className="movie-detail">
      {/* Trailer Modal */}
      {showTrailerModal && (
        <div
          onClick={() => setShowTrailerModal(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)',
            zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '900px', position: 'relative' }}>
            <button
              onClick={() => setShowTrailerModal(false)}
              style={{
                position: 'absolute', top: '-3rem', right: 0,
                background: 'none', border: 'none', color: 'white',
                fontSize: '1.5rem', cursor: 'pointer', opacity: 0.7,
              }}
            >✕ Yopish</button>
            <div style={{ aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden' }}>
              <iframe
                src={`https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1&rel=0`}
                title={movie.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="movie-detail-hero">
        <div className="movie-detail-bg" style={{ backgroundImage: `url(${movie.backdrop})` }} />
        <div className="movie-detail-gradient" />
        <div className="movie-detail-content">
          <div className="hero-genre-tags" style={{ marginBottom: '1rem' }}>
            {movie.genres.map(g => <span key={g} className="genre-tag">{g}</span>)}
          </div>
          <h1 className="movie-detail-title">{movie.title}</h1>
          <div className="movie-detail-meta">
            <span className="meta-tag rating">⭐ {movie.rating}</span>
            <span className="meta-tag">📅 {movie.year}</span>
            {movie.duration && <span className="meta-tag">⏱ {movie.duration}</span>}
            {movie.seasons && <span className="meta-tag">📺 {movie.seasons} mavsum</span>}
            {movie.director && <span className="meta-tag">🎬 {movie.director}</span>}
          </div>
          <div className="hero-actions">
            <Link to={`/watch/${movie.id}`} className="btn-play">
              <span className="play-icon">▶</span>
              Tomosha qilish
            </Link>
            <button onClick={() => setShowTrailerModal(true)} className="btn-outline">
              🎬 Trailer
            </button>
            <button onClick={toggleFav} className="btn-outline" style={{
              borderColor: isFav ? 'var(--accent-red)' : undefined,
              color: isFav ? 'var(--accent-red)' : undefined
            }}>
              {isFav ? '❤️ Saqlangan' : '🤍 Saqlash'}
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="movie-detail-body">
        <div className="movie-detail-grid">
          <div>
            {/* Trailer preview */}
            <div
              onClick={() => setShowTrailerModal(true)}
              style={{
                position: 'relative', borderRadius: '14px', overflow: 'hidden',
                aspectRatio: '16/9', marginBottom: '2.5rem', cursor: 'pointer',
                border: '1px solid var(--border)',
              }}
            >
              <img
                src={`https://img.youtube.com/vi/${movie.trailerKey}/maxresdefault.jpg`}
                alt="trailer"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }}
                onError={e => { e.target.src = movie.backdrop }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '1rem',
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: 'rgba(230,57,70,0.9)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.8rem', boxShadow: '0 0 40px rgba(230,57,70,0.6)',
                  transition: 'transform 0.2s',
                }}>▶</div>
                <span style={{ color: 'white', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                  Rasmiy Trailer
                </span>
              </div>
            </div>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '0.04em', marginBottom: '1rem' }}>Qisqacha</h3>
            <p className="movie-synopsis">{movie.description}</p>

            {movie.cast && (
              <>
                <div className="movie-cast-label">Aktyorlar</div>
                <div className="cast-grid">
                  {movie.cast.map((actor, i) => (
                    <div key={actor} className="cast-item">
                      <div className="cast-avatar">
                        <div style={{
                          width: '100%', height: '100%',
                          background: `linear-gradient(135deg, ${castColors[i % 4]}33, ${castColors[(i+1) % 4]}22)`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '1.3rem', color: castColors[i % 4], fontWeight: 700,
                        }}>
                          {actor.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                      <span className="cast-name">{actor}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {related.length > 0 && (
              <div style={{ marginTop: '3rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '0.04em', marginBottom: '1.5rem' }}>
                  O'xshash Filmlar
                </h3>
                <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
                  {related.map(m => (
                    <Link key={m.id} to={`/movie/${m.id}`} style={{ textDecoration: 'none', minWidth: '160px', flexShrink: 0 }}>
                      <div className="movie-card" style={{ borderRadius: '10px', overflow: 'hidden', background: 'var(--bg-card)' }}>
                        <div style={{ aspectRatio: '2/3', overflow: 'hidden', position: 'relative' }}>
                          <img src={m.poster} alt={m.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} />
                        </div>
                        <div style={{ padding: '0.7rem' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.2rem', color: 'var(--text-primary)' }}>{m.title}</div>
                          <div style={{ color: 'var(--accent-gold)', fontSize: '0.75rem' }}>⭐ {m.rating}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="movie-sidebar">
            <div className="sidebar-poster">
              <img src={movie.poster} alt={movie.title} />
            </div>
            <div className="sidebar-actions">
              <Link to={`/watch/${movie.id}`} className="sidebar-btn primary">▶ Tomosha Qilish</Link>
              <button onClick={() => setShowTrailerModal(true)} className="sidebar-btn secondary">🎬 Trailer Ko'rish</button>
              <button onClick={toggleFav} className="sidebar-btn secondary">
                {isFav ? '❤️ Saqlangan' : '🤍 Sevimlilarga'}
              </button>
              <button className="sidebar-btn secondary">📤 Ulashish</button>
            </div>
            <div className="sidebar-info">
              {[
                ['Yil', movie.year],
                ['Reyting', `⭐ ${movie.rating}/10`],
                movie.duration ? ['Davomiyligi', movie.duration] : null,
                movie.seasons ? ['Mavsum', movie.seasons] : null,
                ['Janr', movie.genres.join(', ')],
                movie.director ? ['Rejissyor', movie.director] : null,
                ['Sifat', '4K UHD'],
              ].filter(Boolean).map(([label, value]) => (
                <div key={label} className="sidebar-info-row">
                  <span className="info-label">{label}</span>
                  <span className="info-value" style={label === 'Sifat' ? { color: 'var(--accent-blue)' } : {}}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}