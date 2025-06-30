import React, { useState, useEffect, useRef } from 'react';
import './PrintPackButton.css';
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
          <h6><i>HOW</i> IT* WORKS</h6>
          <p className="hiw-subtext">
          <br /><br />
            Every guest sees the night differently.<br />
            We make sure those perspectives don't get lost!
          </p>
          <span className="arrow">→</span>
        </div>
      )}

      {/* EXPANDED */}
      {expanded && (
        <div className="hiw-card hiw-expanded" ref={cardRef}>
          <div className="hiw-overflow-title">
            <h1><i>HOW</i> IT WORKS</h1>
          </div>

          <div className="hiw-expanded-content">
            <p className="intro-paragraph">
            Every guest sees the 
            night differently. 
            We make sure those 
            perspectives don't 
            get lost!
            </p>

            <h6>We set the stage:</h6>

            <img className="hiw-overflow-svg" src="/assets/camera-icon16.svg" alt="Camera Icon" />

            <ul className="hiw-bullets">
              <li>
                <span className="emoji">🔥</span>
                <i>Instant Print Cameras</i><br />
                <span className="li-desc">
                  <p1>Guests can snap, print, and share their images instantly. No apps,
                  no filters—just tangible, real-time memories in their hands.</p1>
                </span>
              </li>
              <li>
                <span className="emoji">🤩</span>
                <i>Vintage Video &amp; Photo Cameras</i><br />
                <span className="li-desc">
                <p1>The Full Experience: Our "Cam-Tenders" distribute and rotate a variety of retro camcorders, 
                digital point-and-shoots, and film cameras for a full spectrum of event coverage.</p1>
                </span>
              </li>
              <li>
                <span className="emoji">📷</span>
                <i>Cam-Tenders as Facilitators</i><br />
                <span className="li-desc">
                <p1>We aren't just dropping off gear; we're igniting the energy, breaking the ice, and keeping the 
                cameras in circulation.</p1>
                </span>
              </li>
            </ul>

            <div className="hiw-experience">
              <p>From the moment the cameras hit their hands, guests are documenting their own experience 
                  from inside the action, not watching from the sidelines.
                  <br/><br/>
                  After the event, we digitize everything, giving hosts and guests a full archive of the night. 
                  The physical prints? Those stay with the people who made them.</p>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HowItWorksButton;
