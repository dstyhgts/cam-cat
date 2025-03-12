import React from 'react';
import './SimpleStage.css';

const SimpleStage = () => {
  return (
    <div className="simple-stage-container">
      <div className="stage-grid">
        {/* Left column: H1 + paragraph */}
        <div className="stage-text">
          <h1>No Ads, No Privacy Risks</h1>
          <p>
            Connect with your friends and family, without losing your privacy.
            <br />
            A simple, safe way to stay in touch.
          </p>
        </div>

        {/* Right column: the image */}
        <div className="stage-image">
          <img
            src="path/to/your-image.jpg"
            alt="Friends"
            className="responsive-img"
          />
        </div>
      </div>
    </div>
  );
};

export default SimpleStage;