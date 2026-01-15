// NewNavbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import './NewNavbar.css';
import ThemeToggle from './ThemeToggle';

const NewNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const menuRef = useRef(null);
  const moreRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const toggleMore = () => setIsMoreOpen(prev => !prev);
  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
    setIsMoreOpen(false);
  };

  // Handle navigation to homepage
  const handleHomeClick = (e) => {
    e.preventDefault();
    if (isHomePage) {
      // If already on homepage, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const section1 = document.getElementById('section1');
      if (section1) {
        section1.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to homepage
      router.push('/');
    }
    handleMenuItemClick();
  };

  // Handle hash navigation when coming from other pages
  useEffect(() => {
    if (isHomePage && window.location.hash) {
      const hash = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [isHomePage, pathname]);

  // Close dropdown when clicking anywhere outside the menu area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="navbar-logo-link" onClick={handleHomeClick}>
          <img
            src="/assets/camera-icon32-1.svg"
            alt="Camera Catering Logo"
            className="navbar-logo"
            width="120"
            height="48"
            loading="eager"
          />
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
          <div className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        {/* Navigation items */}
        <ul className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
          <li>
            <a href="welcome" onClick={e => {
              e.preventDefault();
              handleMenuItemClick();
              if (isHomePage) {
                const section1 = document.getElementById('section1');
                if (section1) {
                  section1.scrollIntoView({ behavior: 'smooth' });
                }
              } else {
                router.push('/#section1');
              }
            }}>Welcome</a>
          </li>
          
          <li>
            <a href="catering" onClick={e => {
              e.preventDefault();
              handleMenuItemClick();
              if (isHomePage) {
                const businessOfferings = document.getElementById('main-content');
                if (businessOfferings) {
                  businessOfferings.scrollIntoView({ behavior: 'smooth' });
                }
              } else {
                router.push('/#main-content');
              }
            }}>"Camera Catering"</a>
          </li>
          <li>
            <a href="the-experience" onClick={e => {
              e.preventDefault();
              handleMenuItemClick();
              if (isHomePage) {
                const testimonials = document.getElementById('testimonials');
                if (testimonials) {
                  testimonials.scrollIntoView({ behavior: 'smooth' });
                }
              } else {
                router.push('/#testimonials');
              }
            }}>The Experience</a>
          </li>
          <li>
            <a href="services-pricing" onClick={e => {
              e.preventDefault();
              handleMenuItemClick();
              if (isHomePage) {
                const businessOfferings = document.getElementById('business-offerings');
                if (businessOfferings) {
                  businessOfferings.scrollIntoView({ behavior: 'smooth' });
                }
              } else {
                router.push('/#business-offerings');
              }
            }}>Services & Pricing</a>
          </li>
          {/* <li>
            <a href="#about-card" onClick={handleMenuItemClick}>About</a>
          </li> */}
          <li>
            <a href="connect" onClick={e => {
              e.preventDefault();
              handleMenuItemClick();
              if (isHomePage) {
                const footer = document.getElementById('footer');
                if (footer) {
                  footer.scrollIntoView({ behavior: 'smooth' });
                }
              } else {
                router.push('/#footer');
              }
            }}>Connect</a>
          </li>
          <li className="more-menu-item" ref={moreRef}>
            <button 
              className="more-button"
              onClick={(e) => {
                e.stopPropagation();
                toggleMore();
              }}
            >
              + More
            </button>
            {isMoreOpen && (
              <ul className="more-dropdown">
                <li>
                  <Link href="/blog" onClick={handleMenuItemClick}>Blog</Link>
                </li>
              </ul>
            )}
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