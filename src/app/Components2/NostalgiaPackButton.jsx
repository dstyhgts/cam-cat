import React, { useState, useEffect, useRef } from 'react';
import './NostalgiaPackButton.css';

const NostalgiaPackButton = () => {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);

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
      className={`printpack-container ${expanded ? 'expanded' : ''}`}
      ref={cardRef}
      onClick={handleToggle}
      aria-expanded={expanded}
    >
      {/* Background for hover tilt (hidden when expanded) */}
      {!expanded && <div className="printpack-background" />}

      {/* 3 stars animate in on hover (only if not expanded) */}
      {!expanded && (
        <>
          <div className="star star1" />
          <div className="star star2" />
          <div className="star star3" />
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
        <div className="printpack-card printpack-default">
            <p className="printpack-topline">Learn about our...</p>
          <h2 className="printpack-title">
            <span className="nostalgia-title-word"><em>NOSTALGIA</em></span><br />
            <span className="package-title-word">PACKAGE</span>
          </h2>
          <p className="printpack-subtext">
          Our entry-level product----15 indisposible cameras catered to the moment.
            <span className="emoji"></span>
          </p>
        <div className="printpack-ellipse">
        <p>Pack</p>
      </div>
      <div className="printpack-ellipse2">
            <p1>★</p1>
          </div>
      </div>
      )}

      {/* ========== EXPANDED STATE ========== */}
      {expanded && (
        <div className="printpack-expanded-layout">
          {/* LEFT CARD (with overhanging rectangle) */}
          <div className="printpack-expanded-card left-card">
            {/* Overhanging title box */}
            <div className="printpack-overflow-title">
              <h3>NOSTALGIA</h3>
              <p>Indisposible Memories.</p>
            </div>

            {/* Inner frame for text content */}
            <div className="printpack-inner-frame">
              {/* <h3 className="subcard-title">
                "RAPID" PRINT <span className="emoji">🚀</span>
              </h3> */}
              <p>
              Some moments are meant to be disposable—but that doesn't 
              mean they should be photographed on disposable cameras. Our signature package brings only what is neccessary, 
              reusable, vintage, and tactile cameras, with an emphasis on the fun of the moment and the joys of photography. No camera bar, no spectacle—just "indisposible" cameras, 
              handed off to the guests who matter most. This package is for the events who need cameras in the moment, 
              not on the sidelines. Included is one Cam-Tender to help guide guests to the best moments.
              </p>
              <h3>DAY-OF:</h3>
              <ul>
                <li>📸 15 Digital Cameras: 
                    <p>Small, simple, and made to be passed      
                      around. The goal is a candid memory archive of the event. </p>
                </li>
                <li>🎥 1 Cam-Tender: 
                    <p>Our Cam-tender inspires capturing cadid moments, ephasizing a fun and
                      inclusive experience. They find the natural storytellers at your event,
                      put the cameras in their hands. They make sure everyone has a good time and
                      that nobody gets left out. </p>
                </li>
                <li>📼 Digital Archives + Real Memories: 
                    <p>No moment, no detail, and no person should go unphotographed.</p>
                </li>
                <li>📤 Delivery in 12 hours: 
                    <p>You get every digital file, plus a fully   
                    preserved archive of the night. <br /><br /></p>
                </li>
              </ul>
              <p1>
              No production, no planning, no pressure. 
              Just real moments, instantly preserved.'
              </p1>
            </div>
          </div>

          {/* RIGHT CARD (simpler) */}
          <div className="printpack-expanded-card right-card">
            {/* Inner frame for text content */}
            <div className="printpack-inner-frame">
            <h2><em>INCLUDES:</em></h2>
              <h5>
              <strong>Cams (15):</strong><br />
                </h5>
                <br />
                <p>Digicam:</p>
                <h6>📸 📸 📸 📸 📸 <br />📸 📸 📸 📸 📸 <br /></h6>
                <br />
                <p>'VHS' Camcorder:</p>
                <h6>📸 📸 📸 📸 📸 <br /> </h6>
                <br />
              
              
                <strong>What You Get:</strong><br />
                  1. One Cam-Tender; to guide and inspire. <br />
                  2. Back-Up batteries <br />
                  3. 3x Fast Charging
                     kits for when any
                     camera isn't any        
                     life at any party.

              <p><br />
                <em>Add another Cam-Tender ($150/hr)<br />for when 
                  guests need a little more direction. <br /><br />
                  
                  Want a little more?<br />
                  Add +10 more Cams for $800.</em>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NostalgiaPackButton;
