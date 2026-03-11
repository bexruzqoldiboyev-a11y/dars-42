import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import { allContent } from '../data/movies'

export default function Favorites() {
  const [favIds, setFavIds] = useState([])

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('cinemax_favs') || '[]')
      setFavIds(stored)
    } catch { setFavIds([]) }
  }, [])

  const favMovies = allContent.filter(m => favIds.includes(m.id))

  return (
    <div>
      <div className="page-hero">
        <h1 className="page-hero-title">❤️ Sevimlilar</h1>
        <p className="page-hero-subtitle">Saqlab qo'ygan filmlaringiz bu yerda</p>
      </div>

      <div style={{ padding: '0 6% 5rem' }}>
        {favMovies.length === 0 ? (
          <div className="favorites-empty">
            <div className="favorites-empty-icon">🎬</div>
            <h2>Hali hech narsa saqlanmagan</h2>
            <p>Film yoki serial sahifasiga kirib, ❤️ tugmasini bosing. Sevimlilaringiz shu yerda saqlanadi.</p>
            <Link to="/movies" className="btn-play" style={{ textDecoration: 'none', marginTop: '0.5rem' }}>
              <span className="play-icon">🎬</span>
              Filmlarga o'tish
            </Link>
          </div>
        ) : (
          <>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              {favMovies.length} ta saqlangan
            </p>
            <div className="movies-grid">
              {favMovies.map((m, i) => <MovieCard key={m.id} movie={m} index={i} />)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}