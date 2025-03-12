import React, { useState, useEffect, useRef } from 'react';
import './PrintPackButton.css';
import './WhyNowButton.css';

const WhyNowButton = () => {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);

  // Toggle expanded on card click
  const handleToggle = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
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
      className={`why-now-container ${expanded ? 'expanded' : ''}`}
      ref={cardRef}
      onClick={handleToggle}
      aria-expanded={expanded}
    >
      {/* Yellow background for hover tilt (hidden in expanded) */}
      {!expanded && <div className="why-now-background" />}

      {/* DEFAULT (256×256) */}
      {!expanded && (
        <div className="why-now-card why-now-default">
          <h3>WHY NOW?</h3>
          <p className="why-now-subtext">
          Things are changing...
          <br/><br/><i> Everybody's a photographer now.</i>
          </p>
          <span className="arrow">→</span>
        </div>
      )}

      {/* EXPANDED */}
      {expanded && (
        <div className="why-now-card why-now-expanded">
          <div className="why-now-overflow-title">
            <h1>WHY<i>THIS</i> NOW?</h1>
          </div>

          <div className="why-now-expanded-content">
            <p className="intro-paragraph">
            We’ve spent years in the event industry. We know how it goes... A photographer walks around, 
            counts to three, snaps to meet a quota, a couple cameras—and yet somehow, you still leave 
            the event feeling like something was missing. If you haven’t felt that before, you never will again.
            <br/><br/>
            Because the best moments? They’re the ones people create when they don’t think anyone is 
            watching. 
            <br/><br/>
            With Camera Catering, the cameras are in their hands. 
            <br/><br/>
            That means your event doesn’t just get documented—it gets remembered. 
            <br/><br/>
            Our services offer a new kind of instant photo-print expirience through our use of thermal printers 
            built directly into your camera, as well as tacful throwback expirienced focused on vintage 
            cameras from the ‘80s, ‘90s, and early 2000s and camcorders that capture the grain, texture, 
            and imperfections that make nostalgia feel like our parents captured it.  After your event, you’ll 
            receive: 
            
            </p>

            <h6>OUR <i>GUARANTEES:</i></h6>

            <div className="svg-container">
              <span className="placeholder-svg">[SVG]</span>
            </div>

            <ul className="why-now-bullets">
              <li>
                <p>
                ✔️ All images and footage reviewed, refined, and delivered. 
                <br/>✔️ A mix of edited and raw content—so you get both polish and authenticity. 
                <br/>✔️ Fast turnaround—sent not just to the host, but to the guests who captured the night, within 12 
                  hours of the event’s conclusion.
                  <br/>✔️ Countless add-ons to take your parties to even the next next next level.
                  <br/>✔️ A robust website where all event atendees can view the unfoldings of the night prior. 
                  <br/>✔️ A night we won’t let you forget.

                </p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhyNowButton;
