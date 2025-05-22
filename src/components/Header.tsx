// src/components/Header.tsx
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
        <img src="Logo.png" alt="Logo" className="logo-image" />
        <div className="logo-text-container">
            <h1 className="logo-text">Green Seed</h1>
            <h1 className="logo-text">Daly BMS Monitor</h1>
          </div>
        </div>
        <div className="header-right">
          <span className="app-version">v1.0.0</span>
        </div>
      </div>
    </header>
  )
}

export default Header