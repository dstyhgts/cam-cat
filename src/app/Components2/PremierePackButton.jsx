import React, { useState, useEffect, useRef, useMemo } from 'react';
import './PrintPackButton.css';
import './PremierePackButton.css';

const PrintPackButton = () => {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);

  // SVGs for the stars (adjustable)
  const starSvgs = [
    '/assets/camera-icon20.svg',
    '/assets/camera-icon21.svg',
    '/assets/camera-icon23.svg',
  ];
  // Randomize order on each render
  const randomizedStars = useMemo(() => starSvgs.sort(() => Math.random() - 0.5), []);

  // Toggle expanded on card click
  const handleToggle = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  // Close if user clicks outside the main container
  useEffect(() => {
    if (!expanded) return;

    const handleDocClick = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener('click', handleDocClick);
    return () => {
      document.removeEventListener('click', handleDocClick);
    };
  }, [expanded]);

  return (
    <div
      className={`premiere-container ${expanded ? 'expanded' : ''}`}
      ref={cardRef}
      onClick={handleToggle}
      aria-expanded={expanded}
    >
      {/* Background for hover tilt (hidden when expanded) */}
      {!expanded && <div className="premiere-background" />}

      {/* 3 icons animate in on hover (only if not expanded) */}
      {!expanded && (
        <>
          <img className="star star1" src={randomizedStars[0]} alt="Camera Icon 1" style={{ width: '96px', height: '96px' }} />
          <img className="star star2" src={randomizedStars[1]} alt="Camera Icon 2" style={{ width: '96px', height: '96px' }} />
          <img className="star star3" src={randomizedStars[2]} alt="Camera Icon 3" style={{ width: '96px', height: '96px' }} />
        </>
      )}

      {/* Two arrows at bottom (behind the card) */}
      {!expanded && (
        <div className="bottom-arrows">
          <span className="arrow-down">↓</span>
          <span className="arrow-down">↓</span>
        </div>
      )}

      {/* ========== DEFAULT / HOVER (512×256) ========== */}
      {!expanded && (
        <div className="premiere-card printpack-default">
            <p className="printpack-topline">Learn about our...</p>
          <h2 className="printpack-title"><em><u>PREMIERE</u></em> PACKAGE</h2>
          <p className="printpack-subtext">
          This is the full story - with one professional 
          phototographer and one filmmaker making sure the entire story gets told.
            <span className="emoji"></span>
          </p>
        <div className="premiere-ellipse">
        <p>Pack</p>
      </div>
      <div className="premiere-ellipse2">
            <p1>3</p1>
          </div>
      </div>
      )}

      {/* ========== EXPANDED STATE ========== */}
      {expanded && (
        <div className="premiere-expanded-layout">
          {/* LEFT CARD (with overhanging rectangle) */}
          <div className="premiere-expanded-card left-card">
            {/* Overhanging title box */}
            <div className="premiere-overflow-title">
              <h3><em>PREMIERE!</em> </h3>
              <p>The Big Picture... Roll out the red carpet.</p>
            </div>

            {/* Inner frame for text content */}
            <div className="premiere-inner-frame">
              {/* <h3 className="subcard-title">
                "RAPID" PRINT <span className="emoji">🚀</span>
              </h3> */}
              <p>
              If Classic is a time capsule, Premiere is the director's cut, 
              from possibly hundreds of directors... The "Full Bar" package.
              <br/><br/>
              Every guest-driven moment, every handoff, every stolen-frame 
              snapshot—stitched into something that actually tells the full 
              story. This is when we bring professionals in to fill in the gaps.
              <br/><br/>
              </p>
              <h4> 1. 1000+ Guaranteed* High-Quality Photos Delivered
              <br/>2. 45-Min Guaranteed* Home-Video Edit
              <br/>3. Infinite Video Footage
              <br/>4. Infinite Photos
              <br/>5. Time Frame: Event Duration + Set Up/Tear Down <br/><br/></h4>
              <h3>DAY-OF:</h3>
              <ul>
                <li>📸 50 Vintage Cams!
                    <p>Documenting every side of the event, from first 
                       arrivals to final toasts.</p>
                </li>
                {/* <li>📸 25 Novel© instant print cameras: 
                    <p>Small, simple, and made to be passed around. Every shot prints 
                      immediately, but every image is also stored digitally. </p>
                </li> */}
                <li>🎥 3 Cam-Tenders*: 
                    <p>Facilitating, shooting, making sure no storyline is 
                      left unfinished.</p>
                </li>
                <li>🗝 Fully Loaded Camera Bar:
                    <p>Both acting as an event spectacle and community center. 
                      This is more than just the house of cameras—it's a hub 
                      for all things props, costumes, and adventure. </p>
                </li>
                <li>📷 +1 Pro-Photographer: 
                    <p>They're there solely to capture the best stills of the 
                      night.</p>
                </li>
                <li>🎥 +1 Pro-Filmmaker: 
                    <p>Focused entirely on moving images, ensuring the night 
                      flows seamlessly on screen. </p>
                </li>
                <li>🎭 Vintage Props & Fashion :
                    <p>A substantially enticing mix of vintage props and 
                      consume accessories - designed to bring some personal 
                      touch to your guests and whatever stories they're 
                      telling. </p>
                </li>
              </ul>
              <p>
              🔹 Raw video categorized by the person who filmed it 
              (full content available on request); because nothing is 
              worse than thousands of photos where nowhere to put them.
                  <br /><br />
              </p>
              <br />
              <h2>
              "THIS ISN'T JUST
                  MORE...  .       IT'S
                    COMPLETE."
                    </h2>
            </div>
          </div>

          {/* RIGHT CARD (simpler) */}
          <div className="premiere-expanded-card right-card">
            {/* Inner frame for text content */}
            <div className="premiere-inner-frame">
            <h2><em>INCLUDES:</em></h2>
              <h5>
                <strong>Cams (45):</strong><br />
                </h5>
                <p>Digicam:</p>
                <h6>📸 📸 📸 📸 📸 <br />📸 📸 📸 📸 📸 <br />
                📸 📸 📸 📸 📸 <br /> 📸 📸 📸 📸 📸 <br /></h6><br />
                <p>'VHS' Camcorder:</p>
                <h6>📸 📸 📸 📸 📸 <br />📸 📸 📸 📸 📸  <br /></h6><br />
                <p>Vintage Film:</p>
                <h6>🎥 🎥 🎥 🎥 🎥 <br />🎥 🎥 🎥 🎥 🎥 <br />🎥 🎥 🎥 🎥 🎥 <br /></h6>
                {/* <p>Rapid® Print:</p>
                <h6>📸 📸 📸 📸 📸 <br />📸 📸 📸 📸 📸 <br />
                📸 📸 📸 📸 📸 <br />📸 📸 📸 📸 📸 <br />
                📸 📸 📸 📸 📸 <br /></h6>
                <p>  */}
                <p>
                <br />
              
                <h3><strong>DAY-AFTER:</strong><br /></h3>
                <h5>(Deliverables)</h5>
                <br />📸 Total Images Delivered: 1000+
                <br />📸 Professionally Edited Photos: 100
                <br /> 📼 Total Video Captured: Up to 12 hour
                <br />🎥 Trimmed Version: 30 minutes of refined unedited footage
                <br /> 🎞 5 Polished + Edited Social Posts (with 1 revision rounds) 
                <br />🎞 30 Min nostalgia Home-Video edit that captures the night like it's already a childhood memory.
                <br />🎞 Every image and video is reviewed before delivery (removing unusable content)
                <br />📤 Everything Delivered in 72 hours: from the edits to the raw images, everything will be fully available 72 hours after the event's end. Becuase time moves fast, and we want you to slow down and look around.
              </p>
              {/* <p><br />
                <em>Add a Cam-Tender ($150/hr)—<br />for when 
                  guests need a little direction. <br /><br />
                  
                  Want a little more?<br />
                  Add +10 more Rapid®
                  Print Cams for $500.</em>
              </p> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintPackButton;
