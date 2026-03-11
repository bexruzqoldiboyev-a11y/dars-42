import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="logo">CINEMAX</span>
          <p>O'zbekistonning eng yaxshi onlayn kinoteatri. Minglab filmlar va seriallar sizni kutmoqda.</p>
          <div className="footer-social">
            <a href="#" className="social-btn">🎬</a>
            <a href="#" className="social-btn">📱</a>
            <a href="#" className="social-btn">💬</a>
            <a href="#" className="social-btn">🎵</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Sayt</h4>
          <ul className="footer-links">
            <li><Link to="/">Bosh sahifa</Link></li>
            <li><Link to="/movies">Filmlar</Link></li>
            <li><Link to="/serials">Seriallar</Link></li>
            <li><Link to="/favorites">Sevimlilar</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Janrlar</h4>
          <ul className="footer-links">
            <li><a href="#">Jangari</a></li>
            <li><a href="#">Drama</a></li>
            <li><a href="#">Komediya</a></li>
            <li><a href="#">Triller</a></li>
            <li><a href="#">Fantastika</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Yordam</h4>
          <ul className="footer-links">
            <li><a href="#">Biz haqimizda</a></li>
            <li><a href="#">Aloqa</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Shartlar</a></li>
            <li><a href="#">Maxfiylik</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 CineMax. Barcha huquqlar himoyalangan.</p>
        <div className="footer-bottom-links">
          <a href="#">Maxfiylik siyosati</a>
          <a href="#">Foydalanish shartlari</a>
          <a href="#">Cookie</a>
        </div>
      </div>
    </footer>
  )
}