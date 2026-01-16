"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ColorfulBranding.module.css";
import parse from "html-react-parser";

gsap.registerPlugin(ScrollTrigger);

/**
 * Example text containing <br/> for manual line breaks.
 * Adjust or add more <br/> as you like.
 */
const fullText = `<u>CAMERA CATERING</u> is California's <i>#1</i> solution for <i><u>EVENT Photo +</u></i> <i><u> Video CONTENT.</u></i> <br/> <br/> We offer bulk-camera rentals anything else Camera-And-Content: fully custom 
and creative. <br/> <br/> We bring <i>dozens</i> of <i><u>digicams</u></i> , <i><u>video</u></i> & <i><u>instant-print cameras</u></i>. <br/> <br/>We offer cutting edge <i> Photo Booths, 
<i>Video Booths</i>, and <i>Phone Booths</i> that bring your event <i>to life.</i> <br/> <br/>  <i>We digitize everything, edit social posts, 
and deliver everything within 36-72 hours. </i> <br/> <br/> Stop juggling vendors... invite Camera Catering and <i> make the memories easy to remember, </i> <u> forever.</u>`;
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
    { wordIndex: 2, float: "right", size: "large", src: "/assets/camera-icon111.svg" },
    { wordIndex: 6, float: "left",  size: "large", src: "/assets/camera-icon113.svg" },
    { wordIndex: 13,  float: "right",   size: "large", src: "/assets/camera-icon112.svg" },
    { wordIndex: 20, float: "left",  size: "large", src: "/assets/camera-icon100.svg" },
    { wordIndex: 27, float: "right", size: "large", src: "/assets/camera-icon13.svg" },
    { wordIndex: 34, float: "left",  size: "large", src: "/assets/camera-icon115.svg" },
    { wordIndex: 41, float: "right",   size: "large", src: "/assets/camera-icon23.svg" },
    { wordIndex: 48, float: "left",  size: "large", src: "/assets/camera-icon20.svg" },
    { wordIndex: 55, float: "right",  size: "large", src: "/assets/camera-icon51.svg" },
    { wordIndex: 64, float: "left", size: "large", src: "/assets/camera-icon21.svg" },
    // { wordIndex: 69, float: "right",   size: "large", src: "/assets/camera-icon22.svg" },
    // { wordIndex: 76, float: "left",  size: "large", src: "/assets/camera-icon24.svg" },
    // { wordIndex: 83, float: "right", size: "large", src: "/assets/camera-icon30.svg" },
    // { wordIndex: 90, float: "left",   size: "large", src: "/assets/camera-icon32.svg" },
    // { wordIndex: 98, float: "right",  size: "large", src: "/assets/camera-icon50.svg" },
    // { wordIndex: 108, float: "left",  size: "large", src: "/assets/camera-icon51.svg" }, // last word
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
