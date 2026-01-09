import React, { useState, useEffect, useRef } from 'react';
import styles from './NostalgiaPackButton.module.css';

const NostalgiaPackButton = () => {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);

  // Toggle expanded on card click
  const handleToggle = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  // Close if user clicks outside the main container
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
      className={`${styles.container} ${expanded ? styles.expanded : ''}`}
      ref={cardRef}
      onClick={handleToggle}
      aria-expanded={expanded}
    >
      {/* Background for hover tilt (hidden when expanded) */}
      {!expanded && <div className={styles.background} />}

      {/* 3 icons animate in on hover (only if not expanded) */}
      {!expanded && (
        <>
          <img className={`${styles.star} ${styles.star1}`} src="/assets/camera-icon10.svg" alt="Camera Icon 11" style={{ width: '96px', height: '96px' }} />
          <img className={`${styles.star} ${styles.star2}`} src="/assets/camera-icon12.svg" alt="Camera Icon 12" style={{ width: '96px', height: '96px' }} />
          <img className={`${styles.star} ${styles.star3}`} src="/assets/camera-icon13.svg" alt="Camera Icon 13" style={{ width: '96px', height: '96px' }} />
        </>
      )}

      {/* Two arrows at bottom (behind the card) */}
      {!expanded && (
        <div className={styles.bottomArrows}>
          <span className={styles.arrowDown}>↓</span>
          <span className={styles.arrowDownRight}>↓</span>
        </div>
      )}

      {/* ========== DEFAULT / HOVER (512×256) ========== */}
      {!expanded && (
        <div className={styles.card}>
            <p className={styles.topline}>Learn about our...</p>
          <h2 className={styles.title}>
            <span className={styles.nostalgiaTitleWord}><em>DIGITAL</em></span><br />
            <span className={styles.packageTitleWord}>PACKAGE</span>
          </h2>
          <p className={styles.subtext}>
          Our signature product ---- 15 <i>"indisposible"</i> cameras catered to the moment.
          <p className={styles.priceRight}><i>Pricing Begins at $1,700</i></p>
            <span className="emoji"></span>
          </p>
        <div className={styles.ellipse}>
        <p>Pack</p>
      </div>
      <div className={styles.ellipse2}>
            <p1 className={styles.p1}>1</p1>
          </div>
      </div>
      )}

      {/* ========== EXPANDED STATE ========== */}
      {expanded && (
        <div className={styles.expandedLayout}>
          {/* LEFT CARD (with overhanging rectangle) */}
          <div className={`${styles.expandedCard} ${styles.leftCard}`}>
            {/* Overhanging title box */}
            <div className={styles.overflowTitle}>
              <h3 className={styles.h3}><u>DIGICAMS!</u></h3>
              <p className={styles.p}><i>"Indisposible"</i> Cameras = Infinite Possibilities.</p>
            </div>

            {/* Inner frame for text content */}
            <div className={styles.innerFrame}>
              {/* <h3 className="subcard-title">
                "RAPID" PRINT <span className="emoji">🚀</span>
              </h3> */}
              <p className={styles.p}>
              {/* Some moments are meant to be disposable—but that doesn't 
              mean they should be photographed on disposable cameras.  */}
              Our signature package brings only what is neccessary ----
              reusable, vintage, and tactile <u>digital</u> cameras, with an emphasis on the fun of the moment and the joys of photography. 
              <br/><br/>This package includes only 15 "indisposible" cameras 
              passed off guest to guest. It's for the events that need cameras in the action, 
              not on the sidelines, in a more traditional way- on tables, on wrists, and in the hands of those who find them. <br /><br />
              </p>
              <h3 className={styles.h3}><u>INCLUDES:</u></h3>
              <ul>
                <li>1) 15x Digital Cameras: 
                    <p className={styles.p}>Small, simple, and made to be passed      
                      around. Guests find them, pick the up, 
                      and use them to capture what they want like any disposable camera would allow - only no limits here... </p>
                </li>
                <li>2) Interactive Memories: 
                    <p className={styles.p}>We make sure that every guest has a camera in their hands, 
                      and that they are able to capture the moment they want to capture.</p>
                </li>
                <li>3) Delivery in 36 hours: 
                    <p className={styles.p}>A fully preserved archive of the night sent to you within 36 hours of the events conclusion. 
                    If agreed upon, we can send the files to the guests who captured the night as well; <i>making the night a little more interactive and ready to post.</i></p>
                </li>
                {/* <li>(Add-On) Cam-Tender: 
                    <p>Our Cam-tender inspires capturing cadid moments, ephasizing a fun and
                      inclusive experience. They are all talented photograohers that can garuntee a lot of photos on their own.
                      Beyond that they look for the natural storytellers at your event, put the cameras in their hands and make sure 
                      everyone has a good time and that nobody gets left out. <br /><br /> </p>
                </li> */}
              </ul>
              <ul>
              <br></br>No production, no planning, no pressure. 
              Just real moments, instantly preserved.'
              </ul>
              <p1 className={styles.p1}>
              <br />
              (Pricing is based on a standard 4-hour event. Client will be billed $250/hr thereafter.)
              </p1>
            </div>
          </div>

          {/* RIGHT CARD (simpler) */}
          <div className={`${styles.expandedCard} ${styles.rightCard}`}>
            {/* Inner frame for text content */}
            <div className={styles.innerFrame}>
            {/* <h2><em>INCLUDES:</em></h2> */}
              <h5 className={styles.h5}>
              <strong>Cameras (15):</strong>
                </h5>
                <p className={styles.p}>Digicam:</p>
                <h6 className={styles.h6}>📸 📸 📸 📸 📸 <br />📸 📸 📸 📸 📸 <br />📸 📸<br /></h6>
                <br />
                <p className={styles.p}>VHS Camcorder:</p>
                <h6 className={styles.h6}>📹 📹 📹<br /><br /> </h6>
              
            
                <strong>WHAT YOU GET:</strong><br /><i>
                  1) 15 Digital Cameras <br />
                  2) 1 Set of Back-Up batteries for each camera; labeled and ready to shoot <br />
                  3) An inviting "tag"to help guests find and understand the intricacies of the cameras.<br />
                  4) Built-in insurance for each camera that covers any accidental damage (up to $150).</i>

              <p className={styles.p}><br />
              🔹 <em>Add on our <u>Cam-Tender</u> for $500 (+$150/hr) for when 
                  guests need a little more direction and <u>to make sure you get a ton of photos.</u> <br /><br />
                  </em>
                  {/* Want a little more?<br />
                  🔹 Add +5 more Cams ($600).<br />
                  🔹 Add +3 Video Camcorders ($800.)</em> */}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NostalgiaPackButton;
