import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import { movies } from '../data/movies'

const filters = ['Barchasi', 'Jangari', 'Drama', 'Ilmiy-fantastika', 'Triller', 'Sarguzasht', 'Romantika']
const sortOptions = ['Reyting', 'Yangi', 'Eski']

export default function Movies() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
  const genreQuery = searchParams.get('genre') || ''

  const [activeFilter, setActiveFilter] = useState(genreQuery || 'Barchasi')
  const [sortBy, setSortBy] = useState('Reyting')
  const [searchTerm, setSearchTerm] = useState(searchQuery)

  useEffect(() => {
    if (genreQuery) setActiveFilter(genreQuery)
    if (searchQuery) setSearchTerm(searchQuery)
  }, [genreQuery, searchQuery])

  let filtered = [...movies]

  if (activeFilter !== 'Barchasi') {
    filtered = filtered.filter(m => m.genres.includes(activeFilter))
  }

  if (searchTerm) {
    filtered = filtered.filter(m =>
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.genres.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  }

  if (sortBy === 'Reyting') filtered.sort((a, b) => b.rating - a.rating)
  if (sortBy === 'Yangi')   filtered.sort((a, b) => b.year - a.year)
  if (sortBy === 'Eski')    filtered.sort((a, b) => a.year - b.year)

  return (
    <div>
      <div className="page-hero">
        <h1 className="page-hero-title">🎬 Filmlar</h1>
        <p className="page-hero-subtitle">Minglab HD filmlarni bepul tomosha qiling</p>
      </div>

      {/* Search bar */}
      <div style={{ padding: '0 6% 1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Film qidirish..."
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            color: 'white',
            padding: '0.6rem 1.2rem',
            borderRadius: '10px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            outline: 'none',
            minWidth: '250px',
          }}
        />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {sortOptions.map(s => (
            <button
              key={s}
              className={`filter-btn ${sortBy === s ? 'active' : ''}`}
              onClick={() => setSortBy(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Genre Filter */}
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

      {/* Results */}
      <div style={{ padding: '0 6% 5rem' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎬</p>
            <p>Hech narsa topilmadi</p>
          </div>
        ) : (
          <>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              {filtered.length} ta film topildi
            </p>
            <div className="movies-grid">
              {filtered.map((m, i) => (
                <MovieCard key={m.id} movie={m} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}