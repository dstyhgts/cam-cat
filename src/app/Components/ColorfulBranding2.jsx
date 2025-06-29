"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ColorfulBranding2.module.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Example text containing <br/> for manual line breaks.
 * Adjust or add more <br/> as you like.
 */
const fullText = `
<br/>TAKING PHOTOS AT YOUR EVENT SHOULDN'T FEEL LIKE SOMEONE IS ALWAYS WATCHING YOU.
<br/> <br/> No photographers telling people where to stand. <br/> <br/>  No stiff posing. <br/> <br/>  Just real moments, captured by the people living them.
 <br/> <br/> Because when you <br/>give someone a camera, you don’t just get photos— <br/>you get their story.
                                           
`;

{/* <br/>TAKING PHOTOS OF YOUR EVENT SHOULD 
NEVER FEEL LIKE SOMEONE IS ALWAYS WATCHING YOU.
<br/><br/> <br/>PHOTOGRAPHY SHOULD BE FUN! <br/> <br/>IT SHOULD BE TRUE!
<br/><br/> <br/>IT SHOULD BE YOUR TRUTH. <br/><br/> YOUR STORY THROUGH YOUR EYES!
<br/><br/> WE HELP REMEMBER                                        
YOUR LIFE FOR YOU.         */}


/**
 * Images array, each with:
 *  - wordIndex => after which "real word" to insert
 *  - float => "left", "right", or "center"
 *  - size => "small" or "large"
 *  - src, alt => image path & alt text
 */
const imagesData = [
    { wordIndex: 35,  float: "right",   size: "large", src: "/assets/camera-icon117-1.svg" },
    { wordIndex: 8, float: "left",  size: "large", src: "/assets/camera-icon101.svg" },
    { wordIndex: 2, float: "right", size: "large", src: "/assets/camera-icon30.svg" },
    { wordIndex: 15, float: "left",  size: "large", src: "/assets/camera-icon106.svg" },
    { wordIndex: 21, float: "right",   size: "small", src: "/assets/camera-icon10.svg" },
    { wordIndex: 18, float: "left", size: "small", src: "/assets/camera-icon12.svg" },
    { wordIndex: 20, float: "right",   size: "large", src: "/assets/camera-icon32.svg" },
    { wordIndex: 22, float: "left",  size: "small", src: "/assets/camera-icon13.svg" },];

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

export default function ColorfulBranding2() {
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
