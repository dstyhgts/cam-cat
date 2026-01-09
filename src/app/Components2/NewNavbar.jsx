// NewNavbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import './NewNavbar.css';
import ThemeToggle from './ThemeToggle';

const NewNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const handleMenuItemClick = () => setIsMenuOpen(false);

  // Close dropdown when clicking anywhere outside the menu area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="#section1" className="navbar-logo-link" onClick={() => { window.location.hash = '#section1'; }}>
          <img src="./assets/camera-icon32-1.svg" alt="Camera Catering Logo" className="navbar-logo" />
          <h1 className="navbar-title">
            CAMERA CATERING
            <div className="location-text">LOS ANGELES • SAN DIEGO • SAN FRANCISCO</div>
          </h1>
        </a>
      </div>
      <div className="navbar-right" ref={menuRef}>
        {/* Theme Toggle */}
        <div className="theme-toggle-container">
          <ThemeToggle />
        </div>
        {/* Mobile/Small/Intermediate view: show menu icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          <div className="hamburger-menu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        {/* Navigation items */}
        <ul className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
          <li>
            <a href="#section1" onClick={handleMenuItemClick}>Get Started</a>
          </li>
          <li>
            <a href="#business-offerings" onClick={handleMenuItemClick}>Services & Pricing</a>
          </li>
          <li>
            <a href="#how-it-works" onClick={handleMenuItemClick}>"Camera Catering"</a>
          </li>
          <li>
            <a href="#testimonials" onClick={handleMenuItemClick}>The Experience</a>
          </li>
          {/* <li>
            <a href="#about-card" onClick={handleMenuItemClick}>About</a>
          </li> */}
          <li>
            <a href="#footer" onClick={e => {
              e.preventDefault();
              handleMenuItemClick();
              const footer = document.getElementById('footer');
              if (footer) {
                footer.scrollIntoView({ behavior: 'smooth' });
              }
            }}>Connect</a>
          </li>
          {/* <li>
            <a href="#threecards" onClick={handleMenuItemClick}>What? Why? How?</a>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default NewNavbar;