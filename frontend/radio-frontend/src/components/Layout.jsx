import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="app-layout">
      <header className="header">
        <div className="container">
          <nav className="nav">
            <Link to="/" className="nav-logo">
              <span className="nav-icon">📻</span>
              <span className="nav-title">Radio Manager</span>
            </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">Lista</Link>
              <Link to="/agregar" className="nav-link btn btn-primary">
                ➕ Nueva Emisora
              </Link>
            </div>
          </nav>
        </div>
      </header>
      
      <main className="main-content">
        <Outlet />
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>Administrador de Emisoras &copy; {new Date().getFullYear()}</p>
          <p>API: http://localhost:8080/emisoras</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
