import React, { useRef, useState, useEffect } from 'react';
import './WelcomeCamera.css';
import Footer from '../Components/Footer';
import LandingGallery from '../Components/LandingGallery';
import { PopupButton } from '@typeform/embed-react';

// Responsive hook
function useIsMobile(maxWidth = 400) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= maxWidth : false
  );
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= maxWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [maxWidth]);
  return isMobile;
}

const WelcomeCamera = () => {
  const isMobile = useIsMobile(400);
  const [videoLoading, setVideoLoading] = useState(true);

  // Simple spinner component
  const Spinner = () => (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 20,
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div className="video-spinner" />
    </div>
  );

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
          {/* Card(s) */}
          <div style={{ position: 'relative', width: isMobile ? '100vw' : '525px', height: isMobile ? 'auto' : '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isMobile ? (
              // Only show the video card on mobile
              <div className="item" style={{ width: '90vw', maxWidth: 250, height: 'auto', margin: '0 auto', background: '#e3e3e3', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {videoLoading && <Spinner />}
                <video
                  src="/assets/BrookeBDAY2.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.3em', background: 'transparent' }}
                  onLoadedData={() => setVideoLoading(false)}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <>
                {/* Card 1: Image */}
                <div className="item" style={{ left: '0%', top: '20%', width: '250px', height: '281px', transform: 'rotate(-14deg)', zIndex: 1 }}>
                  <img src="/assets/img57.JPG" alt="Event 1" />
                </div>
                {/* Card 2: Video */}
                <div className="item" style={{ left: '31.25%', top: '0%', width: '250px', height: '281px', transform: 'rotate(7deg) scale(1.15)', zIndex: 2, background: '#e3e3e3', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute' }}>
                  {videoLoading && <Spinner />}
                  <video
                    src="/assets/BrookeBDAY2.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.3em', background: 'transparent' }}
                    onLoadedData={() => setVideoLoading(false)}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                {/* Card 3: Image */}
                <div className="item" style={{ left: '62.5%', top: '25%', width: '250px', height: '281px', transform: 'rotate(13deg)', zIndex: 0 }}>
                  <img src='/assets/img29.jpg' alt="Event 2" />
                </div>
              </>
            )}
          </div>
          {/* GET CAMERAS button, original styling and class names */}
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
          <style jsx global>{`
            /* Ensure Typeform popup overlays are always above navbar/sidebar */
            .tf-v1-popup, .tf-v1-widget, .tf-v1-modal, .tf-v1-iframe-container, .tf-v1-iframe, .tf-v1-widget-open {
              z-index: 10000001 !important;
            }
            .video-spinner {
              border: 6px solid #f3f3f3;
              border-top: 6px solid #555;
              border-radius: 50%;
              width: 48px;
              height: 48px;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCamera;
