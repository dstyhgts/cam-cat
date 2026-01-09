import React, { useState, useEffect, useRef } from 'react';
import styles from './PrintPackButton2.module.css';

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
            <span className={styles.nostalgiaTitleWord}><em>"PRINT"</em></span><br />
            <span className={styles.packageTitleWord}>PACKAGE</span>
          </h2>
          <p className={styles.subtext}>
          Handheld Photobooths ---- 10 Fujifilm Instax cameras, with a built-in printers.
          <p className={styles.priceRight}><i>Pricing Begins at $2,500</i></p>
            <span className="emoji"></span>
          </p>
        <div className={styles.ellipse}>
        <p>Pack</p>
      </div>
      <div className={styles.ellipse2}>
            <p1 className={styles.p1}>2</p1>
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
              <h3 className={styles.h3}><u>"PRINT"</u></h3>
              <p className={styles.p}><i>On demand printing; in demand prints.</i></p>
            </div>

            {/* Inner frame for text content */}
            <div className={styles.innerFrame}>
              {/* <h3 className="subcard-title">
                "RAPID" PRINT <span className="emoji">🚀</span>
              </h3> */}
              <p className={styles.p}>
              {/* Some moments are meant to be disposable—but that doesn't 
              mean they should be photographed on disposable cameras.  */}
              Some memories need to be touched, felt, and shared. Our Print Package is for the events that need a 
              little more than a digital camera, but a little less than a full-blown photobooth. <br /><br />
              </p>
              <h3 className={styles.h3}><u>INCLUDES:</u></h3>
              <ul>
                <li>1) 12x Fujifilm Instax: 
                    <p className={styles.p}> These world class instant print cameras are built for fast and consistent on-demand printing. They are small, simple, and made for magic. </p>
                </li>
                <li>2) Interactive Archive: 
                    <p className={styles.p}>Photos are printed on the spot, and guests can take them home as physical keepsakes. If interested in upgrading to a digital archive, we can do that too.</p>
                </li>
                <li>(Add-On) More Magic: 
                    <p className={styles.p}>The Instax cameras are built for immediate printing. However, we can add more magic to the night with a little more gear by providing higher end instant print cameras that can both print and store photo digitally. This is a great option for events that want to print a lot of photos, and also look at them later. </p>
                </li>
                {/* <li>(Add-On) Cam-Tender: 
                    <p>Our Cam-tender inspires capturing cadid moments, ephasizing a fun and
                      inclusive experience. They are all talented photograohers that can garuntee a lot of photos on their own.
                      Beyond that they look for the natural storytellers at your event, put the cameras in their hands and make sure 
                      everyone has a good time and that nobody gets left out. <br /><br /> </p>
                </li> */}
              </ul>
              <ul>
              <br></br>Most of your guests already know how these works. They are easy to use, and they are a lot of fun.
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
              <strong>Cameras (12):</strong>
                </h5>
                <p className={styles.p}>Instax Cameras:</p>
                <h6 className={styles.h6}>📷 📷 📷 📷 📷 <br />📷 📷 📷 📷 📷 <br />📷 📷<br /></h6>
                <br />
                {/* <p>VHS Camcorder:</p>
                <h6>📹 📹 📹<br /><br /> </h6> */}
              
            
                <strong>WHAT YOU GET:</strong><br /><i>
                   1) 12x Fujifilm Instax Cameras <br />
                   2) 20x Packs of Photo Paper for Printing (Print up to 20 photos each). <br />
                   3) 3 Back-up Instax Cameras just in case. <br />
                   </i>
              <p className={styles.p}><br />
              🔹 <em>Add on <u>Extra Paper</u> for $30 a pack.</em><br />
              🔹 <em>Add on <u>Extra 5x Instax Cameras</u> for $350/hr.</em> <br />
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
