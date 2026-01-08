import React, { useState, useEffect, useRef, useMemo } from 'react';
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
           Our Classic Package welcomes The Camera Bar to your event. <u> Make your party unlike any other...</u> one you <i>can't forget.</i>
            <p className="price-right"><i>Pricing Begins at $4,500</i></p>

            <span className="emoji"></span>
          </p>
        <div className="classics-ellipse">
        <p>Pack</p>
      </div>
      <div className="classics-ellipse2">
            <p1>3</p1>
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
              Somewhere in the room, there's a bar... but not the kind you're thinking of...
              <br /><br />
              The Camera Bar is a curiosity amidst the chaos. It's a beacon for creativity for the ones who get it. 
              Stocked with vintage cameras and strange little props, it is an invitation to step 
              into the heart of the event. This is where storytellers gather, and the best stories are born.

              <br /><br />
              When the guest count is bigger, the event more interactive, and the memories more magical, this package is the package for you.
              </p>
              <h3>INCLUDES:</h3>
              <ul>
                <li>1) The Camera Bar:
                    <p>Acting as an event spectacle, and hub, this is the place to come together, to be creative, and to be yourself under 
                      the guidance of our Cam-Tenders.</p>
                </li>
                <li>2) 30 Cameras:
                    <p>From Digicams and Camcorders, to Instant Print and Film Cameras, we cover the full scope of photography and video. 
                      We bring a every variety of cameras to your event, and make sure to guide your guests on how to use them for the best results. </p>
                </li>
                <li>3) A Cam-Tender*: 
                    <p> Our Cam-Tenders guide guests into the world of nostalgia, and make sure the cameras get into the hands of your guests. 
                      Our Cam-tenders are hired for their ability to capture cadid moments, find the natural storytellers at your event, and guide 
                      each person to find their own story worth telling. They also act as professors; teaching guests how to use the cameras, how to spot the best moments, and how to curate each guest's 
                      experience with the cameras best suited for them. <br />

                      *Up to 4 Hours; billed at $150/hr thereafter</p>
                </li>
                <li>4) QR Codes:
                    <p>
                      We know that some guests are used to their phones, and we want to make sure that they are able to upload their photos and videos to a central location for easy sharing. The QR Codes are places around the event, and prominantly displayed on the walls of the Camera Bar.
                    </p>
                    </li>
                <li>5) Delivery in 72 hours:
                    <p>Becasue of the nature of the cameras, our film cameras take a little longer to develop. We make sure to get the best photos and videos from your event, and deliver them to you within 72 hours of the event's end. All of them. Every one.</p>
                </li>
              </ul>
              <p> <br /> <i>
              This package is far more structured and interactive than our "Digital" or "Print" Packages, and just as effortless. With the addition of a Cam-Tender, this package is perfect for events that want to capture a lot of photos and videos, 
              and also want to share a lot of fun that the cameras can bring to the event.
              <br /><br />
              If you've got a photographer, this slides right in alongside them. If you don't... well you might soon wonder if you even needed one...'
              </i>
              {/* <br /><br /> <i>
              🔹 Raw video categorized by the person who shot/filmed it; because nothing is 
                worse than thousands of photos with nowhere to put them and no way to find them.</i>
                  <br /><br /> */}
              </p>
              <p1>
              {/* (Pricing is based on a standard 4-hour event. Client will be billed $250/hr thereafter.) */}
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
                <h6>📸 📸 📸 📸 📸 <br />📸 📸 📸 📸 📸 <br /></h6>
                <p>Instax Cameras:</p>
                <h6>📷 📷 📷 📷 📷 <br />📷 📷 📷 📷 📷 <br /></h6>
                <p>'VHS' Camcorder:</p>
                <h6>📹 📹 📹 📹 📹<br /></h6>
                <p>Classic Film:</p>
                <h6>🎞️ 🎞️ 🎞️ 🎞️ 🎞️ <br /></h6>
                {/* <p>Vintage Film:</p>
                <h6>🎥 🎥 🎥 🎥 <br /></h6> */}
                {/* <p>Rapid® Print:</p>
                <h6>📸 📸 📸 📸 📸 <br />📸 📸 📸 📸 📸 <br /></h6> */}
                <p> 
                <br />
              
                {/* <h3><strong>DAY-AFTER:</strong><br /></h3> */}
                <h5>What You Get:</h5>
                <br />1) 30 Cameras.
                <br />2) 20x Packs of Photo Paper for Printing (Print up to 20 photos each).
                <br />3) Back-up batteries for each camera.
                <br />4) Back-up storage for each camera.
                <br />5) 5 Back-up Cameras just in case.
                <br />6) Our QR Code "tag" made for uploading photos and videos from guests phones.

                <h5>Deliverables:</h5>
                <br />1) All images and videos from your event.
                <br />2) <u>500</u> Professionally Edited Photos.
                <br />3) Up to <u>5 Hours</u> of Total Video Captured.
                <br />4) Trimmed Short Film: <u>5-10 minutes</u> of refined recap footage.
                <br />5) <u>3-minute highlight edit</u>—quick, fun, no revisions. A thank-you for letting us in.
                <br /><br /><em>
                <br />🎞 Every image and video is reviewed before delivery (removing unusable content)
                <br />📤 Edits are Delivered in <u>72 hours</u>—because nostalgia hits best before the memories fade.</em>
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
