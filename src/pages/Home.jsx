import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import { movies, serials, genres, allContent } from '../data/movies'

const heroMovies = allContent.filter(m => m.isFeatured).slice(0, 5)

const particles = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: `${Math.random() * 3 + 1}px`,
  duration: `${Math.random() * 15 + 10}s`,
  delay: `${Math.random() * 10}s`,
}))

export default function Home() {
  const [activeHero, setActiveHero] = useState(0)
  const [showHeroTrailer, setShowHeroTrailer] = useState(false)
  const hero = heroMovies[activeHero] || movies[0]

  useEffect(() => {
    setShowHeroTrailer(false)
    const timer = setInterval(() => {
      setActiveHero(p => {
        setShowHeroTrailer(false)
        return (p + 1) % heroMovies.length
      })
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const trendingMovies = allContent.filter(m => m.isTrending)
  const newMovies = allContent.filter(m => m.isNew)
  const topRated = [...allContent].sort((a, b) => b.rating - a.rating).slice(0, 10)

  return (
    <div>
      {/* ======= NETFLIX-STYLE HERO ======= */}
      <section className="hero" style={{ height: '100vh' }}>
        {/* BG Image / Trailer */}
        {showHeroTrailer ? (
          <div style={{ position: 'absolute', inset: 0, background: '#000', zIndex: 0 }}>
            <iframe
              src={`https://www.youtube.com/embed/${hero.trailerKey}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&loop=1&playlist=${hero.trailerKey}`}
              style={{ width: '100%', height: '100%', border: 'none', objectFit: 'cover', transform: 'scale(1.05)' }}
              allow="autoplay"
              title="hero trailer"
            />
          </div>
        ) : (
          <div
            className="hero-bg"
            style={{ backgroundImage: `url(${hero.backdrop})` }}
            key={hero.id}
          />
        )}

        <div className="hero-gradient" />

        {/* Particles */}
        <div className="hero-particles">
          {particles.map(p => (
            <div
              key={p.id}
              className="particle"
              style={{
                left: p.left, bottom: '-10px',
                width: p.size, height: p.size,
                animationDuration: p.duration,
                animationDelay: p.delay,
                '--drift': `${(Math.random() - 0.5) * 200}px`,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="hero-content">
          <div className="hero-badge"><span />Hozir Trend</div>
          <h1 className="hero-title">
            <span className="highlight">{hero.title}</span>
          </h1>
          <div className="hero-meta">
            <div className="rating">⭐ {hero.rating}</div>
            <div className="dot" />
            <span>{hero.year}</span>
            <div className="dot" />
            <span>{hero.duration || `${hero.seasons} mavsum`}</span>
          </div>
          <div className="hero-genre-tags">
            {hero.genres.map(g => <span key={g} className="genre-tag">{g}</span>)}
          </div>
          <p className="hero-description">{hero.description}</p>
          <div className="hero-actions">
            <Link to={`/watch/${hero.id}`} className="btn-play">
              <span className="play-icon">▶</span>
              Tomosha qilish
            </Link>
            <button
              onClick={() => setShowHeroTrailer(!showHeroTrailer)}
              className="btn-outline"
            >
              {showHeroTrailer ? '🖼 Poster' : '🎬 Trailer'}
            </button>
            <Link to={`/movie/${hero.id}`} className="btn-outline">ℹ️ Batafsil</Link>
          </div>
        </div>

        {/* Thumbnail nav */}
        <div className="hero-thumbnails">
          {heroMovies.map((m, i) => (
            <div
              key={m.id}
              className={`hero-thumb ${i === activeHero ? 'active' : ''}`}
              onClick={() => { setActiveHero(i); setShowHeroTrailer(false) }}
            >
              <img src={m.poster} alt={m.title} />
            </div>
          ))}
        </div>

        <div className="hero-scroll-indicator">
          <div className="scroll-line" />
          <span>Pastga aylantir</span>
        </div>
      </section>

      {/* Trending Ticker */}
      <div className="trending-ticker">
        <div className="ticker-label">🔥 Top 10</div>
        <div className="ticker-content">
          {[...topRated, ...topRated].map((item, i) => (
            <div key={i} className="ticker-item">
              <span className="num">#{(i % topRated.length) + 1}</span>
              <span>{item.title}</span>
              <span style={{ color: 'var(--accent-gold)' }}>⭐ {item.rating}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="stats-banner">
        <div className="stat-item"><div className="stat-number">5000+</div><div className="stat-label">Filmlar</div></div>
        <div className="stat-item"><div className="stat-number">1200+</div><div className="stat-label">Seriallar</div></div>
        <div className="stat-item"><div className="stat-number">4K</div><div className="stat-label">Ultra HD</div></div>
        <div className="stat-item"><div className="stat-number">2M+</div><div className="stat-label">Foydalanuvchi</div></div>
      </div>

      {/* Trending */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">🔥 Trendda</h2>
          <Link to="/movies" className="section-link">Hammasini ko'rish →</Link>
        </div>
        <div className="movies-row">
          {trendingMovies.map((m, i) => <MovieCard key={m.id} movie={m} index={i} />)}
        </div>
      </section>

      {/* New */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <h2 className="section-title">✨ Yangi Keldi</h2>
          <Link to="/movies" className="section-link">Barchasi →</Link>
        </div>
        <div className="movies-row">
          {newMovies.map((m, i) => <MovieCard key={m.id} movie={m} index={i} />)}
        </div>
      </section>

      {/* Top Rated */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <h2 className="section-title">👑 Top Reytingli</h2>
          <Link to="/movies" className="section-link">Ko'proq →</Link>
        </div>
        <div className="movies-row">
          {topRated.slice(0, 8).map((m, i) => (
            <div key={m.id} style={{ minWidth: '200px', flexShrink: 0, position: 'relative' }}>
              <div style={{
                position: 'absolute', top: '50%', left: '-1rem', transform: 'translateY(-50%)',
                fontFamily: 'var(--font-display)', fontSize: '5rem', color: 'rgba(255,255,255,0.08)',
                fontWeight: 900, lineHeight: 1, zIndex: 1, userSelect: 'none',
              }}>{i + 1}</div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <MovieCard movie={m} index={i} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Genres */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <h2 className="section-title">🎭 Janrlar</h2>
        </div>
        <div className="genres-grid">
          {genres.map((g, i) => (
            <Link to={`/movies?genre=${g.name}`} key={g.name} className="genre-card">
              <div className="genre-card-bg" style={{ backgroundImage: `url(${g.bg})` }} />
              <div className="genre-card-overlay" style={{ background: `linear-gradient(135deg, ${g.color}44, rgba(5,8,16,0.6))` }} />
              <div className="genre-card-title">{g.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Serials */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <h2 className="section-title">📺 Mashhur Seriallar</h2>
          <Link to="/serials" className="section-link">Ko'proq →</Link>
        </div>
        <div className="movies-row">
          {serials.map((s, i) => <MovieCard key={s.id} movie={s} index={i} />)}
        </div>
      </section>

      {/* Promo */}
      <section style={{ padding: '0 6% 5rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(230,57,70,0.15), rgba(76,201,240,0.08))',
          border: '1px solid rgba(230,57,70,0.25)',
          borderRadius: '20px', padding: '4rem',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '2rem',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--accent-red), var(--accent-gold), transparent)' }} />
          <div>
            <p style={{ color: 'var(--accent-gold)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '0.5rem' }}>🎬 Premium Obuna</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>Cheksiz Tomosha Qiling</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '400px' }}>Reklamsiz, HD sifatda, istalgan qurilmada. Birinchi 30 kun bepul!</p>
          </div>
          <button className="btn-play" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
            Hozir Boshlash →
          </button>
        </div>
      </section>
    </div>
  )
}