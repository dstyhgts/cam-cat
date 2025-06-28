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
            FORGET THE PHOTOBOOTH, FORGET THE DISPOSABLES. <i>REMEMBER THE STORY.</i>
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
        <div className="right-content" style={{ pointerEvents: 'none' }}>
          <div className="fancy-card" style={{ pointerEvents: 'none' }}>
            {/* Top Rectangle: Overhanging label */}
            <div className="card-top-rectangle">
              <span className="card-title">IMAGINE THIS...</span>
            </div>

            {/* Middle Rectangle */}
            <div className="card-middle-rectangle">
              <video
                src="/assets/videoloop1.mp4"
                autoPlay
                loop
                muted
                playsInline
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Bottom Rectangle with ORDER NOW box */}
            <div className="card-bottom-rectangle" style={{ pointerEvents: 'none' }}>
              <PopupButton
                id="yyPNXkPK"
                className="order-button"
                size={80}
                style={{ width: '100%', zIndex: 10, position: 'relative', pointerEvents: 'auto' }}
              >
                GET CAMERAS!
              </PopupButton>
            </div>
          </div>

          {/* Pinned SVG - always on the far right */}
          {/* <img
            src='./assets/camera-icon117.svg'
            alt="Camera Edge"
            className="camera-edge-svg"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default WelcomeCamera;
