// ImageOverlay.jsx
import React from 'react';
import './ImageOverlay.css';

const ImageOverlay = ({ src, alt, style, className = '' }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`image-overlay ${className}`}
      style={style}
      loading="lazy"
    />
  );
};

export default ImageOverlay;