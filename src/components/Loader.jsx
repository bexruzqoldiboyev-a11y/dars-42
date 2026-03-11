import { useEffect, useState } from 'react'

export default function Loader({ onDone }) {
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    // Start fade-out after 1.8s, then call onDone after fade completes
    const fadeTimer = setTimeout(() => setHiding(true), 1800)
    const doneTimer = setTimeout(() => onDone(), 2300)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  return (
    <div className="loader-container" style={{
      opacity: hiding ? 0 : 1,
      transition: 'opacity 0.5s ease',
      pointerEvents: hiding ? 'none' : 'all',
    }}>
      <div className="loader-logo">CINEMAX</div>
      <div className="loader-bar">
        <div className="loader-bar-fill" />
      </div>
      <p className="loader-text">Yuklanmoqda...</p>
    </div>
  )
}