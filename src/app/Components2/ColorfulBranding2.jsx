"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ColorfulBranding2.module.css";
import parse from "html-react-parser";

gsap.registerPlugin(ScrollTrigger);

/**
 * Example text containing <br/> for manual line breaks.
 * Adjust or add more <br/> as you like.
 */
const fullText = `
We aim to make your event production easier to manage and more engaging for your guests. <br/> <br/> Need a paparazzi-welcome for a brand activation?
Done. Faux security-cam footage of your wedding? Easy. POV sunglasses, 360-degree videos, and instant-print cameras, <i> or anything else you imagine...?</i> We can do that.
 <br/> <br/> Our <i>team, of editors, photographers, and 
filmmakers elevate weddings, baby showers, birthdays, brand activations, pop-ups, and fashion shows— turing your night into a movie.
 <br/> <br/> We know cameras. <br/> We also know the power of images and videos, and how they can be used to tell stories, create memories, and connect people.
                                           
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
    { wordIndex: 3, float: "right", size: "large", src: "/assets/camera-icon101.svg" },
    { wordIndex: 10, float: "left", size: "large", src: "/assets/camera-icon103.svg" },
    { wordIndex: 17, float: "right", size: "small", src: "/assets/camera-icon106.svg" },
    { wordIndex: 24, float: "left", size: "large", src: "/assets/camera-icon111.svg" },
    { wordIndex: 28, float: "right", size: "large", src: "/assets/camera-icon32.svg" },
    { wordIndex: 39, float: "left", size: "small", src: "/assets/camera-icon113.svg" },
    { wordIndex: 45, float: "right", size: "large", src: "/assets/camera-icon114.svg" },
    { wordIndex: 58, float: "left", size: "large", src: "/assets/camera-icon115.svg" },
    { wordIndex: 59, float: "right", size: "small", src: "/assets/camera-icon116.svg" },
    { wordIndex: 66, float: "left", size: "large", src: "/assets/camera-icon117-1.svg" },
    { wordIndex: 73, float: "right", size: "large", src: "/assets/camera-icon12.svg" },
    { wordIndex: 80, float: "left", size: "large", src: "/assets/camera-icon15.svg" },
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
  let output = "";
  const reactElements = [];

  tokens.forEach((token, i) => {
    // If it's exactly "<br/>" => push a real <br />
    if (token.match(/^<br\s*\/?>$/i)) {
      output += "<br />";
    }
    // If it's purely whitespace => push a single space or do nothing
    else if (token.match(/^\s+$/)) {
      output += " ";
    }
    else {
      // It's a real "word" token
      output += token + " ";
      wordCount++;

      // If there's an image after this word index...
      if (imageMap[wordCount]) {
        // Push the text so far (parsed)
        if (output.trim()) {
          reactElements.push(parse(output));
          output = "";
        }
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
        reactElements.push(
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
  // Push any remaining text
  if (output.trim()) {
    reactElements.push(parse(output));
  }
  return reactElements;
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
