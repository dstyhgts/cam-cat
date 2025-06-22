"use client";
import { useEffect, useRef } from "react";
import Script from "next/script";
import { useTheme } from "./ThemeProvider";
import { PopupButton } from '@typeform/embed-react';

export default function Footer() {
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const scheduleRef = useRef(); // Add ref for schedule consultation
  const quoteRef = useRef(); // Add ref for get quote
  const touchRef = useRef(); // Add ref for get in touch

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
          if (isMobile) {
            // Default gravity for mobile if no gyro
            engine.world.gravity.x = 0;
            engine.world.gravity.y = 1;
          } else {
            engine.world.gravity.x = 0;
            engine.world.gravity.y = 0;
          }
          addBoundaries();

          // Create items (4 on mobile, 10 on desktop)
          const numItems = isMobile ? 2 : 10;
          for (let i = 0; i < numItems; i++) {
            let x = p.random(100, p.width - 100);
            let y = p.random(100, p.height - 100);
            items.push(new Item(x, y, `/assets/img${i + 1}.jpg`));
          }
          // Gyro support for mobile
          if (isMobile && window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", handleGyroGravity, true);
          }
          // Touch/toss support for mobile
          if (isMobile) {
            p.canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
            p.canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
            p.canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
          }
        };

        function handleGyroGravity(event) {
          // event.beta (x axis: front-back tilt), event.gamma (y axis: left-right tilt)
          // Normalize to [-1, 1] range for -45 to 45 deg
          if (engine && engine.world && engine.world.gravity) {
            engine.world.gravity.x = (event.gamma || 0) / 45; // [-1, 1]
            engine.world.gravity.y = -1 * ((event.beta || 0) / 45);  // Invert: [-1, 1] -> [1, -1]
          }
        }

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

            this.body = Bodies.rectangle(x, y, 100, 200, options);
            World.add(engine.world, this.body);

            this.div = document.createElement("div");
            this.div.className = "item";
            this.div.style.left = `${this.body.position.x - 50}px`;
            this.div.style.top = `${this.body.position.y - 100}px`;

            const img = document.createElement("img");
            img.src = imagePath;
            this.div.appendChild(img);

            containerRef.current.appendChild(this.div);
          }

          update() {
            this.div.style.left = `${this.body.position.x - 50}px`;
            this.div.style.top = `${this.body.position.y - 100}px`;
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

        function getTouchItem(x, y) {
          // Find the topmost item under the touch point
          for (let i = items.length - 1; i >= 0; i--) {
            const item = items[i];
            const bx = item.body.position.x;
            const by = item.body.position.y;
            if (p.dist(x, y, bx, by) < 100) return item;
          }
          return null;
        }

        function handleTouchStart(e) {
          if (e.touches.length !== 1) return;
          const touch = e.touches[0];
          const x = touch.clientX;
          const y = touch.clientY;
          draggingItem = getTouchItem(x, y);
          if (draggingItem) {
            dragOffset.x = draggingItem.body.position.x - x;
            dragOffset.y = draggingItem.body.position.y - y;
            lastTouch = { x, y, t: Date.now() };
            lastVelocity = { x: 0, y: 0 };
            e.preventDefault();
          }
        }

        function handleTouchMove(e) {
          if (!draggingItem || e.touches.length !== 1) return;
          const touch = e.touches[0];
          const x = touch.clientX;
          const y = touch.clientY;
          // Move the card with the finger
          Matter.Body.setPosition(draggingItem.body, {
            x: x + dragOffset.x,
            y: y + dragOffset.y,
          });
          // Calculate velocity for toss
          const now = Date.now();
          const dt = (now - lastTouch.t) / 1000;
          if (dt > 0) {
            lastVelocity.x = (x - lastTouch.x) / dt;
            lastVelocity.y = (y - lastTouch.y) / dt;
          }
          lastTouch = { x, y, t: now };
          e.preventDefault();
        }

        function handleTouchEnd(e) {
          if (draggingItem) {
            // Apply toss velocity
            Matter.Body.setVelocity(draggingItem.body, {
              x: lastVelocity.x * 0.02,
              y: lastVelocity.y * 0.02,
            });
            draggingItem = null;
            e.preventDefault();
          }
        }

        // Clean up gyro event and touch events on unmount
        p.remove = function () {
          if (window.DeviceOrientationEvent) {
            window.removeEventListener("deviceorientation", handleGyroGravity, true);
          }
          if (isMobile && p.canvas) {
            p.canvas.removeEventListener('touchstart', handleTouchStart);
            p.canvas.removeEventListener('touchmove', handleTouchMove);
            p.canvas.removeEventListener('touchend', handleTouchEnd);
          }
        };
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
          background: "#b94239",
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
            style={{ color: theme === "dark" ? "#fff" : "#000" }}
          >
            CAM-CAT
          </div>
          <div className="footer-links-row">
            <div className="footer-links-col">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ color: theme === "dark" ? "#fff" : "#000" }}>INSTAGRAM</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ color: theme === "dark" ? "#fff" : "#000" }}>FACEBOOK</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ color: theme === "dark" ? "#fff" : "#000" }}>YOUTUBE</a>
              <a href="https://yelp.com" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ color: theme === "dark" ? "#fff" : "#000" }}>YELP</a>
            </div>
            <div className="footer-links-col">
              <a href="/quote" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ color: theme === "dark" ? "#fff" : "#000" }}>GET QUOTE</a>
              <a href="/contact" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ color: theme === "dark" ? "#fff" : "#000" }}>GET IN TOUCH</a>
              <a href="/welcomepacket" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ color: theme === "dark" ? "#fff" : "#000" }}>GET WELCOME PACKET</a>
              <a href="/schedule" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ color: theme === "dark" ? "#fff" : "#000" }}>SCHEDULE CONSULTATION</a>
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
        a.footer-link {
          font-size: 67.77px;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 0.03em;
          line-height: 1;
          transition: color 0.2s;
          pointer-events: auto;
          margin: 0;
        }
        a.footer-link:hover {
          color: #ffd700 !important;
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
          a.footer-link {
            font-size: 38.12px !important;
            text-align: left;
            width: 100%;
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
        @media (max-width: 900px) {
          .footer-card-container {
            min-height: 150vh;
          }
        }
      `}</style>
    </>
  );
}
