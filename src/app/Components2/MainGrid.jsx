import React from 'react';
import HowItWorksButton from './HowItWorksButton';
import './MainGrid.css';
import TheInstantButton from './TheInstantButton';
import TheCameraBarButton from './TheCameraBarButton';
import TheMemoryButton from './TheMemoryButton';
import WhyNowButton from './WhyNowButton';
import PrintPackButton from './PrintPackButton';
import ClassicsPackButton from './ClassicsPackButton';
import PremierePackButton from './PremierePackButton';
import DiamondPackButton from './DiamondPackButton';
import TestimonialSmall from './TestimonialSmall';
import TestimonialMed from './TestimonialMed';
import TestimonialBig from './TestimonialBig';
import AboutCard from './AboutCard';
import ImagesContainer from './ImageContainer';

const MainGrid = () => {
  return (
    <div className="main-grid">
      {/* Small buttons, two per row */}
      <div className="small-buttons-row">
        <div id="how-it-works"><HowItWorksButton /></div>
        <TheInstantButton />
      </div>
      <div className="small-buttons-row">
        <TheCameraBarButton />
        <TheMemoryButton />
      </div>
      <div className="small-buttons-row">
        <WhyNowButton />
      </div>
      <div id="print-package"></div>
      {/* Pack buttons, one per row */}
      <div className="pack-button-row"><PrintPackButton /></div>
      <div className="pack-button-row"><ClassicsPackButton /></div>
      <div className="pack-button-row"><PremierePackButton /></div>
      <div className="pack-button-row"><DiamondPackButton /></div>
      {/* Testimonials: small and med two per row, big spans two columns */}
      <div className="testimonial-row">
        <div id="testimonials"><TestimonialSmall /></div>
        <TestimonialMed />
      </div>
      <div className="testimonial-big-row"><TestimonialBig /></div>
      {/* About card, full width */}
      <div className="about-row" id="about-card"><AboutCard /></div>
    </div>
  );
};

export default MainGrid;
