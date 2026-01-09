import React, { useEffect, useState, useRef, useMemo } from 'react';
import HowItWorksButton from './HowItWorksButton';
import './MainGrid.css';
import TheInstantButton from './TheInstantButton';
import TheCameraBarButton from './TheCameraBarButton';
import TheMemoryButton from './TheMemoryButton';
import WhyNowButton from './WhyNowButton';
import PrintPackButton2 from './PrintPackButton2';
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
  const [clickedCardIndex, setClickedCardIndex] = useState(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cardWidth = 300;
  const cardHeight = 337;
  const leftPad = 80;
  const centerCardCount = 10;
  const sideCardCount = 6;
  const totalImages = 58; // img1.JPG to img58.JPG

  // Memoize card generation so it only happens once on mount
  const { allCards, totalHeight } = useMemo(() => {
    // Generate the pool of image paths for all images 1-58
    const allImages = [];
    for (let i = 1; i <= totalImages; i++) {
      allImages.push(`/assets/img${i}.JPG`);
    }

    // Shuffle the pool using Fisher-Yates algorithm for true randomness
    // This ensures all images from img1 to img58 have equal probability of being selected
    function shuffle(array) {
      const shuffled = [...array]; // Create a copy to avoid mutating the original
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
    const shuffledImages = shuffle(allImages);
    
    // Randomly pick images for center stack and side cards from the shuffled pool
    const centerImages = shuffledImages.slice(0, centerCardCount);
    const sideImages = shuffledImages.slice(centerCardCount, centerCardCount + sideCardCount);

    // Build the center cards array with rotation, offset, and top position
    let topSum = 0;
    const centerCards = centerImages.map((src, i) => {
      const rot = Math.random() * 48 - 24; // -24 to 24 deg
      const hOffset = i === 0 ? -60 : Math.random() * 120 - 60; // first image always leftmost, reduced gap by 50%
      const vOffset = 140 + Math.random() * 100; // 140 to 240 px
      const top = topSum;
      topSum += vOffset;
      return { src, rot, hOffset, top, side: 'center' };
    });

    // Calculate total height for side card positioning
    const calculatedTotalHeight = topSum + cardHeight;

    // Build the side cards array - randomly positioned on left and right
    const sideCards = sideImages.map((src, i) => {
      const rot = Math.random() * 48 - 24; // -24 to 24 deg
      // Randomly assign to left or right side
      const side = Math.random() < 0.5 ? 'left' : 'right';
      // Position horizontally: left side goes negative, right side goes positive (reduced gap by 50%)
      const hOffset = side === 'left' 
        ? -(cardWidth + 25 + Math.random() * 50) // -325 to -375px (left of stack)
        : (150 + Math.random() * 50); // 150 to 200px (right of stack)
      // Random vertical position along the stack height
      const top = Math.random() * (calculatedTotalHeight - cardHeight);
      return { src, rot, hOffset, top, side };
    });

    // Combine all cards
    const combinedCards = [...centerCards, ...sideCards];
    
    return { allCards: combinedCards, totalHeight: calculatedTotalHeight };
  }, []); // Empty dependency array means this only runs once on mount

  const handleCardClick = (index) => {
    // On mobile, click toggles the card
    // On desktop, click sets the card to front (replaces previous clicked card)
    if (isMobile) {
      setClickedCardIndex(index === clickedCardIndex ? null : index);
    } else {
      // Desktop: set clicked card (or deselect if clicking the same card)
      setClickedCardIndex(index === clickedCardIndex ? null : index);
    }
  };

  const handleCardHover = (index) => {
    // On desktop, hover brings card to front (but clicked card will still be on top)
    if (!isMobile) {
      setHoveredCardIndex(index);
    }
  };

  const handleCardLeave = () => {
    // On desktop, remove hover state
    if (!isMobile) {
      setHoveredCardIndex(null);
    }
  };

  return (
    <div ref={stackRef} className="stacked-photo-cards" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative', minHeight: `${totalHeight}px`, paddingLeft: `${leftPad}px` }}>
      {allCards.map((card, i) => {
        const isClicked = clickedCardIndex === i;
        const isHovered = hoveredCardIndex === i;
        const baseZIndex = card.side === 'center' ? 10 + i : 5 + i;
        // Priority: clicked > hovered > base
        const zIndex = isClicked ? 1000 : (isHovered ? 1000 : baseZIndex);
        
        // Smooth scale and translateZ for active effect
        // On desktop: clicked card or hovered card
        // On mobile: clicked card only
        const isActive = isClicked || (!isMobile && isHovered);
        const scale = isActive ? 1.05 : 1;
        const translateZ = isActive ? 20 : 0;
        const transform = `rotate(${card.rot}deg) scale(${scale}) translateZ(${translateZ}px)`;
        
        return (
          <div
            className="item stacked-photo-card"
            key={i}
            onClick={() => handleCardClick(i)}
            onMouseEnter={() => handleCardHover(i)}
            onMouseLeave={handleCardLeave}
            style={{
              position: 'absolute',
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,
              top: `${card.top}px`,
              left: `calc(${leftPad}px + ${card.hOffset}px)`,
              transform: transform,
              zIndex: zIndex,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'auto',
              userSelect: 'none',
              cursor: 'pointer',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), z-index 0s',
              willChange: 'transform',
            }}
          >
            <img src={card.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.3em', background: '#E3E1AA', pointerEvents: 'none', userSelect: 'none' }} />
          </div>
        );
      })}
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
      </div>
      <div className="small-buttons-row">
        <TheCameraBarButton />
        <TheInstantButton />
        <WhyNowButton />
        {/* <TheMemoryButton /> */}
      </div>
      <div className="small-buttons-row">{/* <WhyNowButton /> */}</div>
      <div id="print-package"></div>
      {/* Pack buttons, one per row */}
      <div className="pack-button-row"><NostalgiaPackButton /></div>
      <div className="pack-button-row"><PrintPackButton2 /></div>
      <div className="pack-button-row"><ClassicsPackButton /></div>
      {/* <div className="pack-button-row"><PremierePackButton /></div> */}
      <div className="pack-button-row"><DiamondPackButton /></div>
      {/* Testimonials: small and med two per row, big spans two columns */}
      <div className="testimonial-row">
        <div id="testimonials"><TestimonialSmall /></div>
        <TestimonialMed />
      </div>
      <div className="testimonial-big-row"><TestimonialBig /></div>
      <div className="testimonial-big-row"><TestimonialBig videoSrc="/assets/The Cousins_1.mp4" /></div>
      {/* IMAGINE-THIS SVG overlayed at the start of the photo cards stack */}
      {/* Photo stack in its own left column cell */}
      <div className="photo-stack-col" style={{ gridColumn: 1, position: 'relative' }}>
        <div className="imagine-this-overlay">
          <img src="/assets/IMAGINE-THIS.svg" alt="Imagine this" style={{ width: '120px', height: 'auto' }} />
        </div>
        <div style={{ position: 'relative' }}>
          <StackedPhotoCards />
          {/* GET CAMERAS button at the bottom of the photo stack, overlapping last photo */}
          <div className="order-btn-photo-stack" style={{ position: 'absolute', left: '50%', bottom: '-30px', transform: 'translateX(-50%) rotate(3deg)', zIndex: 10000, width: 'max-content', pointerEvents: 'auto' }}>
            <PopupButton
              id="yyPNXkPK"
              className="order-button"
              size={80}
              style={{ width: '100%', zIndex: 10000, position: 'relative', pointerEvents: 'auto', whiteSpace: 'nowrap', fontSize: '2.2rem' }}
            >
              GET CAMERAS!
            </PopupButton>
          </div>
        </div>
      </div>
      {/* About card, full width */}
      {/* <div className="about-row" id="about-card"><AboutCard /></div> */}
      <style jsx>{`
        .open-me-top-right {
          position: absolute;
          top: 0;
          right: -200px;
          z-index: 200;
          display: block;
        }

        .imagine-this-overlay {
          position: absolute;
          top: 0;
          right: -200px;
          z-index: 10000;
          display: block;
        }
          
        @media (max-width: 900px) {
          .open-me-top-right {
            left: 50%;
            right: 150px;
            transform: translateX(-50%);
            top: 0;
            z-index: 200;
          }
             .imagine-this-overlay {
            top: 0;
            right: -200px;
            left: auto;
            transform: none;
            z-index: 10000;
          }
          .order-btn-photo-stack {
            left: 50% !important;
            right: auto !important;
            transform: translateX(-50%) rotate(3deg) !important;
            width: max-content !important;
            margin: 2rem 0 0 0 !important;
            z-index: 10000 !important;
          }
          

        }

        
        // @media (max-width: 450px) {
        //   .open-me-top-right {
        //     left: auto;
        //     right: 10px;
        //     top: 80px;
        //     transform: none;
        //     z-index: 200;
        //   }
        //   .imagine-this-overlay {
        //     left: 50%;
        //     right: 200px;
        //     transform: translateX(120px);
        //     top: 0;
        //     z-index: 200;
        //   }
        // }
      `}</style>
    </div>
  );
};

export default MainGrid;
