"use client";
import React, { useState, useEffect } from 'react';
import styles from './Preloader.module.css';

export default function Preloader({ onEnter }) {
  const [loading, setLoading] = useState(true);
  const [canEnter, setCanEnter] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  // Camera icons to cycle through
  const cameraIcons = [
    '/assets/camera-icon10.svg',
    '/assets/camera-icon11.svg',
    '/assets/camera-icon12.svg',
    '/assets/camera-icon13.svg',
    '/assets/camera-icon15.svg',
    '/assets/camera-icon16.svg',
    '/assets/camera-icon18.svg'
  ];

  useEffect(() => {
    // Preload landing gallery images
    const preloadLandingGalleryImages = async () => {
      try {
        // Preload camera icons for smooth transitions
        const iconPromises = cameraIcons.map(src => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve;
            img.src = src;
          });
        });
        
        // Determine which images to load based on screen size
        const isMobile = window.innerWidth < 900;
        const startIndex = 8;
        const endIndex = isMobile ? 17 : 27;
        const totalImages = endIndex - startIndex + 1;
        
        // Start cycling through camera icons
        const iconInterval = setInterval(() => {
          setCurrentIconIndex(prev => (prev + 1) % cameraIcons.length);
        }, 500); // Change icon every 500ms

        // Load images one by one to show progress
        let loadedImages = 0;
        const imagePromises = [];
        
        for (let i = startIndex; i <= endIndex; i++) {
          const img = new Image();
          const promise = new Promise((resolve) => {
            img.onload = () => {
              loadedImages++;
              setLoadingProgress((loadedImages / totalImages) * 100);
              resolve();
            };
            img.onerror = () => {
              loadedImages++;
              setLoadingProgress((loadedImages / totalImages) * 100);
              resolve();
            };
          });
          img.src = `/assets/img${i}.JPG`;
          imagePromises.push(promise);
        }

        // Wait for all images to load
        await Promise.all([...iconPromises, ...imagePromises]);
        
        // Clear icon cycling
        clearInterval(iconInterval);
        
        // Complete loading
        setLoading(false);
        setCanEnter(true);
        setLoadingProgress(100);
      } catch (error) {
        console.log('Preload error:', error);
        setLoading(false);
        setCanEnter(true);
        setLoadingProgress(100);
      }
    };

    preloadLandingGalleryImages();
  }, []);

  const handleEnter = () => {
    if (canEnter) {
      onEnter();
    }
  };

  return (
    <div className={styles['preloader-overlay']}>
      <div className={styles['preloader-content']}>
        {/* Camera SVG Icon */}
        <div className={styles['camera-icon']}>
          <img 
            src={cameraIcons[currentIconIndex]} 
            alt="Camera Icon" 
            width="120" 
            height="120"
            style={{ transition: 'opacity 0.2s ease' }}
          />
        </div>

        {/* Loading Animation */}
        {loading && (
          <div className={styles['loading-container']}>
            <div className={styles['loading-bar']}>
              <div 
                className={styles['loading-progress']} 
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <div className={styles['loading-text']}>Loading...</div>
          </div>
        )}

        {/* Enter Button */}
        {canEnter && (
          <button 
            className={`${styles['enter-button']} ${canEnter ? styles['enter-button-ready'] : ''}`}
            onClick={handleEnter}
          >
            Enter
          </button>
        )}

        {/* Enter Text (always visible but styled differently based on state) */}
        {/* <div className={`${styles['enter-text']} ${canEnter ? styles['enter-text-ready'] : ''}`}>
          CAM-CAT
        </div> */}
      </div>
    </div>
  );
}
