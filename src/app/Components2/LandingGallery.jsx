"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
// import Navbar from "./Navbar"; // our landing-page navbar
// import NewNavbar from "../Components2/NewNavbar";

gsap.registerPlugin(CustomEase);

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
      if (width < 900) return 10; // mobile: half of desktop
      return 20; // desktop: reduced by 3 from original
    };
    let itemsCount = getItemsCount();
    const container = containerRef.current;
    const gallery = galleryRef.current;

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
      for (let i = 8; i < 8 + itemsCount; i++) {
        const item = document.createElement("div");
        item.classList.add("item");

        const img = document.createElement("img");
        img.src = `/assets/img${i}.jpg`;
        img.alt = `Image ${i}`;
        img.loading = "lazy";

        item.appendChild(img);
        gallery.appendChild(item);

        if (!isVerySmallScreen) {
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
      }
    };

    // Set circular layout for the items
    const setCircularLayout = () => {
      const items = container.querySelectorAll(".item");
      if (!items.length) return;
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      const isMobile = width < 900;
      // No change to radius logic, just more of each card is visible
      const numberOfItems = items.length;
      const angleIncrement = (2 * Math.PI) / numberOfItems;
      const radius = isMobile ? width * 0.35 : 210;
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
        const angle = index * angleIncrement;
        const x = centerX + radius * Math.cos(angle) - item.offsetWidth / 2;
        const y = centerY + radius * Math.sin(angle) - item.offsetHeight / 2;
        gsap.set(item, {
          left: `${x}px`,
          top: `${y}px`,
          rotation: (angle * 180) / Math.PI + 90,
          transform: "translateY(0%)",
          x: 0,
          y: 0,
          scale: 1,
        });
        item.dataset.originalRotation = (angle * 180) / Math.PI + 90;
      });
      // Attach advanced hover listeners
      if (window.innerWidth > 450) {
        items.forEach((item) => {
          item.addEventListener("mouseenter", (e) => advancedMouseEnter(e, items));
          item.addEventListener("mouseleave", (e) => advancedMouseLeave(e, items));
        });
      }
    };

    // Initialize gallery immediately in circular layout
    const initGallery = () => {
      createItems();
      setCircularLayout();
    };

    initGallery();
    // Re-center and re-create items on resize
    const handleResize = () => {
      createItems();
      setCircularLayout();
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
      // Use the same logic as setCircularLayout
      const items = container.querySelectorAll('.item');
      if (!items.length) return;
      const numberOfItems = items.length;
      const radius = width < 900 ? width * 0.35 : 210;
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
      svg.style.display = 'block';
    };
    positionClickMe();
    window.addEventListener('resize', positionClickMe);
    return () => window.removeEventListener('resize', positionClickMe);
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
          z-index: 40;
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
