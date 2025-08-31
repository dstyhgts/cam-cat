"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useTheme } from "../Components2/ThemeProvider";
import { PopupButton } from '@typeform/embed-react';

export default function Footer() {
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const scheduleRef = useRef(); // Add ref for schedule consultation
  const quoteRef = useRef(); // Add ref for get quote
  const touchRef = useRef(); // Add ref for get in touch
  const [quoteHover, setQuoteHover] = useState(false);
  const [touchHover, setTouchHover] = useState(false);
  const [scheduleHover, setScheduleHover] = useState(false);

  // Footer link style for inline use
  const footerLinkStyle = {
    fontSize: "109.66px",
    fontWeight: 700,
    color: "#fff",
    textDecoration: "none",
    letterSpacing: "0.03em",
    lineHeight: 1,
    transition: "color 0.2s",
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.p5 && window.Matter) {
      const sketch = (p) => {
        const { Engine, World, Bodies, Body } = window.Matter;
        let engine;
        let items = [];
        let lastMouseX = -1;
        let lastMouseY = -1;
        let gyroForce = { x: 0, y: 0 };
        // Touch drag/toss state
        let draggingItem = null;
        let dragOffset = { x: 0, y: 0 };
        let lastTouch = { x: 0, y: 0, t: 0 };
        let lastVelocity = { x: 0, y: 0 };

        p.setup = function () {
          p.createCanvas(p.windowWidth, p.windowHeight);
          engine = Engine.create();
          const isMobile = window.innerWidth < 900;
          engine.world.gravity.x = 0;
          engine.world.gravity.y = 0;
          addBoundaries();

          // Create items (4 on mobile, 10 on desktop)
          const numItems = isMobile ? 4 : 10;
          
          // Use a curated list of images that we know exist
          const availableImages = [
            '/assets/img1.JPG', '/assets/img2.JPG', '/assets/img3.JPG', '/assets/img4.JPG', '/assets/img5.JPG',
            '/assets/img6.JPG', '/assets/img7.JPG', '/assets/img8.JPG', '/assets/img9.JPG', '/assets/img10.JPG',
            '/assets/img11.JPG', '/assets/img12.JPG', '/assets/img13.JPG', '/assets/img14.JPG', '/assets/img15.JPG',
            '/assets/img16.JPG', '/assets/img17.JPG', '/assets/img18.JPG', '/assets/img19.JPG', '/assets/img20.JPG',
            '/assets/img21.JPG', '/assets/img22.JPG', '/assets/img23.JPG', '/assets/img24.JPG', '/assets/img25.JPG',
            '/assets/img26.JPG', '/assets/img27.JPG', '/assets/img28.JPG', '/assets/img29.JPG', '/assets/img30.JPG',
            '/assets/img31.JPG', '/assets/img32.JPG', '/assets/img33.JPG', '/assets/img34.JPG', '/assets/img35.JPG',
            '/assets/img36.JPG', '/assets/img37.JPG', '/assets/img38.JPG', '/assets/img39.JPG', '/assets/img40.JPG',
            '/assets/img41.JPG', '/assets/img42.JPG', '/assets/img43.JPG', '/assets/img44.JPG', '/assets/img45.JPG',
            '/assets/img46.JPG', '/assets/img47.JPG', '/assets/img48.JPG', '/assets/img49.JPG', '/assets/img50.JPG',
            '/assets/img51.JPG', '/assets/img52.JPG', '/assets/img53.JPG', '/assets/img54.JPG', '/assets/img55.JPG',
            '/assets/img56.JPG', '/assets/img57.JPG', '/assets/img58.JPG'
          ];
          
          for (let i = 0; i < numItems; i++) {
            let x = p.random(100, p.width - 100);
            let y = p.random(100, p.height - 100);
            // Pick a random image from the available list
            const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];
            items.push(new Item(x, y, randomImage));
          }
        };

        function addBoundaries() {
          const thickness = 50;
          World.add(engine.world, [
            Bodies.rectangle(p.width / 2, -thickness / 2, p.width, thickness, { isStatic: true }),
            Bodies.rectangle(p.width / 2, p.height + thickness / 2, p.width, thickness, { isStatic: true }),
            Bodies.rectangle(-thickness / 2, p.height / 2, thickness, p.height, { isStatic: true }),
            Bodies.rectangle(p.width + thickness / 2, p.height / 2, thickness, p.height, { isStatic: true }),
          ]);
        }

        p.draw = function () {
          // Clear the canvas to transparent
          p.clear();

          Engine.update(engine);
          items.forEach((item) => item.update());
        };

        class Item {
          constructor(x, y, imagePath) {
            let options = {
              frictionAir: 0.075,
              restitution: 0.25,
              density: 0.002,
              angle: Math.random() * Math.PI * 2,
            };

            // Match global `.item` card dimensions (see globals.css)
            const ITEM_WIDTH = 200;
            const ITEM_HEIGHT = 225;

            this.body = Bodies.rectangle(x, y, ITEM_WIDTH, ITEM_HEIGHT, options);
            World.add(engine.world, this.body);

            this.div = document.createElement("div");
            this.div.className = "item footer-card"; // ensure footer cards get standardized styling
            this.div.style.position = "absolute";
            this.div.style.left = `${this.body.position.x - ITEM_WIDTH / 2}px`;
            this.div.style.top = `${this.body.position.y - ITEM_HEIGHT / 2}px`;
            this.div.style.zIndex = "1";

            const img = document.createElement("img");
            img.src = imagePath;
            img.alt = `Footer Image ${imagePath.split('/').pop()}`;
            // Add error handling for missing images
            img.onerror = () => {
              console.warn(`Failed to load image: ${imagePath}`);
              // Optionally hide the card or show a placeholder
              this.div.style.display = 'none';
            };
            this.div.appendChild(img);

            containerRef.current.appendChild(this.div);
          }

          update() {
            const ITEM_WIDTH = 200;
            const ITEM_HEIGHT = 225;
            this.div.style.left = `${this.body.position.x - ITEM_WIDTH / 2}px`;
            this.div.style.top = `${this.body.position.y - ITEM_HEIGHT / 2}px`;
            this.div.style.transform = `rotate(${this.body.angle}rad)`;
          }
        }

        p.mouseMoved = function () {
          if (p.dist(p.mouseX, p.mouseY, lastMouseX, lastMouseY) > 10) {
            lastMouseX = p.mouseX;
            lastMouseY = p.mouseY;
            items.forEach((item) => {
              if (p.dist(p.mouseX, p.mouseY, item.body.position.x, item.body.position.y) < 150) {
                let forceMagnitude = 3;
                Body.applyForce(
                  item.body,
                  { x: item.body.position.x, y: item.body.position.y },
                  { x: p.random(-forceMagnitude, forceMagnitude), y: p.random(-forceMagnitude, forceMagnitude) }
                );
              }
            });
          }
        };

        p.windowResized = function () {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
        };

        // Clean up (no mobile-specific events)
        p.remove = function () {};
      };

      new window.p5(sketch, containerRef.current);
      // Clean up p5 and gyro event on unmount
      return () => {
        if (window.p5 && containerRef.current && containerRef.current.children.length > 0) {
          // Remove the p5 instance
          const p5Instance = containerRef.current.children[0].__p5instance;
          if (p5Instance && p5Instance.remove) p5Instance.remove();
        }
      };
    }
  }, []);

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js" strategy="beforeInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.14.2/matter.min.js" strategy="beforeInteractive" />

      <div
        ref={containerRef}
        className="footer-card-container"
        style={{
          position: "relative",
          top: 0,
          left: 0,
          width: "50vw",
          height: "0vh",
          overflow: "visible",
          background: "var(--footer-bg)",
          zIndex: 2,
          pointerEvents: "none",
          opacity: 1,
        }}
      >
      </div>
      {/* Footer Content is now below the interactive cards in the DOM and visually */}
      <footer className="footer-outer">
        <div className="footer-content">
          <div
            className="footer-center-text"
            style={{ color: "var(--text-secondary)" }}
          >
            CAM-CAT
          </div>
          <div className="footer-links-row">
            <div className="footer-links-col">
            <div style={{width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
              <PopupButton
                id="atnpwpHn"
                className="footer-link"
                size={80}
                style={{ color: "var(--text-secondary)" }}
              >
                GET QUOTE
              </PopupButton>
            </div>
            <div style={{width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
              <PopupButton
                id="yyPNXkPK"
                className="footer-link"
                size={80}
                style={{ color: "var(--text-secondary)" }}
              >
                GET IN TOUCH
              </PopupButton>
            </div>
            <a target="_blank" rel="noopener noreferrer" className="footer-link welcome-packet-link" style={{ color: "var(--text-secondary)" }}>
              <span className="welcome-packet-main">GET WELCOME PACKET</span>
              <span className="coming-soon">(COMING SOON)</span>
            </a>
            <div style={{width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
              <PopupButton
                id="wwvkhbUP"
                className="footer-link"
                size={80}
                style={{ color: "var(--text-secondary)" }}
              >
                SCHEDULE CONSULTATION
              </PopupButton>
            </div>
          </div>
          <div className="footer-links-col">
          {/* <br />          <br />
          <a  target="_blank" rel="noopener noreferrer" className="footer-link" style={{ color: theme === "dark" ? "#fff" : "#000" }}>REACH US: </a>
          <br /> */}
            <a href="https://instagram.com/camera.catering" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ color: "var(--text-secondary)" }}>INSTAGRAM</a>
            <a href="tel:8056783444" target="_blank" rel="noopener noreferrer" className="footer-link footer-contact" style={{ color: "var(--text-secondary)" }}>(805)678-3444</a>
            <a href="mailto:info@cameracatering.com?subject=Interested%20in%20Camera%20Catering!" target="_blank" rel="noopener noreferrer" className="footer-link footer-contact" style={{ color: "var(--text-secondary)" }}>info@camera<br/>catering.com</a><br />
            {/* <a href="https://yelp.com" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ color: theme === "dark" ? "#fff" : "#000" }}>YELP</a> */}
          </div>
          </div>
        </div>
      </footer>
      <style jsx>{`
        .footer-outer {
          width: 100vw;
          min-height: 40vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 0;
          background: transparent;
          margin-top: 0;
        }
        .footer-content {
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          position: relative;
          z-index: 0;
          pointer-events: auto;
          height: 100%;
          min-height: 0;
          padding-top: 12vh;
          padding-bottom: 6vh;
          margin-top: 32px;
          padding-left: 50px;
          box-sizing: border-box;
        }
        .footer-links-row {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 6vw;
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          pointer-events: auto;
        }
        .footer-links-col.single {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2vh;
          pointer-events: auto;
          width: auto;
        }
        .footer-links-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5vh;
          text-align: left;
          width: auto;
        }
        a.footer-link,
        .footer-link {
          font-size: 67.77px;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 0.03em;
          line-height: 1;
          transition: color 0.2s;
          pointer-events: auto;
          margin: 0;
          text-align: left;
          width: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          color: var(--text-secondary);
        }
        a.footer-link:hover,
        .footer-link:hover {
          color: #ffd700 !important;
        }
        
        /* Ensure PopupButton components use the correct theme color */
        .footer-link[data-tf-popup] {
          color: var(--text-secondary) !important;
        }
        @media (max-width: 900px) {
          .footer-links-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5vh;
          }
          .footer-links-col {
            align-items: flex-start;
            width: 100%;
          }
          .footer-content {
            padding-left: 10px;
            min-height: 0;
          }
          .footer-center-text {
            font-size: 166.34px !important;
            text-align: left;
            line-height: 0.85 !important;
            letter-spacing: 0.01em !important;
            margin-bottom: 0 !important;
          }
          a.footer-link,
          .footer-link {
            font-size: 38.12px !important;
            text-align: left;
            width: 100%;
            justify-content: flex-start;
          }
          .item {
            opacity: 0.3 !important;
          }
          .footer-card-container {
            z-index: 0 !important;
          }
          .footer-content {
            z-index: 1 !important;
            position: relative;
          }
        }
        .footer-center-text {
          font-weight: 900;
          font-size: 221.78px;
          letter-spacing: 0.05em;
          color: #fff;
          text-align: left;
          line-height: 1;
          margin-bottom: 0.5vh;
          width: 100vw;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
        }
        .footer-card-container {
          min-height: 0;
        }
        @media (max-width: 375px) {
          .footer-card-container {
            min-height: 150vh;
          }
        }
        .welcome-packet-link {
          display: inline-block !important;
          line-height: 1.05;
        }
        .welcome-packet-main {
          display: block;
        }
        .welcome-packet-link .coming-soon {
          display: none;
          font-size: 12px;
          margin-left: 0;
          white-space: nowrap;
          line-height: 1.05;
        }
        .welcome-packet-link:hover .coming-soon {
          display: block;
        }
        .footer-contact {
          /* No change for mobile, inherits default size */
        }
        @media (min-width: 901px) {
          .footer-contact {
            font-size: 57.6px !important; /* 15% smaller than 67.77px */
          }
        }
      `}</style>
    </>
  );
}