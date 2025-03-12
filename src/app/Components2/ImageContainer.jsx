// ImagesContainer.jsx
import React from 'react';
import ImageOverlay from './ImageOverlay';

const images = [
  {
    src: "./assets/camera-icon21.png",
    alt: 'Logo',
    style: { top: '-980px', left: '1200px', width: '100px' },
  },
  {
    src: "./assets/camera-icon23.png",
    alt: 'Icon',
    style: { top: '-380px', left: '670px', width: '100px' },
  },
  {
    src: "./assets/camera-icon50.png",
    alt: 'Icon',
    style: { top: '3280px', left: '220px', width: '100px' },
  },
  {
    src: "./assets/camera-icon11.png",
    alt: 'Icon',
    style: { top: '2740px', left: '-380px', width: '100px' },
  },
  {
    src: "./assets/camera-icon15.png",
    alt: 'Icon',
    style: { top: '2240px', left: '0px', width: '100px', scale: '.9', Mirror: 'horizontal' },
  },
  // Add more images with their individual styles and positions as needed
];

const ImagesContainer = () => {
  return (
    <>
      {images.map((img, index) => (
        <ImageOverlay key={index} {...img} />
      ))}
    </>
  );
};

export default ImagesContainer;