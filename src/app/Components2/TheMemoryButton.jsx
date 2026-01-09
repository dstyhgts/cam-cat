import React, { useState, useEffect, useRef } from 'react';
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
          <h3>MORE</h3><h2> SERVICES.</h2>
          <p className="memory-subtext">
          We are your one-stop-shop for all <i>camera-based</i> services <u>your event needs.</u><br/><br /><br />
          </p>
          <span className="arrow">→</span>
        </div>
      )}

      {/* EXPANDED */}
      {expanded && (
        <div className="memory-card memory-expanded">
          <div className="memory-overflow-title">
            <h1><i>OTHER</i> SERVICES.</h1>
          </div>

          <div className="memory-expanded-content">
            <p className="intro-paragraph">
            What we deliver isn't just content—it's a time capsule. By having our hands on everything photography and video related, we offer 100% personalized solutions for your event.
            </p>

            <h6>YOU CAN EXPECT:</h6>

            <img className="memory-overflow-svg" src="/assets/camera-icon15.svg" alt="Camera Icon" />

            <ul className="memory-bullets">
              <li>
                <span className="emoji">1)</span>
                <i>CAMERA CATERING: </i><br />
                <span className="li-desc">
                  <p1>With dozens of cameras in play, every pocket of the event gets documented, 
                  from the dance floor chaos to the whispered side conversations. Details matter, and now you can capture them with no limits.
                  </p1>
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
                <span className="emoji">2)</span>
                <i>BOOTH RENTALS: </i><br />
                <span className="li-desc">
                <p1>We offer a variety of booth rentals that are perfect for your event. We offer photo booths, video booths, and phone booths, that are each fully customizable and tailored to your event.</p1>
                </span>
              </li>
              <li>
                <span className="emoji">3)</span>
                <i>PHOTOGRAPHY & VIDEOGRAPHY: </i><br />
                <span className="li-desc">
                <p1> Of course, we offer photography and videography services to capture your event straight from the hands of industry professionals. They fit nicely alongside our camera catering services and booth rentals to fill in all the gaps.
                </p1>
                </span>
              </li>
              <li>
                <span className="emoji">4)</span>
                <i>CONTENT EDITING: </i><br />
                <span className="li-desc">
                <p1> No one wants to see a raw, unedited video or photo. We offer a variety of content editing services to help you get the best out of your event from instagram reels and carousels to longform films and videos. We believe in the power of storytelling and want to help you tell your story in the best way possible.
                </p1>
                </span>
              </li>
              <li>
                <span className="emoji">5)</span>
                <i>QR-CODES: </i><br />
                <span className="li-desc">
                <p1> The only thing we're missing is a way to get the photos and videos from your guests phones. We offer QR-Code solutions and digital storage so that guests can scan and upload their photos and videos to a central location for easy sharing. This makes sure that not a single moment is lost.
                </p1>
                </span>
              </li>
            </ul>

            <div className="memory-experience">
              {/* <p> With a mix of unedited, behind-the-scenes footage and professionally curated content, delivered in full, your
                  event becomes a story. 
                  Every photo and video is reviewed, cleaned up, and sent off—so you don't just get a data dump, 
                  you get the fully curated timeline without any missing pieces.  */}
                  <p>
                  <i>When you invite Camera Catering to your event, you don't just get a highlight reel of the night, you get <i><u>everything.</u></i> Every perspective, every 
                  interaction, every forgotten moment—captured, relived, and saved. You get <i><u>the complete story.</u></i>
                  </i>
                  </p>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheMemoryButton;
