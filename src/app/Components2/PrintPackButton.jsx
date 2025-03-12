import React, { useState, useEffect, useRef } from 'react';
import './PrintPackButton.css';

const PrintPackButton = () => {
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
          <h2 className="printpack-title">"PRINT" PACKAGE</h2>
          <p className="printpack-subtext">
          Our signature product----the one you’re probably
          here for. This is by far our most popular choice.
            <span className="emoji"></span>
          </p>
        <div className="printpack-ellipse">
        <p>Pack</p>
      </div>
      <div className="printpack-ellipse2">
            <p1>1</p1>
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
              <h3>"PRINT"</h3>
              <p>Handheld Photobooths.</p>
            </div>

            {/* Inner frame for text content */}
            <div className="printpack-inner-frame">
              {/* <h3 className="subcard-title">
                "RAPID" PRINT <span className="emoji">🚀</span>
              </h3> */}
              <p>
              Some moments are meant to be disposable—but that doesn’t 
              mean they should be forgotten. This is our signature package: 
              the bare-bones, blink-and-you’ll-miss-it version of the experience. 
              No camera bar, no spectacle—just cameras, handed off to the guests
              who matter most. The ones in the thick of the action, capturing the 
              real stuff.
              </p>
              <h3>DAY-OF:</h3>
              <ul>
                <li>📸 15 Rapid© Print Cameras: 
                    <p>Small, simple, and made to be passed      
                      around. Every shot prints immediately, <br />but 
                      every image is also stored digitally. </p>
                </li>
                <li>📼 Physical Keepsakes + Digital Archives: 
                    <p>So no moment is lost, even after the prints        
                      fade.</p>
                </li>
                <li>📤 Delivery in 12 hours: 
                    <p>You get every digital file, plus a fully   
                    preserved archive of the night. <br /><br />*Camera    
                    rentals cover entire event duration ONLY.</p>
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
                <strong>Cams (15):</strong><br />              </h5>
                <h6>📸 📸 📸 📸 📸 <br />📸 📸 📸 📸 📸 <br />📸 📸 📸 📸 📸 <br /></h6>
              <p> <br />
                <strong>Gear:</strong><br />
                  1. 30x Rolls of print 
                     ready paper (Print
                     up to 70 photos
                     each). <br />
                  2. 5 Back-up Rapid®
                      Print Cameras. <br />
                  3. 3x Fast Charging
                     kits for when any
                     camera isn’t any        
                     life at any party.
              </p>
              <p><br />
                <em>Add a Cam-Tender ($150/hr)—<br />for when 
                  guests need a little direction. <br /><br />
                  
                  Want a little more?<br />
                  Add +10 more Rapid®
                  Print Cams for $500.</em>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintPackButton;
