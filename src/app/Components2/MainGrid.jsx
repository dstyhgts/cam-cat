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
import { PopupButton } from '@typeform/embed-react';

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
  const totalImages = 47; // img1.JPG to img47.JPG

  // Generate the full pool of image paths
  const allImages = [];
  for (let i = 1; i <= totalImages; i++) {
    allImages.push(`/assets/img${i}.JPG`);
  }

  // Shuffle the pool and pick the first 10 unique images
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const images = shuffle([...allImages]).slice(0, cardCount);

  // Build the cards array with rotation, offset, and top position
  let topSum = 0;
  const cards = images.map((src, i) => {
    const rot = Math.random() * 48 - 24; // -24 to 24 deg
    const hOffset = i === 0 ? -120 : Math.random() * 240 - 120; // first image always leftmost
    const vOffset = 140 + Math.random() * 100; // 140 to 240 px
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
          <img src={card.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.3em', background: '#E3E1AA', pointerEvents: 'none', userSelect: 'none' }} loading="lazy" />
        </div>
      ))}
    </div>
  );
};

const MainGrid = () => {
  return (
    <div className="main-grid" style={{ position: 'relative' }}>
      {/* OPEN-ME SVG, top right corner, desktop only */}
      <div className="open-me-top-right">
        <img src="/assets/OPEN-ME2.svg" alt="Open me" style={{ width: '120px', height: 'auto' }} />
      </div>
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
      {/* IMAGINE-THIS SVG overlayed at the start of the photo cards stack */}
      {/* Photo stack in its own left column cell */}
      <div className="photo-stack-col" style={{ gridColumn: 1, position: 'relative' }}>
        <div className="imagine-this-overlay">
          <img src="/assets/IMAGINE-THIS.svg" alt="Imagine this" style={{ width: '180px', height: 'auto' }} />
        </div>
        <div style={{ position: 'relative' }}>
          <StackedPhotoCards />
          {/* GET CAMERAS button at the bottom of the photo stack, overlapping last photo */}
          <div className="order-btn-photo-stack" style={{ position: 'absolute', left: '50%', bottom: '-30px', transform: 'translateX(-50%) rotate(3deg)', zIndex: 100, width: 'max-content', pointerEvents: 'auto' }}>
            <PopupButton
              id="yyPNXkPK"
              className="order-button"
              size={80}
              style={{ width: '100%', zIndex: 100, position: 'relative', pointerEvents: 'auto', whiteSpace: 'nowrap', fontSize: '2.2rem' }}
            >
              GET CAMERAS!
            </PopupButton>
          </div>
        </div>
      </div>
      {/* About card, full width */}
      <div className="about-row" id="about-card"><AboutCard /></div>
      <style jsx>{`
        .open-me-top-right {
          position: absolute;
          top: 0;
          right: -200px;
          z-index: 1;
          display: block;
        }
        @media (max-width: 900px) {
          .open-me-top-right {
            left: 50%;
            right: 260px;
            transform: translateX(-50%);
            top: 0;
            z-index: 1;
          }
          .order-btn-photo-stack {
            left: 50% !important;
            right: auto !important;
            transform: translateX(-50%) rotate(3deg) !important;
            width: max-content !important;
            margin: 2rem 0 0 0 !important;
          }
          

        }
        .imagine-this-overlay {
          position: absolute;
          right: auto;
          left: auto;
          padding-left: 300px;
          top: 0;
          z-index: 20;
          pointer-events: none;
        }

        
        @media (max-width: 420px) {
          .open-me-top-right {
            left: 50%;
            right: -36px;
            transform: translateX(-50%);
            top: 0;
            z-index: 1;
          }
          .imagine-this-overlay {
            right: 0;
            left: auto;
            padding-left: 0;
            width: 120px;
            top: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default MainGrid;
