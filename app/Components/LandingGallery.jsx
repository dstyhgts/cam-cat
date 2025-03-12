"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Flip from "gsap/Flip";
import CustomEase from "gsap/CustomEase";
import Navbar from "./Navbar"; // our landing-page navbar

gsap.registerPlugin(CustomEase, Flip);

export default function LandingGallery() {
  const containerRef = useRef(null);
  const galleryRef = useRef(null);
  const loaderRef = useRef(null);
  const titleRef = useRef(null);
  const subTitleRef = useRef(null); // subheading ref
  // Flag to ensure the circular animation runs only once
  const circularTriggered = useRef(false);

  useEffect(() => {
    // Lock scrolling while loading gallery
    const scrollContainer = document.querySelector("#scroll-container");
    if (scrollContainer) {
      scrollContainer.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.style.overflow = "auto";
      } else {
        document.body.style.overflow = "auto";
        document.documentElement.style.overflow = "auto";
      }
    };
  }, []);

  useEffect(() => {
    // Create custom easing "hop"
    CustomEase.create(
      "hop",
      "M0,0 C0.053,0.604 0.157,0.72 0.293,0.837 0.435,0.959 0.633,1 1,1"
    );

    const itemsCount = 30;
    const container = containerRef.current;
    const gallery = galleryRef.current;

    // Determine spacing based on container width
    const getSpacing = () => (container.offsetWidth < 768 ? 15 : 30);

    // Simple hover functions for initial linear layout:
    const simpleMouseEnter = (e) => {
      gsap.to(e.currentTarget, { y: -20, duration: 0.3, ease: "power2.out" });
    };
    const simpleMouseLeave = (e) => {
      gsap.to(e.currentTarget, { y: 0, duration: 0.3, ease: "power2.in" });
    };

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

    // Create gallery items and attach simple hover listeners
    const createItems = () => {
      for (let i = 1; i <= itemsCount; i++) {
        const item = document.createElement("div");
        item.classList.add("lg-item");

        const img = document.createElement("img");
        // Ensure your images (img1.jpg … img30.jpg) are in public/assets/
        img.src = `/assets/img${i}.jpg`;
        img.alt = `Image ${i}`;

        item.appendChild(img);
        gallery.appendChild(item);

        item.addEventListener("mouseenter", simpleMouseEnter);
        item.addEventListener("mouseleave", simpleMouseLeave);
        item.simpleMouseEnter = simpleMouseEnter;
        item.simpleMouseLeave = simpleMouseLeave;
      }
    };

    // Set initial linear layout and position Title and Timer (Counter)
    const setInitialLinearLayout = () => {
      const items = container.querySelectorAll(".lg-item");
      if (!items.length) return;
      const spacing = getSpacing();
      const itemWidth = items[0].offsetWidth;
      const totalWidth = (items.length - 1) * spacing + itemWidth;
      const startX = (container.offsetWidth - totalWidth) / 2;

      items.forEach((item, index) => {
        gsap.set(item, {
          left: `${startX + index * spacing}px`,
          top: "150%", // start offscreen vertically
          rotation: 0,
          x: 0,
          y: 0,
          scale: 1,
        });
      });

      // Animate items into final positions
      gsap.to(items, {
        top: "50%",
        transform: "translateY(-50%)",
        duration: 1,
        ease: "hop",
        stagger: 0.03,
        onComplete: () => {
          const containerHeight = container.offsetHeight;
          // Position Title 20px above the first image
          const firstItem = items[0];
          const firstItemLeft = firstItem.offsetLeft;
          const firstItemHeight = firstItem.offsetHeight;
          const finalFirstItemTop = containerHeight * 0.5 - firstItemHeight / 2;
          gsap.set(titleRef.current, {
            left: `${firstItemLeft}px`,
            top: `${finalFirstItemTop - 20}px`,
            fontSize: "16px",
            fontWeight: "bold",
            opacity: 0,
          });
          gsap.to(titleRef.current, { opacity: 1, duration: 1 });

          // Position Timer (loader) above the last image (20px above its top edge)
          const lastItem = items[items.length - 1];
          const lastItemLeft = lastItem.offsetLeft;
          const lastItemWidth = lastItem.offsetWidth;
          const lastItemHeight = lastItem.offsetHeight;
          const finalLastItemTop = containerHeight * 0.5 - lastItemHeight / 2;
          gsap.set(loaderRef.current, {
            left: `${lastItemLeft + lastItemWidth - loaderRef.current.offsetWidth}px`,
            top: `${finalLastItemTop - 20}px`,
            opacity: 0,
          });
          gsap.to(loaderRef.current, { opacity: 1, duration: 1 });
        }
      });
    };

    // Define the circular layout for the items, with a mobile adjustment
    const setCircularLayout = () => {
      const items = container.querySelectorAll(".lg-item");
      if (!items.length) return;
      const isMobile = container.offsetWidth < 768;
      const numberOfItems = items.length;
      const angleIncrement = (2 * Math.PI) / numberOfItems;
      const radius = isMobile ? container.offsetWidth * 0.35 : 210;
      // On mobile, shift the circle so that only the left half is visible:
      // Place the circle's center at the right edge of the viewport.
      const centerX = isMobile ? container.offsetWidth : container.offsetWidth / 2;
      const centerY = container.offsetHeight / 2;
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
    };

    // Animate from linear to circular layout, including Title and Sub-title
    const animateToCircularLayout = () => {
      const items = Array.from(container.querySelectorAll(".lg-item"));
      const state = Flip.getState(items);
      setCircularLayout();
      Flip.from(state, {
        duration: 2,
        ease: "hop",
        stagger: -0.03,
        onEnter: (element) => gsap.to(element, { rotation: "+=360" }),
      });
      // Swap hover listeners for advanced ones:
      items.forEach((item) => {
        item.removeEventListener("mouseenter", item.simpleMouseEnter);
        item.removeEventListener("mouseleave", item.simpleMouseLeave);
        item.addEventListener("mouseenter", (e) => advancedMouseEnter(e, items));
        item.addEventListener("mouseleave", (e) => advancedMouseLeave(e, items));
      });
      // Determine reactive left padding based on device width
      const isMobile = container.offsetWidth < 768;
      const leftPadding = isMobile ? "20px" : "75px";
      // Create a timeline for the title and sub-title so that they move in parallel.
      const tl = gsap.timeline();
      tl.to(titleRef.current, {
        duration: 3.5,
        fontSize: "5rem",
        left: leftPadding,
        top: "45%",
        ease: "power3.out",
        fontWeight: "900"
      }, 0);
      // Simultaneously, animate the sub-title's opacity to 1.
      tl.to(subTitleRef.current, {
        duration: 3.5,
        opacity: 1,
        ease: "power2.inOut"
      }, 0);
      // On every update, reposition the sub-title so that it stays 18px below the title,
      // with the same left padding.
      tl.eventCallback("onUpdate", () => {
        const titleRect = titleRef.current?.getBoundingClientRect();
        if (!titleRect) return; // or handle the case where the element is not yet available
        // continue with your logic using titleRect
                gsap.set(subTitleRef.current, { left: leftPadding, top: titleRect.bottom + 18 });
      });
      // Fade out the Timer (loader)
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        onComplete: () => {
          gsap.to(".preload", {
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          });
          const scrollContainer = document.querySelector("#scroll-container");
          if (scrollContainer) {
            scrollContainer.style.overflow = "auto";
          } else {
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
          }
        },
      });
    };

    // Animate the loader counter from 0 to 100, then trigger the circular layout
    gsap.to(loaderRef.current, {
      y: 0,
      duration: 1,
      ease: "power3.out",
      delay: 1,
      onComplete: animateCounter,
    });

    function animateCounter() {
      const counterElement = loaderRef.current;
      let currentValue = 0;
      const updateInterval = 300;
      const maxDuration = 2000;
      const endValue = 100;
      const startTime = Date.now();

      const updateCounter = () => {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < maxDuration) {
          currentValue = Math.min(
            currentValue + Math.floor(Math.random() * 30) + 5,
            endValue
          );
          counterElement.querySelector("p").textContent = currentValue;
          setTimeout(updateCounter, updateInterval);
        } else {
          counterElement.querySelector("p").textContent = endValue;
          setTimeout(() => {
            gsap.to(counterElement, {
              y: -20,
              duration: 1,
              ease: "power3.inOut",
              onComplete: () => {
                if (!circularTriggered.current) {
                  circularTriggered.current = true;
                  animateToCircularLayout();
                }
              },
            });
          }, 300);
        }
      };

      updateCounter();
    }

    const initGallery = () => {
      createItems();
      setInitialLinearLayout();
    };

    initGallery();
  }, []);

  return (
    <>
      <Navbar />
      <div className="lg-container" ref={containerRef}>
        {/* Title element (initially hidden) */}
        <div className="title" ref={titleRef}>CAMERA CATERING</div>
        {/* Subheading element (initially hidden) */}
        <div className="sub-title" ref={subTitleRef}>Invite cameras to your next event.</div>
        {/* Timer element */}
        <div className="lg-loader" ref={loaderRef}>
          <p>0</p>
        </div>
        <div className="lg-gallery" ref={galleryRef}></div>
      </div>
      <style jsx>{`
        .lg-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: #423c76;
        }
        .lg-loader {
          position: absolute;
          width: 40px;
          height: 20px;
          text-align: center;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          z-index: 10;
          opacity: 0; /* Initially hidden */
        }
        .lg-loader p {
          margin: 0;
          padding: 0;
          /* Shared font style for Title and Loader */
          font-family: Arial, sans-serif;
          font-weight: bold;
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
          background: #b0b0b0;
          overflow: hidden;
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
          .lg-loader {
            width: 30px;
            height: 15px;
          }
        }
      `}</style>
    </>
  );
}
