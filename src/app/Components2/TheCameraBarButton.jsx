import React, { useState, useEffect, useRef } from 'react';
import './PrintPackButton.css';
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
            <h6>THE CAMERA*</h6> <h3> BAR</h3> 
          <p className="camera-bar-subtext">
          <br />
          Somewhere in the room, there's a bar. But not the kind you're thinking of...
          </p>
          <span className="arrow">→</span>
        </div>
      )}

      {/* EXPANDED */}
      {expanded && (
        <div className="camera-bar-card camera-bar-expanded">
          <div className="camera-bar-overflow-title">
            <h1><u>THE <i>CAMERA</i> BAR</u></h1>
            <p>Get a handle on your event.</p>
          </div>

          <div className="camera-bar-expanded-content">
            <p className="intro-paragraph">
            Somewhere in the room, there's a bar. But not the kind you're thinking of. It's tucked in 
            the corner, or maybe dead center—a curiosity waiting to be discovered. Lined with 
            cameras that don't belong in this decade, props that invite mischief, and an energy 
            that pulls in the ones who get it... The Camera Catering Bar is a place where everyone can be a part of the story.
            </p>

            <h6>Our Full Bar:</h6>

            <img className="camera-bar-overflow-svg" src="/assets/camera-icon10.svg" alt="Camera Icon" />

            <ul className="camera-bar-bullets">
              <li>
                <span className="emoji">📸</span>
                <i>A Bar Stocked with Nostalgia</i><br />
                <span className="li-desc">
                  <p1> Vintage photo-cameras from the early to mid2000s sit waiting to be claimed. Guests 
                  step up, pick their poison, and become part of the night's unfolding story. This si where
                  props, costumes, and accessories come in- not just for a photo-op, but to be worn, used, and enjoyed in every nook and cranny of the event.</p1>
                </span>
              </li>
              <li>
                <span className="emoji">🕺</span>
                <i>The Cam-Tenders: Part Hosts, Part Instigators</i><br />
                <span className="li-desc">
                <p1>These aren't photographers lurking on the edges, they're your co-conspirators. Handing off 
                cameras, igniting moments, and making sure the best stories get told from the inside. They teach guests with
                hands on attention how to use the cameras, and how to tell their story. They inspire guests to be creative, to be themselves, and to be characters alike.</p1>
                </span>
              </li>
              <li>
                <span className="emoji">🎥</span>
                <i>Retro Camcorders in the Wild</i><br />
                <span className="li-desc">
                <p1>Film through the grain, the streaks, the VHS fuzz. The kind of footage that wasn't just meant for 
                Instagram—but for nostalgia and memories in a distant future.</p1>
                </span>
              </li>
              <li>
                <span className="emoji">🚪</span>
                <i>A Portal to Another Timeline</i><br />
                <span className="li-desc">
                <p1>This isn't just a bar. It's an invitation to see the night differently. To hold something weighty
                in your hands, hear the click of a shutter, and realize—you are the storyteller now.</p1>
                </span>
              </li>
            </ul>

            <div className="camera-bar-experience">
              <p><i>The Camera Bar</i> isn't just a feature... It's the gateway to a whole new expirirence your event has been waiting for.                            
              Step up. Pick up. Press record.
                 </p>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheCameraBarButton;
