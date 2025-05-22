// src/components/Footer.tsx
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {currentYear} Daly BMS Monitor</p>
        <p>Visualize and analyze your BMS data in real-time</p>
      </div>
    </footer>
  )
}

export default Footer