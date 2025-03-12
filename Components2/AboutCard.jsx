import React, { useState } from 'react';
import './AboutCard.css';

const AboutCard = () => {
  // Example images (all the same). Replace with real paths later.
  const images = [
    'camera-icon102.png',
    'camera-icon102.png',
    'camera-icon102.png',
    'camera-icon102.png',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeftClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRightClick = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const leftArrowOpacity = currentIndex === 0 ? 0.5 : 1;
  const rightArrowOpacity = currentIndex === images.length - 1 ? 0.5 : 1;

  return (
    <div className="about-card-container">
      {/* Top: Image frame */}
      <div className="about-card-text">
        <h1>ABOUT</h1>
      <div className="about-card-image-frame">
        <div
          className="about-card-carousel-inner"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, idx) => (
            <div className="about-card-slide" key={idx}>
              <img src='./assets/camera-icon102.png' alt={`Slide ${idx}`} />
            </div>
          ))}
        </div>
      </div>
        </div>

      {/* Left Arrow (10px from left edge, vertically centered over 256px frame) */}
      <div
        className="about-card-arrow about-card-arrow-left"
        style={{ opacity: leftArrowOpacity }}
        onClick={handleLeftClick}
      >
        &larr;
      </div>

      {/* Right Arrow (10px from right edge, vertically centered) */}
      <div
        className="about-card-arrow about-card-arrow-right"
        style={{ opacity: rightArrowOpacity }}
        onClick={handleRightClick}
      >
        &rarr;
      </div>

      {/* Bottom: Text section (can grow in height) */}
      <div className="about-card-text">
        <h2>Camera Catering</h2>
        <p>
          Camera Catering helped me quite drinking and tie up the sutures that have been
          gagging the life from my soul since I was a kid. Even when I was scared of them.
        </p>
        <p>
          I’m not sure the Darkness personally, but she has blocked all communication
          since I was a teen. But, it’s fine—this isn’t about cameras anymore. I promise.
        </p>
      </div>
    </div>
  );
};

export default AboutCard;
