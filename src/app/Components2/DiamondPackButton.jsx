import React, { useState, useEffect, useRef } from 'react';
import './DiamondPackButton.css';

const DiamondPackButton = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [animKey, setAnimKey] = useState(0); 
  // Each click => triggers a new ephemeral .springIn-<animKey> class

  const containerRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();

    // Re-trigger the spring animation from scratch
    setAnimKey((prev) => prev + 1);

    // Mark the card as "clicked" => final state (rotate -3°, color => #fff)
    setIsClicked(true);

    // After 5s => revert to default
    setTimeout(() => {
      setIsClicked(false);
      // Optionally run a quick "springOut" by incrementing animKey again
      setAnimKey((prev) => prev + 1);
    }, 1200);
  };

  return (
    <div className="diamond-container" ref={containerRef} onClick={handleClick}>
      {/* Background Frame (stationary behind top card) */}
      <div className="diamond-bgframe">
        {/* line1 => bottom center => shown on hover */}
        <p className="diamond-line1">
          PLEASE CALL OR EMAIL TO SCHEDULE A CONSULTATION
        </p>
        {/* line2 => bottom-right => only shown if top card is clicked */}
        <p className="diamond-line2">
          SERIOUSLY, CALL US IF INTERESTED...
          <br />
          This was just to tease you.
        </p>
      </div>

      {/* Top 512×256 card => .clicked + ephemeral .springIn-<animKey> classes */}
      <div
        className={`diamond-card ${isClicked ? 'clicked' : ''} springIn-${animKey}`}
      >
        {/* small top line */}
        <p className="diamond-topline">Learn about our...</p>

        {/* Ellipse => "Pack ?" */}
        <div className="diamond-ellipse">
          <p>Pack</p>
        </div>
        <div className="diamond-ellipse2">
            <p1>?</p1>
          </div>

        {/* Big Title */}
        <h2 className="diamond-title">‘DIAMOND’ ROLL OUT</h2>

        {/* Subtext */}
        <p className="diamond-subtext">
          Um... You have to call for this one. It’s big and expensive and
          if you need this one... you already wanted knew that.
        </p>
      </div>
    </div>
  );
};

export default DiamondPackButton;
