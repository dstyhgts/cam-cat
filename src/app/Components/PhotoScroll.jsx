"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./PhotoScroll.css"; // Ensure the path is correct

gsap.registerPlugin(ScrollTrigger);

export default function PhotoScroll() {
  useEffect(() => {
    // Create a matchMedia instance
    let mm = gsap.matchMedia();

    // Desktop animations (min-width: 901px)
    mm.add("(min-width: 901px)", () => {
      // Original transform values for each row (3 rows = 6 cards)
      const leftXValues = [-800, -900, -400];
      const rightXValues = [800, 900, 400];
      const leftRotationValues = [-30, -20, -35];
      const rightRotationValues = [30, 20, 35];
      const yValues = [100, -150, -400];

      // For each row, create a ScrollTrigger that drives the transforms
      gsap.utils.toArray(".ps-row").forEach((row, index) => {
        const cardLeft = row.querySelector(".ps-card-left");
        const cardRight = row.querySelector(".ps-card-right");

        // Create a dummy tween with an onUpdate to recalc the transforms
        gsap.to(cardLeft, {
          // Setting a target value so GSAP creates a tween.
          x: leftXValues[index],
          scrollTrigger: {
            trigger: ".ps-main",
            start: "top center",
            end: "150% bottom",
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              cardLeft.style.transform = `translateX(${progress * leftXValues[index]}px) translateY(${progress * yValues[index]}px) rotate(${progress * leftRotationValues[index]}deg)`;
              cardRight.style.transform = `translateX(${progress * rightXValues[index]}px) translateY(${progress * yValues[index]}px) rotate(${progress * rightRotationValues[index]}deg)`;
            }
          }
        });
      });

      // Animate the logo, lines, and button using the original scrollTrigger settings
      gsap.to(".ps-logo", {
        scale: 1,
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".ps-main",
          start: "top 25%",
          toggleActions: "play reverse play reverse"
        }
      });

      gsap.to(".ps-line p", {
        y: 0,
        duration: 0.5,
        ease: "power1.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".ps-main",
          start: "top 25%",
          toggleActions: "play reverse play reverse"
        }
      });

      gsap.to(".ps-btn button", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
        delay: 0.25,
        scrollTrigger: {
          trigger: ".ps-main",
          start: "top 25%",
          toggleActions: "play reverse play reverse"
        }
      });
    });

    // Mobile animations (max-width: 900px)
    mm.add("(max-width: 900px)", () => {
      // Scale down the original values (here roughly 50% of desktop values)
      const leftXValues = [-400, -450, -200];
      const rightXValues = [400, 450, 200];
      const leftRotationValues = [-15, -10, -17.5];
      const rightRotationValues = [15, 10, 17.5];
      const yValues = [50, -75, -200];

      gsap.utils.toArray(".ps-row").forEach((row, index) => {
        const cardLeft = row.querySelector(".ps-card-left");
        const cardRight = row.querySelector(".ps-card-right");

        gsap.to(cardLeft, {
          x: leftXValues[index],
          scrollTrigger: {
            trigger: ".ps-main",
            start: "top center",
            end: "150% bottom",
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              cardLeft.style.transform = `translateX(${progress * leftXValues[index]}px) translateY(${progress * yValues[index]}px) rotate(${progress * leftRotationValues[index]}deg)`;
              cardRight.style.transform = `translateX(${progress * rightXValues[index]}px) translateY(${progress * yValues[index]}px) rotate(${progress * rightRotationValues[index]}deg)`;
            }
          }
        });
      });

      gsap.to(".ps-logo", {
        scale: 1,
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".ps-main",
          start: "top 25%",
          toggleActions: "play reverse play reverse"
        }
      });

      gsap.to(".ps-line p", {
        y: 0,
        duration: 0.5,
        ease: "power1.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".ps-main",
          start: "top 25%",
          toggleActions: "play reverse play reverse"
        }
      });

      gsap.to(".ps-btn button", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
        delay: 0.25,
        scrollTrigger: {
          trigger: ".ps-main",
          start: "top 25%",
          toggleActions: "play reverse play reverse"
        }
      });
    });

    // Cleanup on unmount
    return () => {
      mm.revert();
    };
  }, []);

  // Generate 3 rows of 2 photo cards each (6 total)
  const generateRows = () => {
    const rows = [];
    for (let i = 1; i <= 3; i++) {
      rows.push(
        <div className="ps-row" key={i}>
          <div className="ps-card ps-card-left">
            <img src={`/assets/img-${2 * i - 1}.jpg`} alt={`Photo ${2 * i - 1}`} width={100} height={100} />
          </div>
          <div className="ps-card ps-card-right">
            <img src={`/assets/img-${2 * i}.jpg`} alt={`Photo ${2 * i}`} width={100} height={100} />
          </div>
        </div>
      );
    }
    return rows;
  };

  return (
    <section className="ps-main">
      <div className="ps-main-content">
        <div className="ps-logo">
          <img src="/assets/logo.jpg" alt="Logo" width={100} height={100} />
        </div>
        <div className="ps-copy">
          <div className="ps-line">
            <p>We don't take photos like your mom... </p>
          </div>
          <div className="ps-line">
            <p>But we put the camera</p>
          </div>
          <div className="ps-line">
            <p>into her hands.</p>
          </div>
        </div>
        <div className="ps-btn">
          <button>Learn More</button>
        </div>
      </div>
      {generateRows()}
    </section>
  );
}
