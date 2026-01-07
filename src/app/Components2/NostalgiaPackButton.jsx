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
      className={`nostpack-container ${expanded ? 'expanded' : ''}`}
      ref={cardRef}
      onClick={handleToggle}
      aria-expanded={expanded}
    >
      {/* Background for hover tilt (hidden when expanded) */}
      {!expanded && <div className="nostpack-background" />}

      {/* 3 icons animate in on hover (only if not expanded) */}
      {!expanded && (
        <>
          <img className="star star1" src="/assets/camera-icon10.svg" alt="Camera Icon 11" style={{ width: '96px', height: '96px' }} />
          <img className="star star2" src="/assets/camera-icon12.svg" alt="Camera Icon 12" style={{ width: '96px', height: '96px' }} />
          <img className="star star3" src="/assets/camera-icon13.svg" alt="Camera Icon 13" style={{ width: '96px', height: '96px' }} />
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
        <div className="nostpack-card nostpack-default">
            <p className="nostpack-topline">Learn about our...</p>
          <h2 className="nostpack-title">
            <span className="nostalgia-title-word"><em>CAMERA.</em></span><br />
            <span className="package-title-word">PACKAGE</span>
          </h2>
          <p className="nostpack-subtext">
          Our entry-level product----15 <i>"indisposible"</i> cameras catered to the moment.
          <p className="price-right"><i>Pricing Begins at $2,500</i></p>
            <span className="emoji"></span>
          </p>
        <div className="nostpack-ellipse">
        <p>Pack</p>
      </div>
      <div className="nostpack-ellipse2">
            <p1>1</p1>
          </div>
      </div>
      )}

      {/* ========== EXPANDED STATE ========== */}
      {expanded && (
        <div className="nostpack-expanded-layout">
          {/* LEFT CARD (with overhanging rectangle) */}
          <div className="nostpack-expanded-card left-card">
            {/* Overhanging title box */}
            <div className="nostpack-overflow-title">
              <h3><u>CAMERAS</u></h3>
              <p><i>"Indisposible"</i> Nostalgia. Infinite Possibilities.</p>
            </div>

            {/* Inner frame for text content */}
            <div className="nostpack-inner-frame">
              {/* <h3 className="subcard-title">
                "RAPID" PRINT <span className="emoji">🚀</span>
              </h3> */}
              <p>
              Some moments are meant to be disposable—but that doesn't 
              mean they should be photographed on disposable cameras. 
              <br/><br/>Our signature package brings only what is neccessary, 
              reusable, vintage, and tactile <u>digital</u> cameras, with an emphasis on the fun of the moment and the joys of photography. 
              <br/><br/>This package has no camera bar, no spectacle—just "indisposible" cameras 
              handed off to the guests who get it. It's for the events that need cameras in the moment, 
              not on the sidelines, in a more traditional way- on tables, spread out, and only for those who find them. <br/><br/>We reccommend including 
              one Cam-Tender to help guide guests to the best moments, to teach how to use them, and to get the photos and video they imagine.
              </p>
              <h3>DAY-OF:</h3>
              <ul>
                <li>📸 15 Digital Cameras: 
                    <p>Small, simple, and made to be passed      
                      around. The goal is a candid memory archive of the event. Guests find them, pick the up, 
                      and use them to capture what they want like any disposable camera would allow - only no limits here... </p>
                </li>
                <li>📼 Interactive Memories: 
                    <p>No moment, no detail, and no person should go unphotographed. We make sure that every guest has a camera in their hands, 
                      and that they are able to capture the moment they want to capture.</p>
                </li>
                <li>📤 Delivery in 36 hours: 
                    <p>You get every digital files, plus a fully   
                    preserved archive of the night sent to you within 12 hours of the events conclusion. 
                    If agreed upon, we can send the files to the guests who captured the night as well; <i>making the night a little more interactive and ready to post.</i></p>
                </li>
                <li>🎥 1 Cam-Tender (+$150/hr): 
                    <p>Our Cam-tender inspires capturing cadid moments, ephasizing a fun and
                      inclusive experience. They are all talented photograohers that can garuntee a lot of photos on their own.
                      Beyond that they look for the natural storytellers at your event, put the cameras in their hands and make sure 
                      everyone has a good time and that nobody gets left out. <br /><br /> </p>
                </li>
              </ul>
              <ul>
              No production, no planning, no pressure. 
              Just real moments, instantly preserved.'
              </ul>
              <p1>
              <br /><br />
              (Pricing is based on a standard 4-hour event. Client will be billed $250/hr thereafter.)
              </p1>
            </div>
          </div>

          {/* RIGHT CARD (simpler) */}
          <div className="nostpack-expanded-card right-card">
            {/* Inner frame for text content */}
            <div className="nostpack-inner-frame">
            <h2><em>INCLUDES:</em></h2>
              <h5>
              <strong>Cameras (15):</strong><br />
                </h5>
                <br />
                <p>Digicam:</p>
                <h6>📸 📸 📸 📸 📸 <br />📸 📸 📸 📸 📸 <br />📸 📸 📸  <br /></h6>
                <br />
                <p>'VHS' Camcorder:</p>
                <h6>📸 📸 <br /> </h6>
              
            
                <strong>What You Get:</strong><br />
                  1. 15 Digital Cameras <br />
                  2. 1 Set of Back-Up batteries for each camera; labeled and ready to shoot <br />
                  3. An inviting "tag"to help guests find and understand the intricacies of the cameras.
                  4. Built-in insurance for each camera.

              <p><br />
              🔹 <em>Add on our <u>Cam-Tender</u> for $500 (+$150/hr) for when 
                  guests need a little more direction and <u>to make sure you get a ton of photos.</u> <br /><br />
                  
                  Want a little more?<br />
                  🔹 Add +5 more Cams ($600).<br />
                  🔹 Add +3 Video Camcorders ($800.)</em>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NostalgiaPackButton;
