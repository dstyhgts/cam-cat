import React, { useState, useEffect, useRef } from 'react';
import './HowItWorksButton.css';

const HowItWorksButton = () => {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);
  const buttonRef = useRef(null);
  const [prevScroll, setPrevScroll] = useState(0);

  // Toggle expanded on card click
  const handleToggle = (e) => {
    e.stopPropagation();
    if (!expanded) {
      setPrevScroll(window.scrollY);
      setExpanded(true);
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    } else {
      setExpanded(false);
      setTimeout(() => {
        if (buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect();
          const scrollTo = window.scrollY + rect.top - window.innerHeight / 2 + rect.height / 2;
          window.scrollTo({ top: scrollTo, behavior: 'smooth' });
        }
      }, 0);
    }
  };

  // Close if user clicks outside the card
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
      className={`hiw-container ${expanded ? 'expanded' : ''}`}
      ref={buttonRef}
      onClick={handleToggle}
      aria-expanded={expanded}
    >
      {/* Yellow background for hover tilt (hidden in expanded) */}
      {!expanded && <div className="hiw-background" />}

      {/* DEFAULT (256×256) */}
      {!expanded && (
        <div className="hiw-card hiw-default" ref={cardRef}>
          <h3><i><u>CAM</u>-CAT?</i></h3>
          {/* <h2> <i>CATERING</i></h2> */}
          <p className="hiw-subtext">
          <br />
            Explore our <i><u>one-of-a-kind</u></i> event photo & video experience and learn about <i><u>how it works.</u></i> <br />
            {/* Every guest sees the night differently... we let them take the lead. */}
          </p>
          <span className="arrow">→</span>
        </div>
      )}

      {/* EXPANDED */}
      {expanded && (
        <div className="hiw-card hiw-expanded" ref={cardRef}>
          <div className="hiw-overflow-title">
            <h1><i>What</i> Is <br /><i><u>Camera Catering?</u></i></h1>
          </div>

          <div className="hiw-expanded-content">
            <p className="intro-paragraph">
            <i>Every guest sees the 
            night differently. 
            We make sure those 
            perspectives don't 
            get lost!</i>
            </p>

            <h6>WE BRING THE CAMERAS. <br/>YOU DO THE REST.</h6>

            <img className="hiw-overflow-svg" src="/assets/camera-icon12.svg" alt="Camera Icon" />

            <ul className="hiw-bullets">
              {/* <li>
                <span className="emoji">🔥</span>
                <i>Instant Print Cameras</i><br />
                <span className="li-desc">
                  <p1>Guests can snap, print, and share their images instantly. No apps,
                  no filters—just tangible, real-time memories in their hands.</p1>
                </span>
              </li> */}
              <li>
                <span className="emoji">1)</span>
                <i>Digital, Film, VHS &amp; Instat Print Cameras</i><br />
                <span className="li-desc">
                <p1>We bring anywhere form 1-50 classic cameras to your event. Teh goal is to guve your guests a hands-on experience that cover the full scope of photography and video.
                  We set the stage for them to snap, pass, and share the cameras as they see fit, and become the arbiters of the story that is your event.</p1>
                </span>
              </li>
              <li>
                <span className="emoji">2)</span>
                <i>Cam-Tenders + The Camera Bar</i><br />
                <span className="li-desc">
                <p1>The Full Experience: Our "Cam-Tenders" and our "Camera Bar" are there to help guide your guests on their journey for a creative experience.
                They aren't just handing out gear and props; they're igniting the energy, 
                breaking the ice, and keeping the cameras in motion. They aren't photographers, they are your guests' co-conspirators, directors, and influencers whom aim to inspire creativity through their passion for photography and video.</p1>
                </span>
              </li>
              <li>
                <span className="emoji">3)</span>
                <i>Get Into Character</i><br />
                <span className="li-desc">
                <p1>Everyone loves playing with props. We bring a variety of props, accessories, and costumes to help guests tell their story and make it their own.</p1>
                </span>
              </li>
            </ul>

            <div className="hiw-experience">
              <p><i>From the moment the cameras hit their hands, guests are documenting their own experience 
                  from inside the action, not watching from the sidelines.
                  <br/><br/>
                  After the event, we digitize everything, giving hosts and guests a full archive of the night. 
                  We make sure those memories stay with the people who made them for good.</i></p>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HowItWorksButton;
