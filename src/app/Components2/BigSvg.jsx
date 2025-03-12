

import React from 'react';
import MainGrid from './MainGrid';
import './BigSvg.css';
// If you have the SVG as a file, you can import it like this.
// Or if you have an inline SVG, you can paste it directly in the JSX below.

const BigSvg = () => {
  return (
    <div className="layout-container">
      {/* Left: Existing grid component */}
      <MainGrid />

      {/* Right: The large SVG */}
      <div className="svg-wrapper">
        <img src= './assets/camera-icon117.svg' alt="Large decorative SVG" className="large-svg" />
      </div>
    </div>
  );
};

export default BigSvg;
