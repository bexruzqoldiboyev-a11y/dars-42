import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/movies?search=${encodeURIComponent(search)}`)
      setShowSearch(false)
      setSearch('')
    }
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="navbar-logo">CINEMAX</Link>

      <ul className="navbar-nav">
        <li><NavLink to="/">Bosh sahifa</NavLink></li>
        <li><NavLink to="/movies">Filmlar</NavLink></li>
        <li><NavLink to="/serials">Seriallar</NavLink></li>
        <li><NavLink to="/favorites">Sevimlilar</NavLink></li>
      </ul>

      <div className="navbar-actions">
        {showSearch ? (
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              autoFocus
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Qidirish..."
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'white',
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                outline: 'none',
              }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '0.45rem 0.9rem' }}>🔍</button>
            <button type="button" onClick={() => setShowSearch(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
          </form>
        ) : (
          <button className="btn-search" onClick={() => setShowSearch(true)}>
            🔍 <span>Qidirish</span>
          </button>
        )}
        <button className="btn-primary">Kirish</button>
      </div>
    </nav>
  )
}