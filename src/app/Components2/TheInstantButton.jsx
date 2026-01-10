import React, { useState, useEffect, useRef } from 'react';
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
          <h6><i>INSTANT</i></h6><h3> CAMs</h3>
          <p className="instant-subtext">
         <br/>We offer <i>Fujifilm's Instax cameras</i> for a classic instant-print experience.
          </p>
          <span className="arrow">→</span>
        </div>
      )}

      {/* EXPANDED */}
      {expanded && (
        <div className="instant-card instant-expanded">
          <div className="instant-overflow-title">
            <h1>INVITE <i>"INSTAX"</i></h1>
          </div>

          <div className="instant-expanded-content">


            <h6>OUR HANDHELD PHOTOBOOTHS:</h6>

            <img className="instant-overflow-svg" src="/assets/camera-icon50.svg" alt="Camera Icon" />

            <ul className="instant-bullets">
              <li>
                <span className="emoji">1)</span>
                <i> Fujifilm's Instax Cameras </i><br />
                <span className="li-desc">
                  <p1>We offer a variety of <u>Fujifilm's Instax cameras</u> for a classic instant-print experience. They are small, simple to use, and made for magic.</p1>
                </span>
              </li>
              <li>
                <span className="emoji">2)</span>
                <i>Digital Archive</i><br />
                <span className="li-desc">
                <p1>You can upgrade your instant-print experience to Fujifilm's higher end Instax Cameras to make sure that every print is saved digitally. Meaning the ones that get passed around, 
                lost, or stuck to a beer bottles are all still there.</p1>
                </span>
              </li>
              <li>
                <span className="emoji">3)</span>
                <i>A Classic Experience</i><br />
                <span className="li-desc">
                <p1>This traditional photo experience is a great way to get your guests involved and create a sense of community at your event. It's a party favor that lives
                in wallets, scrapbooks, on fridges, walls, andin the hands of your guests.
                </p1>
                </span>
              </li>
            </ul>

            <div className="instant-experience">
              <p><i>
                      It's instant, interactive, and turns the entire night into something guests don't just look 
                      back on—but something to carry around with them into the future.</i></p>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheInstantButton;
