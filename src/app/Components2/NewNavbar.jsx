// NewNavbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import './NewNavbar.css';

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
        <h1 className="navbar-title">CAMERA CATERING</h1>
      </div>
      <div className="navbar-right" ref={menuRef}>
        {/* Mobile/Small/Intermediate view: show menu icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          <img src="./assets/camera-icon13.png" alt="Menu Icon" />
        </div>
        {/* Navigation items */}
        <ul className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
          <li>
            <a href="#section1" onClick={handleMenuItemClick}>START HERE</a>
          </li>
          <li>
            <a href="#section2" onClick={handleMenuItemClick}>CATERING</a>
          </li>
          <li>
            <a href="#section3" onClick={handleMenuItemClick}>PACKAGES</a>
          </li>
          <li>
            <a href="#section4" onClick={handleMenuItemClick}>TESTIMONIALS!</a>
          </li>
          <li>
            <a href="#section5" onClick={handleMenuItemClick}>ABOUT</a>
          </li>
          <li>
            <a href="#section6" onClick={handleMenuItemClick}>WHAT, WHY, HOW?</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NewNavbar;