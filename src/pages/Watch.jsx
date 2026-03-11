import { useParams, Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { allContent } from '../data/movies' 

export default function Watch() {
  const { id } = useParams()
  const movie = allContent.find(m => m.id === Number(id))
  const [activeEp, setActiveEp] = useState(0)
  const [showTrailer, setShowTrailer] = useState(false)

  useEffect(() => {
    // Auto-show trailer after 1s
    const t = setTimeout(() => setShowTrailer(true), 800)
    return () => clearTimeout(t)
  }, [id])

  if (!movie) return (
    <div style={{ padding: '10rem 6%', textAlign: 'center' }}>
      <p style={{ fontSize: '3rem' }}>😕</p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginTop: '1rem' }}>Topilmadi</h2>
      <Link to="/movies" className="btn-play" style={{ display: 'inline-flex', marginTop: '2rem', textDecoration: 'none' }}>← Orqaga</Link>
    </div>
  )

  const episodes = movie.episodesList || [
    { ep: 1, title: movie.title, duration: movie.duration || '2h', thumb: movie.poster }
  ]

  const trailerUrl = `https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1&rel=0&modestbranding=1&controls=1`

  return (
    <div className="watch-page">
      {/* YouTube Trailer Player */}
      <div className="video-container" style={{ background: '#000', position: 'relative', aspectRatio: '16/9', maxHeight: '75vh', width: '100%' }}>
        {showTrailer ? (
          <iframe
            key={movie.trailerKey}
            src={trailerUrl}
            title={movie.title + " trailer"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%', position: 'relative',
            backgroundImage: `url(${movie.backdrop})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }} onClick={() => setShowTrailer(true)}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
            <div style={{
              position: 'relative', zIndex: 1,
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(230,57,70,0.9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', boxShadow: '0 0 40px rgba(230,57,70,0.7)',
              transition: 'transform 0.2s ease',
            }}>▶</div>
          </div>
        )}
      </div>

      {/* Title Bar */}
      <div className="video-title-bar">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2>{movie.title}</h2>
            <p>{movie.year} • {movie.genres.join(', ')} {movie.rating ? `• ⭐ ${movie.rating}` : ''}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to={`/movie/${movie.id}`} className="btn-outline" style={{ textDecoration: 'none', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              ← Film sahifasi
            </Link>
            <button
              onClick={() => setShowTrailer(false)}
              className="btn-outline"
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              🖼 Poster
            </button>
            <button className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', cursor: 'pointer' }}>
              📤 Ulashish
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="watch-body">
        <div className="watch-episodes">
          <div className="episodes-title">
            {movie.type === 'serial' ? 'Qismlar' : 'Tavsiya Etilgan'}
          </div>

          {episodes.map((ep, i) => (
            <div
              key={ep.ep}
              className={`episode-item ${activeEp === i ? 'active' : ''}`}
              onClick={() => setActiveEp(i)}
            >
              <div className="episode-thumb">
                <img src={ep.thumb} alt={ep.title} />
                {activeEp === i && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(230,57,70,0.7)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.5rem',
                  }}>▶</div>
                )}
              </div>
              <div className="episode-info">
                <h4>{movie.type === 'serial' ? `${ep.ep}-qism: ` : ''}{ep.title}</h4>
                <p style={{ color: activeEp === i ? 'var(--accent-red)' : undefined }}>
                  {ep.duration} {activeEp === i ? '• ▶ Hozir ijro etilmoqda' : ''}
                </p>
              </div>
            </div>
          ))}

          {/* Description */}
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>Tavsif</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.9rem' }}>{movie.description}</p>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ padding: '2rem', background: 'var(--bg-secondary)', borderLeft: '1px solid var(--border)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', letterSpacing: '0.04em', marginBottom: '1.5rem' }}>Film Ma'lumoti</h3>
          <img src={movie.poster} alt={movie.title} style={{ width: '100%', borderRadius: '12px', marginBottom: '1.5rem', aspectRatio: '2/3', objectFit: 'cover' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              ['Reyting', `⭐ ${movie.rating}/10`],
              ['Yil', movie.year],
              ['Davomiyligi', movie.duration || `${movie.seasons} mavsum`],
              ['Janr', movie.genres.slice(0,2).join(', ')],
              ['Sifat', '4K UHD'],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                <span style={{ fontWeight: 500 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}