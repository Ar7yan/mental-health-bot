// src/components/Navigation.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🌿 Mindful Companion
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className={location.pathname === '/dashboard' ? 'nav-link active' : 'nav-link'}
          >
            Dashboard
          </Link>
          <Link 
            to="/journal" 
            className={location.pathname === '/journal' ? 'nav-link active' : 'nav-link'}
          >
            Journal
          </Link>
          <Link 
            to="/exercises" 
            className={location.pathname === '/exercises' ? 'nav-link active' : 'nav-link'}
          >
            Exercises
          </Link>
          <Link 
            to="/assessment" 
            className={location.pathname === '/assessment' ? 'nav-link active' : 'nav-link'}
          >
            Assessment
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;