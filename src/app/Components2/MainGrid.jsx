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
import ThreeCards from './ThreeCards';

const MainGrid = () => {
  return (
    <div className="main-grid">
      {/* Render multiple cards */}
      <HowItWorksButton />
      <TheInstantButton />
      <TheCameraBarButton />
      <TheMemoryButton />
      <WhyNowButton />
      <PrintPackButton />
      <ClassicsPackButton />
      <PremierePackButton />
      <DiamondPackButton />
      <TestimonialSmall />
      <TestimonialMed />
      <TestimonialBig />
      <AboutCard />
      {/* <ThreeCards /> */}
    </div>
  );
};

export default MainGrid;
