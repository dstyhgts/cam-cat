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
        <h1 className="navbar-title">Camera Catering</h1>
      </div>
      <div className="navbar-right" ref={menuRef}>
        {/* Mobile/Small/Intermediate view: show menu icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          <img src="./assets/camera-icon13.png" alt="Menu Icon" />
        </div>
        {/* Navigation items */}
        <ul className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
          <li>
            <a href="#section1" onClick={handleMenuItemClick}>Get Started</a>
          </li>
          <li>
            <a href="#section2" onClick={handleMenuItemClick}>What is this?</a>
          </li>
          <li>
            <a href="#section3" onClick={handleMenuItemClick}>Catering</a>
          </li>
          <li>
            <a href="#section4" onClick={handleMenuItemClick}>Packages</a>
          </li>
          <li>
            <a href="#section5" onClick={handleMenuItemClick}>What Others Are Saying...</a>
          </li>
          <li>
            <a href="#section6" onClick={handleMenuItemClick}>About</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NewNavbar;