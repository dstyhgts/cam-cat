import React, { useRef } from 'react';
import './WelcomeCamera.css';
import Footer from '../Components/Footer';
import LandingGallery from '../Components/LandingGallery';
import { PopupButton } from '@typeform/embed-react';

const WelcomeCamera = () => {
  return (
    <div style={{ position: 'relative', width: '100vw' }}>
      {/* LandingGallery at the bottom layer */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'auto' }}>
        <LandingGallery />
      </div>
      {/* Welcome content above, but pointer-events: none except for the button */}
      <div className="welcome-camera-container" style={{ position: 'relative', zIndex: 2, pointerEvents: 'none' }}>
        {/* Left side: Title & text */}
        <div className="left-content" style={{ pointerEvents: 'none' }}>
          {/* <h1 className="main-title">YOU HOLD THE CAMERA*</h1> */}
          {/* <h1 className="main-title">UNLIMITED CONTENT AT YOUR EVENT.</h1> */}
          <h1 className="main-title">YOUR EVENT. YOUR STORY.</h1>
          {/* <p className="subtitle">
            Every celebration is a story. Camera Catering makes each guest the storyteller.
          </p> */}
          <p className="subtitle">
            FORGET THE PHOTOGRAPHER, TAKE THE MEMORIES INTO YOUR OWN HANDS.
          </p>

          <div className="new-section">
            <span className="new-badge">*ATTENTION!</span>
            <p className="new-description">
              {/* Rapid® Print cameras to take the user experience to the next level. 
              It's basically a hand-held Photo Booth, but so much better. Trust us. */}
              We make everyone a content creator.
            </p>
            <p className="new-description">
              <i>With the possibility for thousands of photographs and videos of your event, 
              Camera Catering literally brings the party to life by putting the cameras in the hands of your guests.</i>
            </p>
          </div>
        </div>

        {/* Right side: Multi-layered card + pinned SVG */}
        <div className="right-content card-stack-desktop" style={{ pointerEvents: 'none', position: 'relative', width: '60%', height: '625px', minHeight: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {/* Footer-style floating cards */}
          <div style={{ position: 'relative', width: '525px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Card 1: Image */}
            <div className="item" style={{ left: '0%', top: '20%', width: '250px', height: '281px', transform: 'rotate(-14deg)', zIndex: 1 }}>
              <img src="/assets/img27.JPG" alt="Event 1" />
            </div>
            {/* Card 2: Video */}
            <div className="item" style={{ left: '31.25%', top: '0%', width: '250px', height: '281px', transform: 'rotate(7deg) scale(1.15)', zIndex: 2, background: '#e3e3e3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <video
                src="/assets/BrookeBDAY2.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.3em', background: 'transparent' }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            {/* Card 3: Image */}
            <div className="item" style={{ left: '62.5%', top: '25%', width: '250px', height: '281px', transform: 'rotate(13deg)', zIndex: 0 }}>
              <img src='/assets/img29.JPG' alt="Event 2" />
            </div>
          </div>
          {/* GET CAMERAS button, positioned lower for desktop */}
          <div className="order-btn-desktop" style={{ position: 'absolute', left: '50%', bottom: '20px', transform: 'translateX(-50%) rotate(3deg)', width: '320px', pointerEvents: 'auto', zIndex: 10 }}>
            <PopupButton
              id="yyPNXkPK"
              className="order-button"
              size={80}
              style={{ width: '100%', zIndex: 10, position: 'relative', pointerEvents: 'auto', whiteSpace: 'nowrap', fontSize: '2.2rem' }}
            >
              GET CAMERAS!
            </PopupButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCamera;
