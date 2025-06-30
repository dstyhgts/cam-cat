import React, { useState } from 'react';
import './AboutCard.css';

const AboutCard = () => {
  // Remove the old images array and use a count for 5 images
  const imageCount = 5;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeftClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRightClick = () => {
    if (currentIndex < imageCount - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const leftArrowOpacity = currentIndex === 0 ? 0.5 : 1;
  const rightArrowOpacity = currentIndex === imageCount - 1 ? 0.5 : 1;

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
          {Array.from({ length: imageCount }).map((_, i) => (
            <div className="about-card-slide" key={i}>
              <img src={`/assets/about${i + 1}.JPG`} alt={`Slide ${i + 1}`} />
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
          Camera Catering is a project built from a passion for digital cameras and the people who use them.
        </p>
        <p>
          I've worked in the film industry for over 10 years, and I've seen firsthand how much images mean to people. 
          I've also spent half that time working private events, weddings, parties, and all the other moments that make life special.
          Camera Catering is a way to bring those two worlds together and to spread the love for cameras, their history, and the people who use them.
          <br /> <br />
          --------------------------------------------------- Duncan Bielman, Founder
        </p>
      </div>
    </div>
  );
};

export default AboutCard;
