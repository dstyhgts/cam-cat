"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
// import Navbar from "./Navbar"; // our landing-page navbar
// import NewNavbar from "../Components2/NewNavbar";

gsap.registerPlugin(CustomEase);

// Server-side flag to toggle between versions
const USE_DIGICAM_VERSION = true;

const LandingGallery = ({ className = "", ...props }) => {
  const containerRef = useRef(null);
  const galleryRef = useRef(null);
  const titleRef = useRef(null);
  const subTitleRef = useRef(null); // subheading ref
  const dragMeRef = useRef(null); // ref for the SVG
  const clickMeRef = useRef(null); // ref for the CLICK-ME SVG

  useEffect(() => {
    CustomEase.create(
      "hop",
      "M0,0 C0.053,0.604 0.157,0.72 0.293,0.837 0.435,0.959 0.633,1 1,1"
    );

    // Determine item count based on screen width
    const getItemsCount = () => {
      const width = window.innerWidth;
      if (USE_DIGICAM_VERSION) {
        return 23; // Both mobile and desktop: digicam-1 through digicam-23
      } else {
        if (width < 900) return 10; // mobile: half of desktop
        return 20; // desktop: reduced by 3 from original
      }
    };
    let itemsCount = getItemsCount();
    const container = containerRef.current;
    const gallery = galleryRef.current;
    
    // Rotation offset for continuous circular animation (digicam version only)
    let rotationOffset = 0;
    let animationId = null;

    // Advanced hover functions for circular layout:
    const advancedMouseEnter = (e, items) => {
      const hoveredItem = e.currentTarget;
      const origRot = parseFloat(hoveredItem.dataset.originalRotation) || 0;
      gsap.to(hoveredItem, {
        scale: 1.2,
        rotation: origRot - 10,
        duration: 0.3,
        ease: "power2.out",
      });
      const hoveredRect = hoveredItem.getBoundingClientRect();
      items.forEach((item) => {
        if (item !== hoveredItem) {
          const rect = item.getBoundingClientRect();
          const dx =
            (rect.x + rect.width / 2) -
            (hoveredRect.x + hoveredRect.width / 2);
          const dy =
            (rect.y + rect.height / 2) -
            (hoveredRect.y + hoveredRect.height / 2);
          const mag = Math.sqrt(dx * dx + dy * dy) || 1;
          const offsetX = (dx / mag) * 20;
          const offsetY = (dy / mag) * 20;
          gsap.to(item, {
            x: offsetX,
            y: offsetY,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });
    };

    const advancedMouseLeave = (e, items) => {
      const hoveredItem = e.currentTarget;
      const origRot = parseFloat(hoveredItem.dataset.originalRotation) || 0;
      gsap.to(hoveredItem, {
        scale: 1,
        rotation: origRot,
        duration: 0.3,
        ease: "power2.in",
      });
      items.forEach((item) => {
        if (item !== hoveredItem) {
          gsap.to(item, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "power2.in",
          });
        }
      });
    };

    // Drag-and-drop logic for cards
    let draggingItem = null;
    let dragOffset = { x: 0, y: 0 };
    let dragStart = { x: 0, y: 0 };
    let dragStartGallery = { x: 0, y: 0 };
    let dragTimeout = null;
    let isDragging = false;
    let galleryBox = null;

    const onMouseMove = (e) => {
      if (!draggingItem) return;
      const mouseX = e.touches ? e.touches[0].clientX : e.clientX;
      const mouseY = e.touches ? e.touches[0].clientY : e.clientY;
      // Position relative to gallery
      const x = mouseX - galleryBox.left - dragOffset.x;
      const y = mouseY - galleryBox.top - dragOffset.y;
      draggingItem.style.left = `${x}px`;
      draggingItem.style.top = `${y}px`;
      if (!isDragging) {
        // If user moved, start dragging immediately
        isDragging = true;
        draggingItem.classList.add('dragged');
        draggingItem.style.transform = '';
        draggingItem.style.zIndex = 1000;
      }
    };

    const onMouseUp = (e) => {
      if (!draggingItem) return;
      if (isDragging) {
        draggingItem.classList.remove('dragged');
        draggingItem.style.zIndex = '';
      }
      draggingItem = null;
      isDragging = false;
      clearTimeout(dragTimeout);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchmove', onMouseMove);
      document.removeEventListener('touchend', onMouseUp);
    };

    // Create gallery items and attach advanced hover & drag listeners
    const createItems = () => {
      // Remove any existing items to prevent duplicate listeners
      while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
      }
      // Recalculate itemsCount in case of resize
      itemsCount = getItemsCount();
      const isVerySmallScreen = window.innerWidth <= 450;
      
      // Generate image indices based on version
      let imageIndices = [];
      if (USE_DIGICAM_VERSION) {
        // Use digicam-1 through digicam-itemsCount
        imageIndices = Array.from({ length: itemsCount }, (_, i) => i + 1);
        // Randomize the order
        for (let i = imageIndices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [imageIndices[i], imageIndices[j]] = [imageIndices[j], imageIndices[i]];
        }
      } else {
        // Original version: img8 through img(8 + itemsCount - 1)
        imageIndices = Array.from({ length: itemsCount }, (_, i) => i + 8);
      }
      
      // Track image loads for digicam version
      let loadedImages = 0;
      let layoutRecalcTimeout = null;
      
      imageIndices.forEach((index) => {
        const item = document.createElement("div");
        item.classList.add("item");
        if (USE_DIGICAM_VERSION) {
          item.classList.add("digicam-item");
          // Set inline styles to override global card styles
          item.style.padding = '0';
          item.style.background = 'transparent';
          item.style.borderRadius = '0';
          item.style.width = 'auto';
          item.style.height = 'auto';
          item.style.overflow = 'visible';
          item.style.boxShadow = 'none';
        }

        const img = document.createElement("img");
        if (USE_DIGICAM_VERSION) {
          img.src = `/assets/digicam-${index}.png`;
          img.alt = `Digicam ${index}`;
          // Set inline styles to ensure no card styling and transparency
          img.style.width = 'auto';
          img.style.height = 'auto';
          img.style.maxWidth = '200px';
          img.style.maxHeight = '225px';
          img.style.objectFit = 'contain';
          img.style.display = 'block';
          img.style.background = 'none';
          img.style.backgroundColor = 'transparent';
        } else {
          img.src = `/assets/img${index}.jpg`;
          img.alt = `Image ${index}`;
        }
        img.loading = "lazy";

        item.appendChild(img);
        gallery.appendChild(item);
        
        // For digicam version, wait for images to load then recalculate layout
        if (USE_DIGICAM_VERSION) {
          img.onload = () => {
            loadedImages++;
            // Debounce layout recalculation - only recalculate after a short delay
            // This prevents multiple rapid recalculations as images load
            if (layoutRecalcTimeout) clearTimeout(layoutRecalcTimeout);
            layoutRecalcTimeout = setTimeout(() => {
              setCircularLayout();
            }, 100);
          };
          // Also handle images that are already cached/loaded
          if (img.complete) {
            img.onload();
          }
        }

        // Only enable drag events on desktop (not mobile)
        const isDesktop = window.innerWidth >= 900;
        if (isDesktop && !isVerySmallScreen) {
          // Drag events
          item.addEventListener('mousedown', (e) => {
            galleryBox = gallery.getBoundingClientRect();
            const rect = item.getBoundingClientRect();
            dragOffset.x = e.clientX - rect.left;
            dragOffset.y = e.clientY - rect.top;
            dragStart.x = e.clientX;
            dragStart.y = e.clientY;
            dragStartGallery.x = rect.left - galleryBox.left;
            dragStartGallery.y = rect.top - galleryBox.top;
            draggingItem = item;
            isDragging = false;
            dragTimeout = setTimeout(() => {
              if (draggingItem && !isDragging) {
                isDragging = true;
                item.classList.add('dragged');
                item.style.transform = '';
                item.style.position = 'absolute';
                item.style.left = `${dragStartGallery.x}px`;
                item.style.top = `${dragStartGallery.y}px`;
                item.style.zIndex = 1000;
              }
            }, 120);
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
          });
          item.addEventListener('mousemove', (e) => {
            if (!draggingItem || isDragging) return;
            if (Math.abs(e.clientX - dragStart.x) > 3 || Math.abs(e.clientY - dragStart.y) > 3) {
              clearTimeout(dragTimeout);
              isDragging = true;
              item.classList.add('dragged');
              item.style.transform = '';
              item.style.position = 'absolute';
              item.style.left = `${dragStartGallery.x}px`;
              item.style.top = `${dragStartGallery.y}px`;
              item.style.zIndex = 1000;
            }
          });
          item.addEventListener('touchstart', (e) => {
            galleryBox = gallery.getBoundingClientRect();
            const rect = item.getBoundingClientRect();
            const touch = e.touches[0];
            dragOffset.x = touch.clientX - rect.left;
            dragOffset.y = touch.clientY - rect.top;
            dragStart.x = touch.clientX;
            dragStart.y = touch.clientY;
            dragStartGallery.x = rect.left - galleryBox.left;
            dragStartGallery.y = rect.top - galleryBox.top;
            draggingItem = item;
            isDragging = false;
            dragTimeout = setTimeout(() => {
              if (draggingItem && !isDragging) {
                isDragging = true;
                item.classList.add('dragged');
                item.style.transform = '';
                item.style.position = 'absolute';
                item.style.left = `${dragStartGallery.x}px`;
                item.style.top = `${dragStartGallery.y}px`;
                item.style.zIndex = 1000;
              }
            }, 120);
            document.addEventListener('touchmove', onMouseMove);
            document.addEventListener('touchend', onMouseUp);
          });
          item.addEventListener('touchmove', (e) => {
            if (!draggingItem || isDragging) return;
            const touch = e.touches[0];
            if (Math.abs(touch.clientX - dragStart.x) > 3 || Math.abs(touch.clientY - dragStart.y) > 3) {
              clearTimeout(dragTimeout);
              isDragging = true;
              item.classList.add('dragged');
              item.style.transform = '';
              item.style.position = 'absolute';
              item.style.left = `${dragStartGallery.x}px`;
              item.style.top = `${dragStartGallery.y}px`;
              item.style.zIndex = 1000;
            }
          });
        }
      });
    };

    // Set circular layout for the items
    const setCircularLayout = (useRotationOffset = false) => {
      const items = container.querySelectorAll(".item");
      if (!items.length) return;
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      const isMobile = width < 900;
      // No change to radius logic, just more of each card is visible
      const numberOfItems = items.length;
      const angleIncrement = (2 * Math.PI) / numberOfItems;
      // Increase radius by 10% for digicam version, and additional 15% on desktop
      const baseRadius = isMobile ? width * 0.35 : 210;
      let radius = USE_DIGICAM_VERSION ? baseRadius * 1.1 : baseRadius;
      // Additional 15% increase for desktop digicam version
      if (USE_DIGICAM_VERSION && !isMobile) {
        radius = radius * 1.15;
      }
      // Center for desktop, right-half overflow for mobile (minus 100px, and shift for <450px)
      let centerX;
      if (isMobile && width < 450) {
        centerX = width * 1.25; // Only 1/4 of the leftmost side is visible
      } else if (isMobile) {
        centerX = width + radius / 2 - 100;
      } else {
        centerX = width / 2;
      }
      console.log('LandingGallery width:', width, 'centerX:', centerX);
      const centerY = height / 2;
      items.forEach((item, index) => {
        // Store base angle on initial layout, or use stored value
        const storedBaseAngle = item.dataset.baseAngle;
        const calculatedBaseAngle = index * angleIncrement;
        const baseAngle = storedBaseAngle ? parseFloat(storedBaseAngle) : calculatedBaseAngle;
        
        // Store base angle if not already stored
        if (!storedBaseAngle) {
          item.dataset.baseAngle = calculatedBaseAngle.toString();
        }
        
        // Apply rotation offset for continuous animation (digicam version only)
        const angle = useRotationOffset && USE_DIGICAM_VERSION 
          ? baseAngle + rotationOffset 
          : baseAngle;
        // For digicam items, use image dimensions if available, otherwise use item dimensions
        let itemWidth, itemHeight;
        if (USE_DIGICAM_VERSION && item.querySelector('img')) {
          const img = item.querySelector('img');
          // Use natural width/height if available, otherwise use computed dimensions
          if (img.naturalWidth && img.naturalHeight) {
            const aspectRatio = img.naturalWidth / img.naturalHeight;
            const maxW = 200;
            const maxH = 225;
            if (aspectRatio > 1) {
              itemWidth = Math.min(maxW, img.naturalWidth);
              itemHeight = itemWidth / aspectRatio;
            } else {
              itemHeight = Math.min(maxH, img.naturalHeight);
              itemWidth = itemHeight * aspectRatio;
            }
          } else {
            itemWidth = item.offsetWidth || img.offsetWidth || 200;
            itemHeight = item.offsetHeight || img.offsetHeight || 225;
          }
        } else {
          itemWidth = item.offsetWidth || 200;
          itemHeight = item.offsetHeight || 225;
        }
        const x = centerX + radius * Math.cos(angle) - itemWidth / 2;
        const y = centerY + radius * Math.sin(angle) - itemHeight / 2;
        // For digicam version, add 90 degrees to rotation
        const baseRotation = (angle * 180) / Math.PI + 90;
        const finalRotation = USE_DIGICAM_VERSION ? baseRotation + 90 : baseRotation;
        gsap.set(item, {
          left: `${x}px`,
          top: `${y}px`,
          rotation: finalRotation,
          transform: "translateY(0%)",
          x: 0,
          y: 0,
          scale: 1,
        });
        item.dataset.originalRotation = finalRotation;
      });
      // Attach advanced hover listeners only on desktop (not mobile)
      const isDesktop = window.innerWidth >= 900;
      if (isDesktop && window.innerWidth > 450) {
        items.forEach((item) => {
          item.addEventListener("mouseenter", (e) => advancedMouseEnter(e, items));
          item.addEventListener("mouseleave", (e) => advancedMouseLeave(e, items));
        });
      }
    };

    // Continuous rotation animation for digicam version (mobile only)
    const startRotationAnimation = () => {
      if (!USE_DIGICAM_VERSION) return;
      
      // Only start rotation on mobile (< 900px)
      const isMobile = window.innerWidth < 900;
      if (!isMobile) return;
      
      const rotate = () => {
        // Check if still mobile (in case of resize)
        if (window.innerWidth >= 900) {
          stopRotationAnimation();
          return;
        }
        // Slowly rotate (1 full rotation every ~40 seconds at 60fps)
        // 2π / (40 * 60) ≈ 0.00262 per frame
        rotationOffset += 0.00262;
        if (rotationOffset >= 2 * Math.PI) {
          rotationOffset = 0;
        }
        setCircularLayout(true);
        animationId = requestAnimationFrame(rotate);
      };
      rotate();
    };
    
    const stopRotationAnimation = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };

    // Initialize gallery immediately in circular layout
    const initGallery = () => {
      createItems();
      setCircularLayout();
      // Start rotation animation for digicam version (mobile only)
      if (USE_DIGICAM_VERSION) {
        startRotationAnimation();
      }
      // Update SVG positions after initial layout
      setTimeout(() => {
        if (typeof positionDragMe !== 'undefined') positionDragMe();
        if (typeof positionClickMe !== 'undefined') positionClickMe();
      }, 150);
    };

    initGallery();
    // Re-center and re-create items on resize
    const handleResize = () => {
      stopRotationAnimation();
      rotationOffset = 0; // Reset rotation offset on resize
      createItems();
      setCircularLayout();
      // Restart rotation animation only if mobile and digicam version
      if (USE_DIGICAM_VERSION) {
        startRotationAnimation();
      }
    };
    window.addEventListener('resize', handleResize);

    // After setCircularLayout, position the drag-me SVG
    const positionDragMe = () => {
      if (!galleryRef.current || !dragMeRef.current) return;
      const container = containerRef.current;
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      const isMobile = width < 900;
      if (isMobile) {
        dragMeRef.current.style.display = 'none';
        return;
      } else {
        dragMeRef.current.style.display = 'block';
      }
      // Use the same logic as setCircularLayout (including 10% radius increase for digicam)
      const items = container.querySelectorAll('.item');
      if (!items.length) return;
      const numberOfItems = items.length;
      const baseRadius = isMobile ? width * 0.35 : 210;
      let radius = USE_DIGICAM_VERSION ? baseRadius * 1.1 : baseRadius;
      // Additional 15% increase for desktop digicam version
      if (USE_DIGICAM_VERSION && !isMobile) {
        radius = radius * 1.15;
      }
      let centerX;
      if (width < 900 && width < 450) {
        centerX = width * 1.25;
      } else if (width < 900) {
        centerX = width + radius / 2 - 100;
      } else {
        centerX = width / 2;
      }
      const centerY = height / 2;
      // Place SVG just outside the circle's bottom right
      const offset = 90; // px outside the circle, increased for red space
      const svg = dragMeRef.current;
      // Calculate a point more to the right (60deg)
      const angle = Math.PI / 3; // 60deg for more right
      const svgX = centerX + radius * Math.cos(angle) + offset + 40; // manually move 75px right
      const svgY = centerY + radius * Math.sin(angle) + offset;
      svg.style.position = 'absolute';
      svg.style.left = `${svgX}px`;
      svg.style.top = `${svgY}px`;
      svg.style.zIndex = 30;
      svg.style.transform = 'rotate(30deg)';
    };
    // After layout, position the SVG
    setTimeout(positionDragMe, 0);
    window.addEventListener('resize', positionDragMe);

    // Dynamically position the CLICK-ME SVG below the theme toggle
    const positionClickMe = () => {
      const svg = clickMeRef.current;
      const toggle = document.getElementById('theme-toggle');
      if (!svg || !toggle) return;
      const toggleRect = toggle.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      // Calculate position relative to the landing gallery container
      const left = toggleRect.left - containerRect.left + toggleRect.width / 2 - 60;
      const top = toggleRect.bottom - containerRect.top + 10; // 10px below toggle
      svg.style.position = 'absolute';
      svg.style.left = `${left}px`;
      svg.style.top = `${top}px`;
      svg.style.transform = 'translateX(-50%)';
      svg.style.zIndex = 40;
      // Show CLICK-ME on all devices (both mobile and desktop)
      svg.style.display = 'block';
    };
    positionClickMe();
    window.addEventListener('resize', positionClickMe);
    
    // Update SVG positions after layout changes
    const updateSvgPositions = () => {
      setTimeout(() => {
        positionDragMe();
        positionClickMe();
      }, 50);
    };
    
    // Call updateSvgPositions after initial layout
    setTimeout(updateSvgPositions, 100);
    
    return () => {
      stopRotationAnimation();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', positionDragMe);
      window.removeEventListener('resize', positionClickMe);
    };
  }, []);

  return (
    <>
      {/* <NewNavbar /> */}
      <div className={`lg-container ${className}`} ref={containerRef} {...props}>
        {/* Title element (initially hidden) */}
        {/* <div className="title" ref={titleRef}>CAMERA CATERING</div> */}
        {/* Subheading element (initially hidden) */}
        {/* <div className="sub-title" ref={subTitleRef}>Invite cameras to your next event.</div> */}
        {/* CLICK-ME SVG, dynamically positioned below the theme toggle */}
        <div ref={clickMeRef} style={{width:'140px', height:'auto', display:'block', pointerEvents:'none', position:'absolute'}}>
          <img src="/assets/CLICK-ME3.svg" alt="Click me" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div className="lg-gallery-wrapper" style={{position:'relative', width:'100%', height:'100%'}}>
          <div className="lg-gallery" ref={galleryRef}></div>
          {/* DRAG-ME SVG, desktop only, positioned dynamically */}
          <div ref={dragMeRef} style={{width:'90px', height:'auto', display:'none', pointerEvents:'none'}}>
            <img src="/assets/DRAG-ME.svg" alt="Drag me" style={{ width: '100%', height: 'auto' }} />
          </div>
        </div>
      </div>
      <style jsx>{`
        .lg-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: var(--landing-gallery-bg);
          transition: background 300ms ease-in-out;
        }
        .click-me-below-toggle {
          position: absolute;
          left: 50%;
          top: 60px;
          transform: translateX(-50%);
          z-index: 40000;
          display: block;
        }
        @media (max-width: 900px) {
          .click-me-below-toggle {
            display: none;
          }
        }
        .lg-gallery {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .lg-gallery-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }
        /* Shared font style for Title and Loader */
        .title {
          position: absolute;
          z-index: 20;
          opacity: 0;
        }
        .sub-title {
          position: relative;
          z-index: 20;
          opacity: 0;
          font-size: 2rem;
          font-weight: 900;
        }
        .item.dragged {
          box-shadow: 0 8px 32px rgba(0,0,0,0.25), 0 1.5px 8px rgba(0,0,0,0.12);
          cursor: grabbing !important;
          pointer-events: auto !important;
        }
        /* Digicam version: remove ALL card styling, just show transparent PNGs */
        .item.digicam-item {
          padding: 0 !important;
          background: transparent !important;
          border-radius: 0 !important;
          width: auto !important;
          height: auto !important;
          overflow: visible !important;
          box-shadow: none !important;
        }
        .item.digicam-item img {
          background: none !important;
          background-color: transparent !important;
          border-radius: 0 !important;
          width: auto !important;
          height: auto !important;
          max-width: 200px !important;
          max-height: 225px !important;
          object-fit: contain !important;
          display: block !important;
          /* Use drop-shadow filter to only shadow visible content, not transparent areas */
          filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.1)) !important;
          box-shadow: none !important;
          mix-blend-mode: normal !important;
        }
        @media (max-width: 900px) {
          .drag-me-desktop {
            display: none;
          }
        }
        @media (max-width: 768px) {
        }
      `}</style>
    </>
  );
};

export default LandingGallery;
