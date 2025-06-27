"use client";
import { useEffect, useRef } from "react";
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

  useEffect(() => {
    CustomEase.create(
      "hop",
      "M0,0 C0.053,0.604 0.157,0.72 0.293,0.837 0.435,0.959 0.633,1 1,1"
    );

    const itemsCount = 30;
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

    // Create gallery items and attach advanced hover listeners
    const createItems = () => {
      // Remove any existing items to prevent duplicate listeners
      while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
      }
      for (let i = 1; i <= itemsCount; i++) {
        const item = document.createElement("div");
        item.classList.add("lg-item");

        const img = document.createElement("img");
        // Ensure your images (img1.jpg … img30.jpg) are in public/assets/
        img.src = `/assets/img${i}.jpg`;
        img.alt = `Image ${i}`;

        item.appendChild(img);
        gallery.appendChild(item);
      }
    };

    // Set circular layout for the items
    const setCircularLayout = () => {
      const items = container.querySelectorAll(".lg-item");
      if (!items.length) return;
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      const isMobile = width < 900;
      const numberOfItems = items.length;
      const angleIncrement = (2 * Math.PI) / numberOfItems;
      const radius = isMobile ? width * 0.35 : 210;
      // Center for desktop, right-half overflow for mobile (minus 100px)
      const centerX = isMobile ? width + radius / 2 - 100 : width / 2;
      const centerY = height / 2;
      items.forEach((item, index) => {
        const angle = index * angleIncrement;
        const x = centerX + radius * Math.cos(angle) - item.offsetWidth / 2;
        const y = centerY + radius * Math.sin(angle) - item.offsetHeight / 2;
        gsap.set(item, {
          left: `${x}px`,
          top: `${y}px`,
          rotation: (angle * 180) / Math.PI - 90,
          transform: "translateY(0%)",
          x: 0,
          y: 0,
          scale: 1,
        });
        item.dataset.originalRotation = (angle * 180) / Math.PI - 90;
      });
      // Attach advanced hover listeners
      items.forEach((item) => {
        item.addEventListener("mouseenter", (e) => advancedMouseEnter(e, items));
        item.addEventListener("mouseleave", (e) => advancedMouseLeave(e, items));
      });
    };

    // Initialize gallery immediately in circular layout
    const initGallery = () => {
      createItems();
      setCircularLayout();
    };

    initGallery();
    // Re-center on resize
    window.addEventListener('resize', setCircularLayout);
    return () => window.removeEventListener('resize', setCircularLayout);
  }, []);

  return (
    <>
      {/* <NewNavbar /> */}
      <div className={`lg-container ${className}`} ref={containerRef} {...props}>
        {/* Title element (initially hidden) */}
        {/* <div className="title" ref={titleRef}>CAMERA CATERING</div> */}
        {/* Subheading element (initially hidden) */}
        {/* <div className="sub-title" ref={subTitleRef}>Invite cameras to your next event.</div> */}
        <div className="lg-gallery" ref={galleryRef}></div>
      </div>
      <style jsx>{`
        .lg-container {
          position: relative;
          width: 100vw;
          min-height: 100vh;
          padding-top: 60px;
          box-sizing: border-box;
          overflow: hidden;
          background: var(--landing-gallery-bg);
          transition: background 300ms ease-in-out;
        }
        .lg-gallery {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .lg-item {
          position: absolute;
          width: 175px;
          height: 250px;
          background: var(--landing-gallery-item-bg);
          overflow: hidden;
          transition: background 300ms ease-in-out;
        }
        .lg-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
        @media (max-width: 768px) {
          .lg-item {
            width: 100px;
            height: 150px;
          }
          .lg-container {
            min-height: 100dvh;
            padding-top: 60px;
          }
        }
      `}</style>
    </>
  );
};

export default LandingGallery;
