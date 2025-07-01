import React, { useState, useEffect, useRef } from 'react';
import './PrintPackButton.css';
import './ClassicsPackButton.css';

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
      className={`classics-container ${expanded ? 'expanded' : ''}`}
      ref={cardRef}
      onClick={handleToggle}
      aria-expanded={expanded}
    >
      {/* Background for hover tilt (hidden when expanded) */}
      {!expanded && <div className="classics-background" />}

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
        <div className="classics-card classics-default">
            <p className="classics-topline">Learn about our...</p>
          <h2 className="classics-title">CLASSICS* PACKAGE</h2>
          <p className="classics-subtext">
           Welcome The Camera Bar to your event. <br />
            This package makes the party one to remember.
            <span className="emoji"></span>
          </p>
        <div className="classics-ellipse">
        <p>Pack</p>
      </div>
      <div className="classics-ellipse2">
            <p1>2</p1>
          </div>
      </div>
      )}

      {/* ========== EXPANDED STATE ========== */}
      {expanded && (
        <div className="classics-expanded-layout">
          {/* LEFT CARD (with overhanging rectangle) */}
          <div className="classics-expanded-card left-card">
            {/* Overhanging title box */}
            <div className="classics-overflow-title">
              <h3>THE HITS*</h3>
              <p>A hollywood-worthy story.</p>
            </div>

            {/* Inner frame for text content */}
            <div className="classics-inner-frame">
              {/* <h3 className="subcard-title">
                "RAPID" PRINT <span className="emoji">🚀</span>
              </h3> */}
              <p>
              Somewhere in the room, there’s a bar. But not the kind you’re thinking of.
              The Camera Bar is a curiosity—a beacon for the ones who get it. Stocked 
              with vintage cameras and strange little props, it’s an invitation to step 
              outside of time. No selfie filters, no posing for the ‘gram—just real 
              people, real memories, caught the way they should be.
              </p>
              <h3>DAY-OF:</h3>
              <ul>
                <li>🗝 The Camera Bar:
                    <p>Both acting as an event spectacle and community center. 
                      This is more than just the house of cameras—it’s a hub 
                      for all things props, costumes, and adventure. </p>
                </li>
                <li>📸 25 vintage cameras:
                    <p>Small, simple, and made to be passed around. Left out, handed off, 
                      capturing the event from every possible angle, for both a photographic and video archive. </p>
                </li>
                <li>🎥 2 Cam-Tenders*: 
                    <p>Two Camera-Men or Woman guide guests into the world of 
                      analog nostalgia, and make sure the cameras get into the hands of your guests. Our Cam-tenders inspire
                      capturing cadid moments, finding the natural storytellers at your event, and guiding 
                      each person to find their own story worth telling. </p>
                </li>
                
                <li>📤 Delivery in 36 hours:
                    <p>Sent directly to guests via email & text, so the best 
                      shots don’t get lost in someone’s camera roll.</p>
                </li>
              </ul>
              <p>
              🔹 Raw video categorized by the person who filmed it 
              (full content available on request); because nothing is 
              worse than thousands of photos where nowhere to put them.
                  <br /><br />
              More structured than “Nostalgia”, but still effortless. 
              If you’ve got a photographer, this slides right in alongside 
              them. If you don’t, it might make you wonder if you even needed 
              one.'
              </p>
            </div>
          </div>

          {/* RIGHT CARD (simpler) */}
          <div className="classics-expanded-card right-card">
            {/* Inner frame for text content */}
            <div className="classics-inner-frame">
              <h2><em>INCLUDES:</em></h2>
              <h5>
                <strong>Cams (25):</strong><br />
                </h5>
                <p>Digicam:</p>
                <h6>📸 📸 📸 📸 📸 <br />📸 📸 📸 📸 📸 <br />📸 📸 📸 📸 📸 <br /></h6>
                <p>'VHS' Camcorder:</p>
                <h6>📸 📸 📸 📸 📸 <br />📸  <br /></h6>
                <p>Vintage Film:</p>
                <h6>🎥 🎥 🎥 🎥 <br /></h6>
                {/* <p>Rapid® Print:</p>
                <h6>📸 📸 📸 📸 📸 <br />📸 📸 📸 📸 📸 <br /></h6> */}
                <p> 
                <br />
              
                <h3><strong>DAY-AFTER:</strong><br /></h3>
                <h5>(Deliverables)</h5>
                <br />📸 Total Images Delivered: ALL!
                <br />📸 Professionally Edited Photos: 25
                <br /> 📼 Total Video Captured: ALL! (Up to 6 hours)
                <br />🎥 Trimmed Version: 10 minutes of refined unedited footage
                <br />🎥 3-minute highlight edit—quick, fun, no revisions. A thank-you for letting us in.
                <br />🎞 Every image and video is reviewed before delivery (removing unusable content)
                <br />📤 Edits are Delivered in 36 hours—because nostalgia hits best 12-36 hours later. We’re right on the line.
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
