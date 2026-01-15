// app/page.js
"use client";
import { useState, useEffect } from 'react';
import Footer from "./Components2/Footer";
import LandingGallery from "./Components2/LandingGallery";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components2/Sidebar";
import ColorfulBranding from "./Components2/ColorfulBranding";
import "./globals.css";
import ZoomScroll from "./Components/ZoomScroll";
import StickyScroll from "./Components/StickyScroll";
import ColorfulBranding2 from "./Components2/ColorfulBranding2";
// import MainGrid from "./Components2/MainGrid";
import BigSvg from "./Components2/BigSvg";
import WelcomeCamera from "./Components2/WelcomeCamera";
import ThreeCards from "./Components2/ThreeCards";
import ImagesContainer from "./Components2/ImageContainer";
import NewNavbar from "./Components2/NewNavbar";
import SimpleStage from "./Components2/SimpleStage";
import { ThemeProvider } from "./Components2/ThemeProvider";
import BusinessOfferings from "./Components2/BusinessOfferings";
import WelcomePopup from "./Components2/WelcomePopup";
import Preloader from "./Components2/Preloader";
// import GlobalComponentsWrapper from "./Components/GlobalComponentsWrapper";

export default function RootLayout({ children }) {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  // Preload critical assets
  useEffect(() => {
    const preloadAssets = async () => {
      try {
        // Preload critical images and assets
        const criticalAssets = [
          '/assets/camera-icon112.svg',
          '/assets/camera-icon113.svg',
          '/assets/camera-icon111.svg',
          '/assets/camera-icon100.svg',
          '/assets/camera-icon13.svg',
          '/assets/camera-icon115.svg',
          '/assets/camera-icon23.svg',
          '/assets/camera-icon20.svg',
          '/assets/camera-icon102.svg',
          '/assets/camera-icon10.svg',
          '/assets/camera-icon101.svg',
          '/assets/camera-icon103.svg',
          '/assets/camera-icon106.svg',
          '/assets/camera-icon11.svg',
          '/assets/camera-icon12.svg',
          '/assets/camera-icon15.svg',
          '/assets/camera-icon16.svg',
          '/assets/camera-icon18.svg',
          '/assets/camera-icon21.svg',
          '/assets/camera-icon22.svg',
          '/assets/camera-icon24.svg',
          '/assets/camera-icon30.svg',
          '/assets/camera-icon32-1.svg',
          '/assets/camera-icon32.svg',
          '/assets/camera-icon50.svg',
          '/assets/camera-icon51.svg',
          '/assets/camera-icon150.svg',
          '/assets/camera-icon151.svg',
          '/assets/camera-icon153.svg',
          '/assets/camera-icon154.svg',
          '/hero.jpg',
          '/logo.png',
          '/assets/about1.JPG',
          '/assets/about2.JPG',
          '/assets/about3.JPG',
          '/assets/about4.JPG',
          '/assets/about5.JPG',
          '/assets/about6.JPG'
        ];

        const preloadPromises = criticalAssets.map(src => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve; // Don't fail on error, just continue
            img.src = src;
          });
        });

        // Also preload some video assets
        const videoAssets = [
          '/assets/BrookeBDAY2.mp4',
          '/assets/PiggyBackRide.mp4',
          '/assets/Resturant1.mp4',
          '/assets/The Cousins_1.mp4',
          '/assets/UNCLE-JERRY-WEBSITE.mp4',
          '/assets/videoloop1.mp4',
          '/assets/WeddingBIG.mp4'
        ];

        const videoPromises = videoAssets.map(src => {
          return new Promise((resolve) => {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.onloadedmetadata = resolve;
            video.onerror = resolve;
            video.src = src;
          });
        });

        await Promise.all([...preloadPromises, ...videoPromises]);
        setAssetsLoaded(true);
        setIsLoading(false);
      } catch (error) {
        console.log('Preload error:', error);
        setAssetsLoaded(true);
        setIsLoading(false);
      }
    };

    preloadAssets();
  }, []);

  const handleEnter = () => {
    setShowPreloader(false);
  };

  return (
    <html lang="en">
      <head>
        <title>Rent Digicams, VHS, & Instax Camera's for your events! CA, LA, SF, SD, SB, OC</title>
        <meta
          name="description"
          content="WE BRING THE CAMERAS, YOU TAKE THE PHOTOS... Our one-of-a-kind service: Ditch disposable cameras, rent bulk digicams and camcorders instead."
        />
        <link rel="preload" href="/assets/camera-icon112.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/assets/camera-icon113.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/assets/camera-icon111.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/assets/camera-icon100.svg" as="image" type="image/svg+xml" />
        <link rel="icon" href="/assets/camera-icon13.svg" type="image/svg+xml" />
        <link rel="preload" href="/assets/camera-icon13.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/assets/camera-icon115.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/assets/camera-icon23.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/assets/camera-icon20.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/hero.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/logo.png" as="image" type="image/png" />
        {/* <link rel="preload" href="/assets/about1.JPG" as="image" type="image/jpeg" />
        <link rel="preload" href="/assets/about2.JPG" as="image" type="image/jpeg" />
        <link rel="preload" href="/assets/about3.JPG" as="image" type="image/jpeg" />
        <link rel="preload" href="/assets/about4.JPG" as="image" type="image/jpeg" />
        <link rel="preload" href="/assets/about5.JPG" as="image" type="image/jpeg" />
        <link rel="preload" href="/assets/about6.JPG" as="image" type="image/jpeg" /> */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body>
        <ThemeProvider>
          {/* Preloader - positioned absolutely to overlay content */}
          {showPreloader && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 9999,
              backgroundColor: 'rgba(0, 0, 0, 0.95)'
            }}>
              <Preloader onEnter={handleEnter} />
            </div>
          )}
          
          {/* Main content - always rendered but may be hidden by preloader */}
          <div style={{
            opacity: showPreloader ? 0 : 1,
            transition: 'opacity 0.5s ease-in-out',
            pointerEvents: showPreloader ? 'none' : 'auto'
          }}>
            <NewNavbar />
            <section id="section1" style={{ height: '100%', scrollMarginTop: '80px' }}>
              <WelcomeCamera />
            </section>
            <section style={{ scrollMarginTop: '80px' }}>
              <ColorfulBranding />
            </section>
            <section id="main-content" style={{ width: '100%', scrollMarginTop: '50px' }}>
              <BigSvg />
            </section>
            <section id="business-offerings" style={{ scrollMarginTop: '80px' }}>
              <BusinessOfferings />
            </section>
            <ColorfulBranding2 />
            <section id="footer" style={{ width: '100%', scrollMarginTop: '50px' }}>
              <Footer />
            </section>
          </div>
          <Sidebar />
          <WelcomePopup delay={5000} />
        </ThemeProvider>
      </body>
    </html>
  );
}