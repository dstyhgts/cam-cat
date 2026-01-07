"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import Script from "next/script";
import { PopupButton } from '@typeform/embed-react';
import { useTheme } from "../Components2/ThemeProvider";

export default function Sidebar() {
  useEffect(() => {
    // Select the sidebar and overlay toggle so we can exclude them from the blur
    const sidebar = document.querySelector(".sidebar");
    const overlayToggle = document.querySelector(".overlay-toggle");
    // Underlying elements: all direct children of body except the sidebar and overlay toggle.
    const underlyingElements = document.querySelectorAll(
      "body > *:not(.sidebar):not(.overlay-toggle)"
    );
    const cards = gsap.utils.toArray(".card");

    function animateCardsIn() {
      const isMobile = window.innerWidth < 768;
      const overlayOffscreen = isMobile ? `-${window.innerWidth}px` : "-500px";
      gsap.to(overlayToggle, {
        right: overlayOffscreen,
        duration: 1,
        ease: "power4.out",
      });
      gsap.to(
        cards,
        {
          right: "0%",
          stagger: 0.075,
          duration: 1,
          ease: "power4.out",
        },
        "<"
      );
      // Blur all underlying elements
      gsap.to(underlyingElements, {
        filter: "blur(8px)",
        duration: 1,
        immediateRender: false,
      });
    }

    function animateCardsOut() {
      gsap.to(overlayToggle, {
        right: "0px",
        duration: 1,
        ease: "power4.out",
      });
      gsap.to(cards, {
        right: "-110%",
        stagger: 0.075,
        duration: 1,
        ease: "power4.out",
      });
      // Remove the blur from underlying elements
      gsap.to(underlyingElements, {
        filter: "blur(0px)",
        duration: 1,
        immediateRender: false,
      });
    }

    overlayToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      sidebar.style.pointerEvents = "all";
      animateCardsIn();
    });

    function handleClickOutside(e) {
      if (
        sidebar &&
        sidebar.style.pointerEvents === "all" &&
        !sidebar.contains(e.target)
      ) {
        animateCardsOut();
        sidebar.style.pointerEvents = "none";
      }
    }
    document.addEventListener("click", handleClickOutside);

    // Expose animateCardsOut and sidebar for use in event handlers
    window.__sidebar_animateCardsOut = animateCardsOut;
    window.__sidebar_ref = sidebar;

    return () => {
      document.removeEventListener("click", handleClickOutside);
      delete window.__sidebar_animateCardsOut;
      delete window.__sidebar_ref;
    };
  }, []);

  const popupBtnRef = useRef(null);
  const { theme } = useTheme();
  const [closeHover, setCloseHover] = useState(false);

  function handleGetQuoteCardClick() {
    if (window.__sidebar_animateCardsOut && window.__sidebar_ref) {
      window.__sidebar_animateCardsOut();
      window.__sidebar_ref.style.pointerEvents = "none";
    }
  }

  function handleGetInTouchCardClick() {
    if (window.__sidebar_animateCardsOut && window.__sidebar_ref) {
      window.__sidebar_animateCardsOut();
      window.__sidebar_ref.style.pointerEvents = "none";
    }
  }

  return (
    <>
      <Script
        src="https://unpkg.com/@phosphor-icons/web"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        strategy="beforeInteractive"
      />

      {/* Overlay toggle and sidebar cards */}
      <div className="overlay-toggle preload">
        <p>Ready for The Next Steps?</p>
        <p>
          <i className="ph ph-arrow-right"></i>
        </p>
      </div>
      <div className="sidebar preload">
        <div className="card" style={{ position: 'relative' }} onClick={handleGetQuoteCardClick}>
          {/* Overlayed PopupButton covers the card, but card structure is unchanged */}
          <PopupButton
            id="atnpwpHn"
            className="get-quote-popup-btn-overlay"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
              zIndex: 2,
              cursor: 'pointer',
              border: 'none',
              background: 'none',
              padding: 0,
              margin: 0,
            }}
            size={80}
            onClick={handleGetQuoteCardClick}
          >
            Get Quote
          </PopupButton>
          <div className="card-title" style={{ position: 'relative' }}>
            <Link href="/projects">Get Quote</Link>
            <div
              className="close-btn-hitbox"
              onClick={e => {
                e.stopPropagation();
                if (window.__sidebar_animateCardsOut && window.__sidebar_ref) {
                  window.__sidebar_animateCardsOut();
                  window.__sidebar_ref.style.pointerEvents = 'none';
                }
              }}
              onMouseEnter={() => setCloseHover(true)}
              onMouseLeave={() => setCloseHover(false)}
              style={{
                position: 'absolute',
                top: '-16px',
                right: '-16px',
                width: '60px',
                height: '60px',
                zIndex: 10,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                borderRadius: '50%',
              }}
            >
              <div
                className="close-btn"
                style={{
                  fontSize: '60px',
                  color: closeHover
                    ? (theme === 'dark' ? '#000' : '#fff')
                    : (theme === 'dark' ? '#fff' : '#000'),
                  pointerEvents: 'none',
                  transition: 'color 0.2s',
                }}
              >
                <i className="ph-thin ph-x"></i>
              </div>
            </div>
          </div>
          <div className="card-copy">
            <p>Quick, Easy, and Free - we give you a tenative quote based off of
              details such as guest count, event-type, and age-group.
            </p>
          </div>
        </div>
        <div className="card" style={{ position: 'relative' }} onClick={handleGetInTouchCardClick}>
          {/* Overlayed PopupButton covers the card, but card structure is unchanged */}
          <PopupButton
            id="yyPNXkPK"
            className="get-in-touch-popup-btn-overlay"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
              zIndex: 2,
              cursor: 'pointer',
              border: 'none',
              background: 'none',
              padding: 0,
              margin: 0,
            }}
            size={80}
            onClick={handleGetInTouchCardClick}
          >
            Get In Touch
          </PopupButton>
          <div className="card-title">
            <Link href="/about">Get In Touch</Link>
          </div>
          <div className="card-copy">
            <p>Reach us at:<br/>(805)678-3444<br/>info@cameracatering.com<br/>Or click to have us reach out to you!</p>
          </div>
        </div>
        <div className="card">
          <div className="card-title">
            <Link href="/contact">Welcome Packet</Link>
          </div>
          <div className="card-copy">
            <p>Coming Soon for a Client Near You.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Base styling */
        .overlay-toggle {
          position: fixed;
          border: 2px solid #FFFFFF;
          right: 0;
          bottom: 0;
          width: 250px;
          height: 150px;
          margin: 0.75em;
          padding: 1em;
          border-radius: 0.5em;
          background: #FFD85D;
          display: flex;
          justify-content: space-between;
          cursor: pointer;
          z-index: 10000000;
          opacity: 1; /* start hidden */
          transition: background 0.3s, color 0.3s;
        }
        .overlay-toggle:hover {
          background: #8c84ff;
          color: #fff;
        }
        .sidebar {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 30vw;
          padding: 0.75em;
          display: flex;
          flex-direction: column;
          gap: 0.75em;
          overflow: hidden;
          pointer-events: none;
          z-index: 100000;
          opacity: 1; /* start hidden */
        }
        .card {
          position: relative;
          right: -110%;
          padding: 1em;
          flex: 1;
          background: #8c84ff;
          color: #fff;
          border-radius: 0.5em;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
          overflow: hidden;
          transition: background 0.3s, color 0.3s;
        }
        .card:nth-child(1) .card-title {
          display: flex;
          justify-content: space-between;
          position: relative;
        }
        .close-btn {
          position: absolute;
          top: 0.2em;
          right: 0.2em;
          font-size: 60px;
          color: #fff;
          transition: color 0.3s;
        }
        .card:hover .close-btn {
          color: #000;
        }
        .card-title {
          font-size: 67.77px;
          letter-spacing: -0.035em;
          opacity: 1;
        }
        .card-copy {
          opacity: .6;
          transform: translateY(20px);
          font-size: 15px;
          transition: transform 0.3s, opacity 0.3s;
        }
        .card:hover {
          background:rgb(117, 202, 233);
          color: #000;
        }
        .card:hover .card-copy {
          opacity: 1;
          transform: translateY(0px);
        }

        /* Mobile responsive adjustments */
        @media (max-width: 1000px) {
          .sidebar {
            width: 70vw;
            padding: 0.5em;
          }
          .overlay-toggle {
            width: auto;
            min-width: fit-content;
            max-width: 70vw;
            height: auto;
            margin: 1em;
            padding: 0.75em;
          }
          .card {
            padding: 0.75em;
          }
          .card-title {
            font-size: 67.77px;
            line-height: .7em;
            padding-top: .4em;
          }
          .close-btn {
            font-size: 30px;
          }
          .card-copy {
            font-size: 12px;
          }
        }
        @media (max-width: 900px) {
          .card {
            min-height: unset;
            height: auto;
            padding: 0.5em;
          }
          .card-copy {
            font-size: 11px;
            word-break: break-word;
            padding-bottom: 2em;

          }
        }
        @media (max-width: 600px) {
        .card-title {
            font-size: 67.77px;
            line-height: .8em;
            padding-top: .4em;
          }
          .card-copy {
            font-size: 10px;
            line-height: .8em;
            
          }
        }
      `}</style>
    </>
  );
}
