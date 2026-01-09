import React, { useState, useEffect, useRef } from 'react';
import './TheCameraBarButton.css';

const TheCameraBarButton = () => {
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
      className={`camera-bar-container ${expanded ? 'expanded' : ''}`}
      ref={cardRef}
      onClick={handleToggle}
      aria-expanded={expanded}
    >
      {/* Yellow background for hover tilt (hidden in expanded) */}
      {!expanded && <div className="camera-bar-background" />}

      {/* DEFAULT (256×256) */}
      {!expanded && (
        <div className="camera-bar-card camera-bar-default">
            <h6>WTF is a CAMERA</h6> <h3> BAR?</h3> 
          <p className="camera-bar-subtext">
          Somewhere in the room, there's a bar. But not the kind you're thinking of...
          </p>
          <span className="arrow">→</span>
        </div>
      )}

      {/* EXPANDED */}
      {expanded && (
        <div className="camera-bar-card camera-bar-expanded">
          <div className="camera-bar-overflow-title">
            <h1><u>THE <i>CAMERA</i> BAR...?</u></h1>
            <p>A Hands-On Experience for All.</p>
          </div>

          <div className="camera-bar-expanded-content">
            <p className="intro-paragraph">
            The Camera Bar is a curiosity amidst the chaos. It is a beacon for creativity and adventure and it's the 
            thing that can elevate your event to the next level.
            <br />
            
            </p>

            <h6>THE FULL BAR:</h6>

            <img className="camera-bar-overflow-svg" src="/assets/camera-icon10.svg" alt="Camera Icon" />

            <ul className="camera-bar-bullets">
              <li>
                <span className="emoji">📸</span>
                <i>Stocked with Nostalgia</i><br />
                <span className="li-desc">
                  <p1> The Camera Bar is stocked with cameras from all eras: from vintage film cameras, rare point-and-shoots, and VHS Camcorders, the bar is a museum of technology and nostalgia.</p1>
                </span>
              </li>
              <li>
                <span className="emoji">🕺</span>
                <i>The Cam-Tenders</i><br />
                <span className="li-desc">
                <p1>They don't serve drinks, they serve cameras. They're your guests' co-conspirators, directors, and professors. They help guests
                  find the cameras that are best suited for them, teach them how to use them, and help them tell their story. 
                  They are the ones who make sure the best stories get told from the inside action, by the guests themselves.
                By igniting creativity through photography and video, they create conversation for art to flourish and give guests a new way to express themselves at your event.
                </p1>
                </span>
              </li>
              {/* <li>
                <span className="emoji">🎥</span>
                <i>Retro Camcorders in the Wild</i><br />
                <span className="li-desc">
                <p1>Film through the grain, the streaks, the VHS fuzz. The kind of footage that wasn't just meant for 
                Instagram—but for nostalgia and memories in a distant future.</p1>
                </span>
              </li> */}
              <li>
                <span className="emoji">🚪</span>
                <i>Props, Costumes, and Accessories</i><br />
                <span className="li-desc">
                <p1>The bar is stocked with props, costumes, and accessories that help guests make their story their own. These items are designed 
                  to be worn, used, and enjoyed in every nook and cranny of the event, not just for one photo-op. They're invitations to be children again, to play
                  characters and express oneself without limits. They aren't just big glasses or plastic hats, they are vehicles for nostalgia and creativity.</p1>
                </span>
              </li>
            </ul>

            <div className="camera-bar-experience">
              <p><i>The Camera Bar</i> isn't just a feature... It's the gateway to a whole new expirirence that your guests have been waiting for. 
                 </p>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheCameraBarButton;
