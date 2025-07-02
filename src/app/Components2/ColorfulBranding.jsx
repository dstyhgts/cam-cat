"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ColorfulBranding.module.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Example text containing <br/> for manual line breaks.
 * Adjust or add more <br/> as you like.
 */
const fullText = `
  CAMERAS HELP <br/> PEOPLE TELL STORIES AND CONNECT US TO THE PAST
  WITH IMMEDIATE WARMTH. <br/> <br/> <br/>Photography has always been about quality. But memories...? They're about feeling.
  <br/> <br/>  At Camera Catering, we believe memories have an aesthetic. 
   <br/> <br/>  That's why we bring a camera bar to your event... stocked with vintage cameras, VHS Camcorders, Instant <br/>Print Cameras, and all the tools of nostalgia.
 
`;
//OLD TEXT
  // CAMERAS HELP <br/> HUMANS TELL STORIES AND CONNECT EACH OF US TO THE PAST
  // WITH IMMEDIATE WARMTH. <br/> <br/> <br/> <br/>OUR CHILDREN <br/> WILL THANK US FOR <br/> BEING THE ONES <br/> BEHIND THE CAMERA! <br/> <br/><br/>WE ARE <br/> EACH THE <br/>ORATORS OF <br/> OUR OWN <br/> STORIES.
  // <br/> <br/>  HERE AT CAMERA CATERING. WE DON'T TAKE PICTURES AT YOUR EVENTS,
  // <br/><br/>WE BRING THE CAMERAS SO THAT YOUR GUESTS CAN DO THAT FOR THEMSELVES

/**
 * Images array, each with:
 *  - wordIndex => after which "real word" to insert
 *  - float => "left", "right", or "center"
 *  - size => "small" or "large"
 *  - src, alt => image path & alt text
 */
const imagesData = [
    { wordIndex: 25,  float: "right",   size: "large", src: "/assets/camera-icon112.svg" },
    { wordIndex: 6, float: "left",  size: "large", src: "/assets/camera-icon113.svg" },
    { wordIndex: 2, float: "right", size: "large", src: "/assets/camera-icon111.svg" },
    { wordIndex: 15, float: "left",  size: "large", src: "/assets/camera-icon100.svg" },
    { wordIndex: 21, float: "left",   size: "large", src: "/assets/camera-icon13.svg" },
    { wordIndex: 28, float: "left", size: "large", src: "/assets/camera-icon115.svg" },
    { wordIndex: 43, float: "right",   size: "large", src: "/assets/camera-icon23.svg" },
    { wordIndex: 40, float: "right",  size: "large", src: "/assets/camera-icon20.svg" },
];

/**
 * parseTextWithBr():
 * Splits the text on <br/> tokens and whitespace,
 * producing real <br /> elements for line breaks,
 * and inserts images after certain "word indexes."
 */
function parseTextWithBr(fullText, images) {
  // Build a map: wordIndex => image data
  const imageMap = {};
  images.forEach((img) => {
    imageMap[img.wordIndex] = img;
  });

  // Split on <br/> or whitespace, capturing them to see which is which
  const tokens = fullText.split(/(<br\s*\/?>|\s+)/).filter(Boolean);

  let wordCount = 0; // increment for real words only
  const output = [];

  tokens.forEach((token, i) => {
    // If it's exactly "<br/>" => push a real <br />
    if (token.match(/^<br\s*\/?>$/i)) {
      output.push(<br key={`br-${i}`} />);
    }
    // If it's purely whitespace => push a single space or do nothing
    else if (token.match(/^\s+$/)) {
      output.push(" ");
    }
    else {
      // It's a real "word" token
      output.push(token + " ");
      wordCount++;

      // If there's an image after this word index...
      if (imageMap[wordCount]) {
        const img = imageMap[wordCount];

        // Build class list for "center" hack + size
        let classList = [];
        if (img.float === "center") {
          classList.push(styles.floatImageCenter);
        }
        if (img.size === "large") {
          classList.push(styles.floatImageLarge);
        } else {
          classList.push(styles.floatImageSmall);
        }

        output.push(
          <span
            key={`img-${i}`}
            className={classList.join(" ")}
            style={
              img.float === "left" || img.float === "right"
                ? { float: img.float }
                : {}
            }
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              style={{ objectFit: "contain" }}
            />
          </span>
        );
      }
    }
  });

  return output;
}

export default function ColorfulBranding() {
  const containerRef = useRef(null);

  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     // Subtle parallax on each floated image, "scrub: true" => no sticking
  //     gsap.utils.toArray(`
  //       .${styles.floatImageSmall}, 
  //       .${styles.floatImageLarge},
  //       .${styles.floatImageCenter}
  //     `).forEach((el, i) => {
  //       gsap.fromTo(
  //         el,
  //         { y: 0 },
  //         {
  //           y: i % 2 === 0 ? -10 : 10,
  //           ease: "none",
  //           // scrollTrigger: {
  //           //   trigger: containerRef.current,
  //           //   start: "top bottom",
  //           //   end: "bottom top",
  //           //   scrub: true,
  //           // },
  //         }
  //       );
  //     });
  //   }, containerRef);

  //   return () => ctx.revert();
  // }, []);

  const contentElements = parseTextWithBr(fullText, imagesData);

  return (
    <section ref={containerRef} className={styles.brandingSection}>
      <p className={styles.bigParagraph}>{contentElements}</p>
    </section>
  );
}
