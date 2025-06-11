import React from 'react';
import './WelcomeCamera.css';
import Footer from '../Components/Footer';
import LandingGallery from '../Components/LandingGallery';

const WelcomeCamera = () => {
  const handleOrderNow = () => {
    console.log('Order Now clicked');
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1
      }}>
        <LandingGallery />
      </div>
      <div className="welcome-camera-container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Left side: Title & text */}
        <div className="left-content">
          {/* <h1 className="main-title">YOU HOLD THE CAMERA*</h1> */}
          {/* <h1 className="main-title">UNLIMITED CONTENT AT YOUR EVENT.</h1> */}
          <h1 className="main-title">YOU'RE THE CONTENT CREATOR</h1>
          {/* <p className="subtitle">
            Every celebration is a story. Camera Catering makes each guest the storyteller.
          </p> */}
          <p className="subtitle">
            Every celebration is a story. Every Camera makes a storyteller.
          </p>

          <div className="new-section">
            <span className="new-badge">*NEW!</span>
            <p className="new-description">
              {/* Rapid® Print cameras to take the user experience to the next level. 
              It's basically a hand-held Photo Booth, but so much better. Trust us. */}
            </p>
            <p className="new-description">
              The possibility for thousands of photographs and videos of your event, 
              all on one roll of paper, from every angle.
            </p>
          </div>
        </div>

        {/* Right side: Multi-layered card + pinned SVG */}
        <div className="right-content">
          <div className="fancy-card">
            {/* Top Rectangle */}
            <div className="card-top-rectangle">
              <h2 className="card-title">Start here...</h2>
            </div>

            {/* Middle Rectangle */}
            <div className="card-middle-rectangle">
              <p>A new concept for event photography using vintage cameras put into the
              hands of your guests.</p>
              <p></p>
            </div>

            {/* Bottom Rectangle with ORDER NOW box */}
            <div className="card-bottom-rectangle">
              <button className="order-button" onClick={handleOrderNow}>
                Get Started
              </button>
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
