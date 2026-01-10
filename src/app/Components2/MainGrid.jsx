import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import HowItWorksButton from './HowItWorksButton';
import './MainGrid.css';
import TheInstantButton from './TheInstantButton';
import TheCameraBarButton from './TheCameraBarButton';
import TheMemoryButton from './TheMemoryButton';
import WhyNowButton from './WhyNowButton';
import PrintPackButton2 from './PrintPackButton2';
import NostalgiaPackButton from './NostalgiaPackButton';
import ClassicsPackButton from './ClassicsPackButton';
import PremierePackButton from './PremierePackButton';
import DiamondPackButton from './DiamondPackButton';
import TestimonialSmall from './TestimonialSmall';
import TestimonialMed from './TestimonialMed';
import TestimonialBig from './TestimonialBig';
import AboutCard from './AboutCard';
import ImagesContainer from './ImageContainer';
import { PopupButton } from '@typeform/embed-react';

// Helper: seeded random for consistent variability
function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// New stacked photo cards component
const StackedPhotoCards = () => {
  const stackRef = useRef(null);
  const [clickedCardIndex, setClickedCardIndex] = useState(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [failedImages, setFailedImages] = useState(new Set());
  const imageRefs = useRef({});

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cardWidth = 300;
  const cardHeight = 337;
  const leftPad = 80;
  const centerCardCount = 10;
  const sideCardCount = 6;
  const totalImages = 58; // img1.JPG to img58.JPG

  // Preload all images to ensure they're available
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = [];
      for (let i = 1; i <= totalImages; i++) {
        const imgPath = `/assets/img${i}.JPG`;
        const img = new Image();
        img.src = imgPath;
        
        const promise = new Promise((resolve, reject) => {
          img.onload = () => {
            setLoadedImages(prev => new Set([...prev, imgPath]));
            resolve(imgPath);
          };
          img.onerror = () => {
            // Try lowercase extension as fallback
            const fallbackPath = `/assets/img${i}.jpg`;
            const fallbackImg = new Image();
            fallbackImg.src = fallbackPath;
            fallbackImg.onload = () => {
              setLoadedImages(prev => new Set([...prev, fallbackPath]));
              resolve(fallbackPath);
            };
            fallbackImg.onerror = () => {
              setFailedImages(prev => new Set([...prev, imgPath, fallbackPath]));
              reject(new Error(`Failed to load image ${i}`));
            };
          };
        });
        imagePromises.push(promise);
      }
      
      // Wait for all images to attempt loading (don't block on failures)
      await Promise.allSettled(imagePromises);
    };

    preloadImages();
  }, [totalImages]);

  // Memoize card generation so it only happens once on mount
  const { allCards, totalHeight } = useMemo(() => {
    // Generate the pool of image paths for all images 1-58
    const allImages = [];
    for (let i = 1; i <= totalImages; i++) {
      allImages.push(`/assets/img${i}.JPG`);
    }

    // Shuffle the pool using Fisher-Yates algorithm for true randomness
    // This ensures all images from img1 to img58 have equal probability of being selected
    function shuffle(array) {
      const shuffled = [...array]; // Create a copy to avoid mutating the original
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
    const shuffledImages = shuffle(allImages);
    
    // Randomly pick images for center stack and side cards from the shuffled pool
    const centerImages = shuffledImages.slice(0, centerCardCount);
    const sideImages = shuffledImages.slice(centerCardCount, centerCardCount + sideCardCount);

    // Build the center cards array with rotation, offset, and top position
    let topSum = 0;
    const centerCards = centerImages.map((src, i) => {
      const rot = Math.random() * 48 - 24; // -24 to 24 deg
      const hOffset = i === 0 ? -60 : Math.random() * 120 - 60; // first image always leftmost, reduced gap by 50%
      const vOffset = 140 + Math.random() * 100; // 140 to 240 px
      const top = topSum;
      topSum += vOffset;
      return { src, rot, hOffset, top, side: 'center' };
    });

    // Calculate total height for side card positioning
    const calculatedTotalHeight = topSum + cardHeight;

    // Build the side cards array - evenly split between left and right
    const sideCards = sideImages.map((src, i) => {
      const rot = Math.random() * 48 - 24; // -24 to 24 deg
      // Split evenly: first half go to left, second half go to right
      const halfCount = Math.floor(sideCardCount / 2);
      const side = i < halfCount ? 'left' : 'right';
      // Position horizontally: left side goes negative, right side goes positive (reduced gap by 50%)
      const hOffset = side === 'left' 
        ? -(cardWidth + 25 + Math.random() * 50) // -325 to -375px (left of stack)
        : (150 + Math.random() * 50); // 150 to 200px (right of stack)
      // Random vertical position along the stack height
      const top = Math.random() * (calculatedTotalHeight - cardHeight);
      return { src, rot, hOffset, top, side };
    });

    // Combine all cards
    const combinedCards = [...centerCards, ...sideCards];
    
    return { allCards: combinedCards, totalHeight: calculatedTotalHeight };
  }, []); // Empty dependency array means this only runs once on mount

  // Handle image load errors with retry logic
  const handleImageError = useCallback((e, cardSrc, cardIndex) => {
    const img = e.target;
    // Try lowercase extension as fallback
    if (cardSrc.endsWith('.JPG')) {
      const fallbackSrc = cardSrc.replace('.JPG', '.jpg');
      img.src = fallbackSrc;
      img.onerror = () => {
        // If both fail, mark as failed and show placeholder
        setFailedImages(prev => new Set([...prev, cardSrc, fallbackSrc]));
        img.style.display = 'none';
      };
    } else {
      // Already tried lowercase, mark as failed
      setFailedImages(prev => new Set([...prev, cardSrc]));
      img.style.display = 'none';
    }
  }, []);

  const handleCardClick = (index) => {
    // On mobile, click toggles the card
    // On desktop, click sets the card to front (replaces previous clicked card)
    if (isMobile) {
      setClickedCardIndex(index === clickedCardIndex ? null : index);
    } else {
      // Desktop: set clicked card (or deselect if clicking the same card)
      setClickedCardIndex(index === clickedCardIndex ? null : index);
    }
  };

  const handleCardHover = (index) => {
    // On desktop, hover brings card to front (but clicked card will still be on top)
    if (!isMobile) {
      setHoveredCardIndex(index);
    }
  };

  const handleCardLeave = () => {
    // On desktop, remove hover state
    if (!isMobile) {
      setHoveredCardIndex(null);
    }
  };

  return (
    <div ref={stackRef} className="stacked-photo-cards" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative', minHeight: `${totalHeight}px`, paddingLeft: `${leftPad}px` }}>
      {allCards.map((card, i) => {
        const isClicked = clickedCardIndex === i;
        const isHovered = hoveredCardIndex === i;
        const baseZIndex = card.side === 'center' ? 10 + i : 5 + i;
        // Priority: clicked > hovered > base
        const zIndex = isClicked ? 1000 : (isHovered ? 1000 : baseZIndex);
        
        // Smooth scale and translateZ for active effect
        // On desktop: clicked card or hovered card
        // On mobile: clicked card only
        const isActive = isClicked || (!isMobile && isHovered);
        const scale = isActive ? 1.05 : 1;
        const translateZ = isActive ? 20 : 0;
        const transform = `rotate(${card.rot}deg) scale(${scale}) translateZ(${translateZ}px)`;
        
        return (
          <div
            className="item stacked-photo-card"
            key={i}
            onClick={() => handleCardClick(i)}
            onMouseEnter={() => handleCardHover(i)}
            onMouseLeave={handleCardLeave}
            style={{
              position: 'absolute',
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,
              top: `${card.top}px`,
              left: `calc(${leftPad}px + ${card.hOffset}px)`,
              transform: transform,
              zIndex: zIndex,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'auto',
              userSelect: 'none',
              cursor: 'pointer',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), z-index 0s',
              willChange: 'transform',
            }}
          >
            <img 
              ref={(el) => {
                if (el) imageRefs.current[i] = el;
              }}
              src={card.src} 
              alt="" 
              onError={(e) => handleImageError(e, card.src, i)}
              onLoad={() => {
                setLoadedImages(prev => new Set([...prev, card.src]));
              }}
              loading="eager"
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                borderRadius: '0.3em', 
                background: '#E3E1AA', 
                pointerEvents: 'none', 
                userSelect: 'none',
                opacity: loadedImages.has(card.src) || loadedImages.has(card.src.replace('.JPG', '.jpg')) ? 1 : 0.7,
                transition: 'opacity 0.3s ease-in-out'
              }} 
            />
          </div>
        );
      })}
    </div>
  );
};

const MainGrid = () => {
  // Refs for all button components that should trigger hover on scroll
  const howItWorksRef = useRef(null);
  const memoryButtonRef = useRef(null);
  const cameraBarButtonRef = useRef(null);
  const instantButtonRef = useRef(null);
  const whyNowButtonRef = useRef(null);
  const nostalgiaPackRef = useRef(null);
  const printPackRef = useRef(null);
  const classicsPackRef = useRef(null);
  const diamondPackRef = useRef(null);
  const photoStackButtonRef = useRef(null);

  // Intersection Observer to add scroll-in-view class when items come into view
  // Only one item at a time will have the hover animation active for 0.5 seconds
  useEffect(() => {
    let observer = null;
    let timeoutId = null;
    let scrollTimeout = null;
    let animationTimeout = null;
    let handleScroll = null;
    let handleResize = null;
    const visibleItems = new Set();

    // Function to find container within an element
    // Handles both regular CSS classes and CSS module classes
    const findContainer = (element) => {
      if (!element) return null;
      
      // Helper to check if an element has a container class
      const hasContainerClass = (el) => {
        if (!el || !el.classList) return false;
        const classList = Array.from(el.classList);
        // Check for exact matches first (regular CSS classes)
        if (classList.some(cls => 
          cls === 'hiw-container' || 
          cls === 'memory-container' || 
          cls === 'camera-bar-container' || 
          cls === 'instant-container' || 
          cls === 'why-now-container' || 
          cls === 'nostpack-container' || 
          cls === 'classics-container' || 
          cls === 'diamond-container'
        )) {
          return true;
        }
        // Check for CSS module classes (contain "container" in the scoped name)
        // CSS modules generate names like "ComponentName_className_hash"
        return classList.some(cls => cls.toLowerCase().includes('container'));
      };
      
      // First, check if the element itself is a container (for direct refs)
      if (hasContainerClass(element)) {
        return element;
      }
      
      // Check first child (most components render their container as the root element)
      // This is the most common case - wrapper div contains component, component's root is the container
      // For CSS modules (NostalgiaPackButton, PrintPackButton2), the container is always the first child
      const firstChild = element.firstElementChild;
      if (firstChild) {
        // Check if first child has container class (works for both regular CSS and CSS modules)
        if (hasContainerClass(firstChild)) {
          return firstChild;
        }
        // Additional explicit check for CSS modules - check all classes
        if (firstChild.classList) {
          const classList = Array.from(firstChild.classList);
          // For CSS modules, any class containing "container" should be the container
          const containerClass = classList.find(cls => cls.toLowerCase().includes('container'));
          if (containerClass) {
            return firstChild;
          }
        }
      }
      
      // Fallback: try to find containers with standard class names via querySelector
      let container = element.querySelector('.hiw-container, .memory-container, .camera-bar-container, .instant-container, .why-now-container, .nostpack-container, .classics-container, .diamond-container');
      
      // If still not found, look for CSS module containers (class names contain "container")
      if (!container) {
        // Check all children recursively for elements with "container" in class name
        // Prioritize direct children first, then go deeper
        const directChildren = Array.from(element.children);
        for (let el of directChildren) {
          if (hasContainerClass(el)) {
            container = el;
            break;
          }
        }
        // If still not found, check all descendants
        if (!container) {
          const allElements = element.querySelectorAll('*');
          for (let el of allElements) {
            if (hasContainerClass(el)) {
              container = el;
              break;
            }
          }
        }
      }
      
      return container;
    };

    // Get all refs - includes all buttons from both columns
    // Column 1: howItWorksRef, cameraBarButtonRef, whyNowButtonRef
    // Column 2: memoryButtonRef (row 1), instantButtonRef (row 2)
    // Full width: nostalgiaPackRef, printPackRef, classicsPackRef, diamondPackRef
    // Photo stack button: photoStackButtonRef
    const getAllRefs = () => [
      howItWorksRef,
      memoryButtonRef,      // Column 2, Row 1
      cameraBarButtonRef,
      instantButtonRef,     // Column 2, Row 2
      whyNowButtonRef,
      nostalgiaPackRef,
      printPackRef,
      classicsPackRef,
      diamondPackRef,
      photoStackButtonRef  // Photo stack button
    ];

    // Function to determine which item should be active (closest to viewport center)
    const updateActiveItem = () => {
      // Clear any existing animation timeout
      if (animationTimeout) {
        clearTimeout(animationTimeout);
        animationTimeout = null;
      }

      const viewportCenter = window.innerHeight / 2;
      let closestItem = null;
      let closestDistance = Infinity;

      // Find the item closest to the center of the viewport
      // Also check all refs directly to ensure we don't miss any items
      const allRefElements = getAllRefs()
        .map(ref => ref.current)
        .filter(el => el !== null);
      
      // Combine visibleItems from observer with all ref elements
      const itemsToCheck = new Set([...visibleItems, ...allRefElements]);
      
      itemsToCheck.forEach((element) => {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - viewportCenter);

        // Only consider items that are actually visible in viewport
        // Check if element is in viewport (with some margin)
        const isInViewport = rect.bottom > -50 && rect.top < window.innerHeight + 50;
        if (isInViewport && distance < closestDistance) {
          closestDistance = distance;
          closestItem = element;
        }
      });

      // Remove scroll-in-view from all items first
      getAllRefs().forEach((ref) => {
        if (ref.current) {
          const container = findContainer(ref.current);
          if (container) {
            container.classList.remove('scroll-in-view');
          }
        }
      });

      // Add scroll-in-view to the closest item
      if (closestItem) {
        let container = findContainer(closestItem);
        
        // If container not found, check if it's an order-button wrapper
        if (!container) {
          // Check if the element itself is an order-button wrapper
          if (closestItem.classList && (
            closestItem.classList.contains('order-btn-photo-stack') || 
            closestItem.classList.contains('order-btn-desktop')
          )) {
            container = closestItem;
          } else {
            // Check for order-button inside
            const orderButton = closestItem.querySelector('.order-button');
            if (orderButton) {
              // Add scroll-in-view to the wrapper div, not the button itself
              container = closestItem;
            } else {
              // Try direct first child check (for CSS modules)
              const firstChild = closestItem.firstElementChild;
              if (firstChild && firstChild.classList) {
                const classArray = Array.from(firstChild.classList);
                // Check if first child has any class containing "container" (case-insensitive)
                const hasContainer = classArray.some(cls => 
                  cls.toLowerCase().includes('container')
                );
                if (hasContainer) {
                  container = firstChild;
                }
              }
            }
          }
        }
        
        if (container) {
          // Ensure the scroll-in-view class is added
          container.classList.add('scroll-in-view');
          
          // Remove the class after 0.5 seconds
          animationTimeout = setTimeout(() => {
            if (container) {
              container.classList.remove('scroll-in-view');
            }
          }, 500);
        }
      }
    };

    // Wait for components to render before setting up observer
    timeoutId = setTimeout(() => {
      const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px', // Trigger earlier (when 20% from top/bottom of viewport)
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] // Multiple thresholds for better tracking
      };

      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleItems.add(entry.target);
          } else {
            visibleItems.delete(entry.target);
          }
        });
        updateActiveItem();
      };

      observer = new IntersectionObserver(observerCallback, observerOptions);

      // Observe all button wrapper divs
      getAllRefs().forEach((ref) => {
        if (ref.current) {
          observer.observe(ref.current);
        }
      });

      // Add scroll listener to continuously update active item
      handleScroll = () => {
        if (scrollTimeout) return;
        scrollTimeout = requestAnimationFrame(() => {
          updateActiveItem();
          scrollTimeout = null;
        });
      };

      handleResize = () => {
        updateActiveItem();
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize, { passive: true });

      // Initial update
      updateActiveItem();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }
      if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
      }
      if (handleScroll) {
        window.removeEventListener('scroll', handleScroll);
      }
      if (handleResize) {
        window.removeEventListener('resize', handleResize);
      }
      if (observer) {
        getAllRefs().forEach((ref) => {
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        });
      }
    };
  }, []);

  return (
    <div className="main-grid" style={{ position: 'relative' }}>
      {/* OPEN-ME SVG, top right corner, desktop only */}
      <div className="open-me-top-right">
        <img src="/assets/OPEN-ME2.svg" alt="Open me" style={{ width: '120px', height: 'auto' }} />
      </div>
      {/* Small buttons, two per row */}
      <div className="small-buttons-row">
        <div id="how-it-works" ref={howItWorksRef}><HowItWorksButton /></div>
        <div ref={memoryButtonRef}><TheMemoryButton /></div>
      </div>
      <div className="small-buttons-row">
        <div ref={cameraBarButtonRef}><TheCameraBarButton /></div>
        <div ref={instantButtonRef}><TheInstantButton /></div>
        <div ref={whyNowButtonRef}><WhyNowButton /></div>
        {/* <TheMemoryButton /> */}
      </div>
      <div className="small-buttons-row">{/* <WhyNowButton /> */}</div>
      <div id="print-package"></div>
      {/* Pack buttons, one per row */}
      <div className="pack-button-row" ref={nostalgiaPackRef}><NostalgiaPackButton /></div>
      <div className="pack-button-row" ref={printPackRef}><PrintPackButton2 /></div>
      <div className="pack-button-row" ref={classicsPackRef}><ClassicsPackButton /></div>
      {/* <div className="pack-button-row"><PremierePackButton /></div> */}
      <div className="pack-button-row" ref={diamondPackRef}><DiamondPackButton /></div>
      {/* Testimonials: small and med two per row, big spans two columns */}
      <div className="testimonial-row">
        <div id="testimonials"><TestimonialSmall /></div>
        <TestimonialMed />
      </div>
      <div className="testimonial-big-row"><TestimonialBig /></div>
      <div className="testimonial-big-row"><TestimonialBig videoSrc="/assets/The Cousins_1.mp4" /></div>
      {/* IMAGINE-THIS SVG overlayed at the start of the photo cards stack */}
      {/* Photo stack in its own left column cell */}
      <div className="photo-stack-col" style={{ gridColumn: 1, position: 'relative' }}>
        <div className="imagine-this-overlay">
          <img src="/assets/IMAGINE-THIS.svg" alt="Imagine this" style={{ width: '120px', height: 'auto' }} />
        </div>
        <div style={{ position: 'relative' }}>
          <StackedPhotoCards />
          {/* GET CAMERAS button at the bottom of the photo stack, overlapping last photo */}
          <div className="order-btn-photo-stack" ref={photoStackButtonRef} style={{ position: 'absolute', left: '50%', bottom: '-30px', transform: 'translateX(-50%) rotate(3deg)', zIndex: 10000, width: 'max-content', pointerEvents: 'auto' }}>
            <PopupButton
              id="yyPNXkPK"
              className="order-button"
              size={80}
              style={{ width: '100%', zIndex: 10000, position: 'relative', pointerEvents: 'auto', whiteSpace: 'nowrap', fontSize: '2.2rem' }}
            >
              GET CAMERAS!
            </PopupButton>
          </div>
        </div>
      </div>
      {/* About card, full width */}
      {/* <div className="about-row" id="about-card"><AboutCard /></div> */}
      <style jsx>{`
        .open-me-top-right {
          position: absolute;
          top: 0;
          right: -200px;
          z-index: 200;
          display: block;
        }

        .imagine-this-overlay {
          position: absolute;
          top: 0;
          right: -200px;
          z-index: 10000;
          display: block;
        }
          
        @media (max-width: 900px) {
          .open-me-top-right {
            left: 50%;
            right: 150px;
            transform: translateX(-50%);
            top: 0;
            z-index: 200;
          }
             .imagine-this-overlay {
            top: 0;
            right: -200px;
            left: auto;
            transform: none;
            z-index: 10000;
          }
          .order-btn-photo-stack {
            left: 50% !important;
            right: auto !important;
            transform: translateX(-50%) rotate(3deg) !important;
            width: max-content !important;
            margin: 2rem 0 0 0 !important;
            z-index: 10000 !important;
          }
          

        }

        
        @media (max-width: 450px) {
          .open-me-top-right {
            left: auto;
            right: 10px;
            top: 80px;
            transform: none;
            z-index: 200;
          }
          .imagine-this-overlay {
            left: 50%;
            right: 100px;
            transform: translateX(120px);
            top: 0;
            z-index: 200;
          }
        }
      `}</style>
    </div>
  );
};

export default MainGrid;
