"use client";
import { useEffect, useRef } from "react";
import Script from "next/script";

export default function Footer() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.p5 && window.Matter) {
      const sketch = (p) => {
        const { Engine, World, Bodies, Body } = window.Matter;
        let engine;
        let items = [];
        let lastMouseX = -1;
        let lastMouseY = -1;

        p.setup = function () {
          p.createCanvas(p.windowWidth, p.windowHeight);
          engine = Engine.create();
          engine.world.gravity.y = 0;
          addBoundaries();

          // Create items
          for (let i = 0; i < 10; i++) {
            let x = p.random(100, p.width - 100);
            let y = p.random(100, p.height - 100);
            items.push(new Item(x, y, `/assets/img${i + 1}.jpg`));
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
      };

      new window.p5(sketch, containerRef.current);
    }
  }, []);

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js" strategy="beforeInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.14.2/matter.min.js" strategy="beforeInteractive" />

      <div
        ref={containerRef}
        style={{
          // position: "absolute",
          position: "relative",
          top: 0,
          left: 0,
          width: "50vw",
          height: "0vh",  // Full viewport height
          overflow: "visible",
          background: "#b94239",
          zIndex: 0,  // Move off-screen
          opacity: 1,  // Initially hidden for animation
        }}
      >
      </div>
    </>
  );
}
