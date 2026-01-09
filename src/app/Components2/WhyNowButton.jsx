import React, { useState, useEffect, useRef } from 'react';
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
            <p>Memories aren't content.</p>
          </div>

          <div className="why-now-expanded-content">
            <p className="intro-paragraph">
            For years we've seen the same story play out time and time again... A photographer walks around, a videographer follows the host, a photobooth is set up... alwasy the same.
            <br/><br/>
            <i>Camera Catering is not a solution to the problem, it is a brand new way to get guests actively involved at your event.</i>
            <br/><br/>
            The best moments are the ones people create when they don't think anyone is watching. 
            <br/><br/>
            Our services aim to keep people engaged and active at your event, not just passively watching from the sidelines. It hopes to get people off their phones and into the action.
            {/* Our services offer a new kind of tactile photo-print expirience through our use of thermal printers 
            built directly into your camera, as well as tacful throwback expirienced focused on vintage 
            cameras from the '80s, '90s, and early 2000s and camcorders that capture the grain, texture, 
            and imperfections that make nostalgia feel like our parents captured it.  After your event, you'll 
            receive:  */}
            
            </p>

            <h6>OUR <i>GUARANTEES:</i></h6>

            <img className="why-now-overflow-svg" src="/assets/camera-icon115.svg" alt="Camera Icon" />

            <ul className="why-now-bullets">
              <li>
                <p>
                ✔️ While we cannot guarantee the number of photos or videos, we can guarantee that the sky is the limit. You can expect anywhere from 100 to 10,000+ photos and/or minutes of video. 
                <br/>✔️ All images and footage reviewed, refined, and delivered. 
                <br/>✔️ A mix of edited and raw content—so you get both polish and authenticity. 
                <br/>✔️ Fast turnaround—sent not just to the host, but to the guests who captured the night, within 12-72 
                  hours of the event's conclusion.
                  <br/>✔️ Fun... and lots of it.
                  <br/>✔️ Countless add-ons to take your parties to even the next next next next level.
                  <br/>✔️ A robust website where all event atendees can view the unfoldings of the night prior. (Coming Soon) 
                  <br/>✔️ <u>A night <i>we won't </i>let you forget.</u>

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
