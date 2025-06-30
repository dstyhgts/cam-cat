import React, { useEffect, useState, useRef } from 'react';
import HowItWorksButton from './HowItWorksButton';
import './MainGrid.css';
import TheInstantButton from './TheInstantButton';
import TheCameraBarButton from './TheCameraBarButton';
import TheMemoryButton from './TheMemoryButton';
import WhyNowButton from './WhyNowButton';
import PrintPackButton from './PrintPackButton';
import NostalgiaPackButton from './NostalgiaPackButton';
import ClassicsPackButton from './ClassicsPackButton';
import PremierePackButton from './PremierePackButton';
import DiamondPackButton from './DiamondPackButton';
import TestimonialSmall from './TestimonialSmall';
import TestimonialMed from './TestimonialMed';
import TestimonialBig from './TestimonialBig';
import AboutCard from './AboutCard';
import ImagesContainer from './ImageContainer';

// Helper: seeded random for consistent variability
function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// New stacked photo cards component
const StackedPhotoCards = () => {
  const stackRef = useRef(null);

  const cardWidth = 300;
  const cardHeight = 337;
  const leftPad = 80;
  const cardCount = 10;

  // Generate image paths for the stacked photo cards
  const images = [];
  for (let i = 0; i < cardCount; i++) {
    images.push(`/assets/img${i + 38}.JPG`);
  }

  // Build the cards array with rotation, offset, and top position
  let topSum = 0;
  const cards = images.map((src, i) => {
    const rot = seededRandom(i + 1) * 48 - 24; // -24 to 24 deg
    const hOffset = seededRandom(i + 100) * 240 - 120; // -120 to 120 px
    const vOffset = 140 + seededRandom(i + 200) * 100; // 140 to 240 px
    const top = topSum;
    topSum += vOffset;
    return { src, rot, hOffset, top };
  });

  return (
    <div ref={stackRef} className="stacked-photo-cards" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative', minHeight: `${cardHeight + 200 * (cardCount - 1)}px`, paddingLeft: `${leftPad}px` }}>
      {cards.map((card, i) => (
        <div
          className="item stacked-photo-card"
          key={i}
          style={{
            position: 'absolute',
            width: `${cardWidth}px`,
            height: `${cardHeight}px`,
            top: `${card.top}px`,
            left: `calc(${leftPad}px + ${card.hOffset}px)`,
            transform: `rotate(${card.rot}deg)`,
            zIndex: 10 + i,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <img src={card.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.3em', background: '#E3E1AA', pointerEvents: 'none', userSelect: 'none' }} />
        </div>
      ))}
    </div>
  );
};

const MainGrid = () => {
  return (
    <div className="main-grid">
      {/* Small buttons, two per row */}
      <div className="small-buttons-row">
        <div id="how-it-works"><HowItWorksButton /></div>
        <TheMemoryButton />
        {/* <TheInstantButton /> */}
      </div>
      <div className="small-buttons-row">
        <TheCameraBarButton />
        <WhyNowButton />
        {/* <TheMemoryButton /> */}
      </div>
      <div className="small-buttons-row">{/* <WhyNowButton /> */}</div>
      <div id="print-package"></div>
      {/* Pack buttons, one per row */}
      <div className="pack-button-row"><NostalgiaPackButton /></div>
      <div className="pack-button-row"><ClassicsPackButton /></div>
      <div className="pack-button-row"><PremierePackButton /></div>
      <div className="pack-button-row"><DiamondPackButton /></div>
      {/* Testimonials: small and med two per row, big spans two columns */}
      <div className="testimonial-row">
        <div id="testimonials"><TestimonialSmall /></div>
        <TestimonialMed />
      </div>
      <div className="testimonial-big-row"><TestimonialBig /></div>
      {/* Photo stack in its own left column cell */}
      <div className="photo-stack-col" style={{ gridColumn: 1 }}><StackedPhotoCards /></div>
      {/* About card, full width */}
      <div className="about-row" id="about-card"><AboutCard /></div>
    </div>
  );
};

export default MainGrid;
