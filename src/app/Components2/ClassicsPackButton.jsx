import React, { useState, useEffect, useRef, useMemo } from 'react';
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

  // SVGs for the stars (adjustable)
  const starSvgs = [
    '/assets/camera-icon10.svg',
    '/assets/camera-icon20.svg',
    '/assets/camera-icon20.svg',
  ];
  // Randomize order on each render
  const randomizedStars = useMemo(() => starSvgs.sort(() => Math.random() - 0.5), []);

  return (
    <div
      className={`classics-container ${expanded ? 'expanded' : ''}`}
      ref={cardRef}
      onClick={handleToggle}
      aria-expanded={expanded}
    >
      {/* Background for hover tilt (hidden when expanded) */}
      {!expanded && <div className="classics-background" />}

      {/* 3 icons animate in on hover (only if not expanded) */}
      {/* {!expanded && (
        <>
          <img className="star star1" src={randomizedStars[0]} alt="Camera Icon 1" style={{ width: '96px', height: '96px' }} />
          <img className="star star2" src={randomizedStars[1]} alt="Camera Icon 2" style={{ width: '96px', height: '96px' }} />
          <img className="star star3" src={randomizedStars[2]} alt="Camera Icon 3" style={{ width: '96px', height: '96px' }} />
        </>
      )} */}

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
          <h2 className="classics-title">*CLASSIC PACKAGE</h2>
          <p className="classics-subtext">
           Our Classic Package welcomes The Camera Bar to your event. <u>Make your party unlike any other...</u> one to <i>never forget.</i>
            <p className="price-right"><i>Pricing Begins at $4,100</i></p>

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
              <h3>CAM-BAR*</h3>
              <p>Raise <i>The Bar</i> to a hollywood-worthy story.</p>
            </div>

            {/* Inner frame for text content */}
            <div className="classics-inner-frame">
              {/* <h3 className="subcard-title">
                "RAPID" PRINT <span className="emoji">🚀</span>
              </h3> */}
              <p>
              Somewhere in the room, there's a bar. But not the kind you're thinking of.
              The Camera Bar is a curiosity—a beacon for the ones who get it. Stocked 
              with vintage cameras and strange little props, it's an invitation to step 
              outside of time. No selfie filters, no posing for the 'gram—just real 
              people, real memories, caught the way they should be (by the people living them).

              <br /><br />
              When the guest count is bigger, the event more interactive, and the memories more important, this package is the package for you.
              </p>
              <h3>DAY-OF:</h3>
              <ul>
                <li>🗝 The Camera Bar:
                    <p>Both acting as an event spectacle, community center- 
                      this is more than just the house of cameras—it's a hub 
                      for all things props, costumes, and adventure. It's place to come together, to be creative, and to be yourself- 
                      under the guidance of our Cam-Tenders.</p>
                </li>
                <li>📸 30 vintage cameras:
                    <p>Here we introduce your guests to VHS camcorders & film photography cameras. Small, simple, and made to be passed around. Left out, handed off, 
                      capturing the event from every possible angle, for both a photographic and video archive. </p>
                </li>
                <li>🎥 2 Cam-Tenders*: 
                    <p>Two Camera-Men or Woman guide guests into the world of 
                      analog nostalgia, and make sure the cameras get into the hands of your guests. Our Cam-tenders inspire
                      capturing cadid moments, finding the natural storytellers at your event, and guiding 
                      each person to find their own story worth telling. They also teach how to use the cameras, and curate each guest's 
                      experience with the cameras best suited for them. 
                      (*Up to 4 Hours; billed at $150/hr thereafter)</p>
                </li>
                
                <li>📤 Delivery in 36 hours:
                    <p>Sent directly to the host and guests who captured the night via email & text. We make sure that the best 
                      shots don't get lost in someone's camera roll.</p>
                </li>
              </ul>
              <p>
              🔹 Raw video categorized by the person who shot/filmed it; because nothing is 
                worse than thousands of photos with nowhere to put them and no way to find them.
                  <br /><br />
              This package is far more structured and interactive than our "Camera Package", but just as effortless. 
              If you've got a photographer, this slides right in alongside 
              them. If you don't, it might make you wonder if you even needed 
              one...'
              </p>
              <p1>
              <br />
              (Pricing is based on a standard 4-hour event. Client will be billed $250/hr thereafter.)
              </p1>
            </div>
          </div>

          {/* RIGHT CARD (simpler) */}
          <div className="classics-expanded-card right-card">
            {/* Inner frame for text content */}
            <div className="classics-inner-frame">
              <h2><em>INCLUDES:</em></h2>
              <h5>
                <strong>Cameras (30):</strong><br />
                </h5>
                <p>Digicam:</p>
                <h6>📸 📸 📸 📸 📸 <br />📸 📸 📸 📸 📸 <br />📸 📸 📸 📸 📸 <br />📸 📸 📸 📸 📸 <br /></h6>
                <p>'VHS' Camcorder:</p>
                <h6>📹 📹 📹 📹 📹<br />📹 <br /></h6>
                <p>Vintage Film:</p>
                <h6>🎥 🎥 🎥 🎥 <br /></h6>
                {/* <p>Rapid® Print:</p>
                <h6>📸 📸 📸 📸 📸 <br />📸 📸 📸 📸 📸 <br /></h6> */}
                <p> 
                <br />
              
                <h3><strong>DAY-AFTER:</strong><br /></h3>
                <h5>(Deliverables)</h5>
                <br />📸 Total Images Delivered: <u>ALL!</u>
                <br />📸 Professionally Edited Photos: <u>25</u> of our favorites.
                <br /> 📼 Total Video Captured: <u>ALL!</u> (Up to 6 hours)
                <br />🎥 Trimmed Version: <u>10 minutes</u> of refined recap footage
                <br />🎥 <u>3-minute highlight edit</u>—quick, fun, no revisions. A thank-you for letting us in.
                <br />🎞 Every image and video is reviewed before delivery (removing unusable content)
                <br />📤 Edits are Delivered in <u>36 hours</u>—because nostalgia hits best before the memories fade.
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
