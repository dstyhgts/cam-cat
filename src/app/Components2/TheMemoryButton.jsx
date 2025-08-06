import React, { useState, useEffect, useRef } from 'react';
import './PrintPackButton.css';
import './TheMemoryButton.css';

const TheMemoryButton = () => {
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
      className={`memory-container ${expanded ? 'expanded' : ''}`}
      ref={cardRef}
      onClick={handleToggle}
      aria-expanded={expanded}
    >
      {/* Yellow background for hover tilt (hidden in expanded) */}
      {!expanded && <div className="memory-background" />}

      {/* DEFAULT (256×256) */}
      {!expanded && (
        <div className="memory-card memory-default">
          <h6>WHAT <i>YOU</i> GET...</h6>
          <p className="memory-subtext">
          You get:<br/><br /><br />
          <i> The Complete Story.</i> 
          </p>
          <span className="arrow">→</span>
        </div>
      )}

      {/* EXPANDED */}
      {expanded && (
        <div className="memory-card memory-expanded">
          <div className="memory-overflow-title">
            <h1><i>WHAT</i> YOU GET</h1>
          </div>

          <div className="memory-expanded-content">
            <p className="intro-paragraph">
            What we deliver isn't just content—it's a time capsule. A fragmented, beautiful, guest-driven 
            archive of the night, built in real time and delivered while the energy is still fresh.
            </p>

            <h6>YOU CAN EXPECT:</h6>

            <img className="memory-overflow-svg" src="/assets/camera-icon15.svg" alt="Camera Icon" />

            <ul className="memory-bullets">
              <li>
                <span className="emoji">✔️</span>
                <i>A (Literally) Infinite Number of Moments </i><br />
                <span className="li-desc">
                  <p1>With dozens of cameras in play, every pocket of the event gets documented, 
                  from the dance floor chaos to the whispered side conversations. Details matter, and now you can capture them with no limits.
                  We never cap the number of photos or videos, so you can capture every moment, every angle, every interaction.</p1>
                </span>
              </li>
              {/* <li>
                <span className="emoji">🖨️</span>
                <i>Physical Prints in Hand, Digital Archive Forever </i><br />
                <span className="li-desc">
                <p1>Instant print cameras give guests real, tangible memories to take home, while 
                every single shot—printed or not—is preserved digitally for the host and guests.</p1>
                </span>
              </li> */}
              <li>
                <span className="emoji">📤</span>
                <i>Rapid Delivery (Nostalgia Hits Quick) </i><br />
                <span className="li-desc">
                <p1>Every photo and video, gets sorted, refined, and sent out within 12-36 hours—not just to 
                the host, but directly to the guests who lived it. </p1>
                </span>
              </li>
              <li>
                <span className="emoji">🎞️</span>
                <i>A Fully Curated Recap </i><br />
                <span className="li-desc">
                <p1> Each package comes with a cinematic nostalgia edit, because sometimes, the 
                    best way to relive a night is to see it like it's already a throwback.
                    </p1>
                </span>
              </li>
            </ul>

            <div className="memory-experience">
              <p> With a mix of unedited, behind-the-scenes footage and professionally curated content, delivered in full, your
                  event becomes a story. 
                  Every photo and video is reviewed, cleaned up, and sent off—so you don't just get a data dump, 
                  you get the fully curated timeline without any missing pieces. When you invite Camera Catering to your event, you don't just get a highlight reel of the night, you get <i><u>everything.</u></i> Every perspective, every 
                  interaction, every forgotten moment—captured, relived, and saved. You get <i><u>the complete story.</u></i>
                  </p>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheMemoryButton;
