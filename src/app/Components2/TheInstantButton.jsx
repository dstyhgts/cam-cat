import React, { useState, useEffect, useRef } from 'react';
import './PrintPackButton.css';
import './TheInstantButton.css';

const TheInstantButton = () => {
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
      className={`instant-container ${expanded ? 'expanded' : ''}`}
      ref={cardRef}
      onClick={handleToggle}
      aria-expanded={expanded}
    >
      {/* Yellow background for hover tilt (hidden in expanded) */}
      {!expanded && <div className="instant-background" />}

      {/* DEFAULT (256×256) */}
      {!expanded && (
        <div className="instant-card instant-default">
          <h6><i>INSTANT</i> TIME</h6>
          <p className="instant-subtext">
          Our instant print cameras don't just capture the moment—they make sure it's in your hands before it's even over.
          </p>
          <span className="arrow">→</span>
        </div>
      )}

      {/* EXPANDED */}
      {expanded && (
        <div className="instant-card instant-expanded">
          <div className="instant-overflow-title">
            <h1>THE <i>"INSTANT"</i> PRINT</h1>
          </div>

          <div className="instant-expanded-content">


            <h6>OUR HANDHELD PHOTOBOOTH:</h6>

            <div className="svg-container">
              <span className="placeholder-svg">[SVG]</span>
            </div>

            <ul className="instant-bullets">
              <li>
                <span className="emoji">🎥</span>
                <i> Shoot It. Print It. Pass It. </i><br />
                <span className="li-desc">
                  <p1>These aren't just cameras --- they're pocket-sized memory machines. Snap a photo, 
                    watch it print instantly in black & white, or switch to retro video mode and 
                    capture the night in motion. You can always print later.</p1>
                </span>
              </li>
              <li>
                <span className="emoji">🤩</span>
                <i>Your Mobile Photo-Booth!</i><br />
                <span className="li-desc">
                <p1>Each camera doesn't spew out a stack of loose Polaroids, but a continuous film strip of the night. 
                    Guests can rip off their favorite moments, leave prints behind like calling cards, or roll them 
                    up like tiny event scrolls.</p1>
                </span>
              </li>
              <li>
                <span className="emoji">📂</span>
                <i>No Lost Memories --- Ever.</i><br />
                <span className="li-desc">
                <p1>Every shot prints instantly, but also saves digitally. Meaning the ones that get passed around, 
                pocketed, or stuck to a beer bottle? They're all still there.</p1>
                </span>
              </li>
            </ul>

            <div className="instant-experience">
              <p>Tactile, Hands-On Memory-Making Machines – Guests hand off their moments, trade their best 
                      shots, and walk away with something real. It's a party favor that doesn't just sit in a drawer ---
                      it lives in wallets, in scrapbooks, on fridges, walls  --- in the hands of your guests.

                  <br/><br/>
                      It's instant. It's interactive. And it turns the entire night into something guests don't just look 
                      back on—but something to carry around with them.</p>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheInstantButton;
