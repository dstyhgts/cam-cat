"use client";

import { useEffect, useRef } from 'react';
import Head from 'next/head';
import styles from './CardScroll.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CardScroll = () => {
  const stickyCardsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const q = gsap.utils.selector(stickyCardsRef);
    // Query all text elements (the actual lines have class cs-text)
    const texts = q(`.${styles['cs-text']}`);
    // Query all card elements.
    const cards = q(`.${styles['cs-card']}`);
    // Updated rotations for 8 cards.
    const rotations = [-12, 10, -5, 5, -5, -2, 3, -8];

    // Set initial positions for cards.
    cards.forEach((card, index) => {
      gsap.set(card, {
        y: window.innerHeight,
        rotate: rotations[index],
      });
    });

    // Set initial positions for text elements.
    texts.forEach((text) => {
      gsap.set(text, { y: window.innerHeight });
    });

    // Create a ScrollTrigger that pins the container and drives animations.
    ScrollTrigger.create({
      trigger: stickyCardsRef.current,
      start: 'top top',
      end: `+=${window.innerHeight * 8}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalItems = cards.length; // 8 items now.
        const progressPerItem = 1 / totalItems;
        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;

        // Animate cards.
        cards.forEach((card, index) => {
          const itemStart = index * progressPerItem;
          let itemProgress = (progress - itemStart) / progressPerItem;
          itemProgress = Math.min(Math.max(itemProgress, 0), 1);

          let yPos = innerHeight * (1 - itemProgress);
          let xPos = 0;

          if (itemProgress === 1 && index < totalItems - 1) {
            let remainingProgress =
              (progress - (itemStart + progressPerItem)) /
              (1 - (itemStart + progressPerItem));
            remainingProgress = Math.min(remainingProgress, 0.5);
            if (remainingProgress > 0) {
              const distanceMultiplier = 1 - index * 0.15;
              xPos = -innerWidth * 0.3 * distanceMultiplier * remainingProgress;
              yPos = -innerHeight * 0.3 * distanceMultiplier * remainingProgress;
            }
          }

          gsap.to(card, {
            y: yPos,
            x: xPos,
            duration: 0,
            ease: 'none',
          });
        });

        // Animate all text elements with the same vertical movement.
        texts.forEach((text, index) => {
          const itemStart = index * progressPerItem;
          let itemProgress = (progress - itemStart) / progressPerItem;
          itemProgress = Math.min(Math.max(itemProgress, 0), 1);

          let textY = innerHeight * (1 - itemProgress);
          gsap.to(text, {
            y: textY,
            duration: 0,
            ease: 'none',
          });
        });
      },
    });
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TheFirstTheLast Scroll Animation | Codegrid</title>
      </Head>

      {/* <section className={styles['cs-hero']}>
        <h1>Future threads for a fractured world.</h1>
      </section> */}

      {/* Sticky container holding text and cards */}
      <section className={styles['cs-sticky-cards']} ref={stickyCardsRef}>
        {/* Centered text: only "AWAKEN" */}
        <div className={styles['cs-text-center']}>
          <div className={styles['cs-text']}>EVENTS</div>
        </div>

        {/* Right-side text: remaining words, left-aligned */}
        <div className={styles['cs-text-right']}>
          <div className={styles['cs-text']}>WEDDINGs</div>
          <div className={styles['cs-text']}>BIRTHDAYs</div>
          <div className={styles['cs-text']}>POP-UPs</div>
          <div className={styles['cs-text']}>BARMITZVAHs</div>
          <div className={styles['cs-text']}>ACTIVATIONs</div>
          <div className={styles['cs-text']}>POP-UPs</div>
          <div className={styles['cs-text']}>and MORE!</div>
        </div>

        {/* Eight card elements */}
        <div className={styles['cs-card']}>
          <div className={styles['cs-card-img']}>
            <img src="/assets/card-1.jpeg" alt="" />
          </div>
          <div className={styles['cs-card-content']}>
            <p>X01-842</p>
          </div>
        </div>
        <div className={styles['cs-card']}>
          <div className={styles['cs-card-img']}>
            <img src="/assets/card-2.jpeg" alt="" />
          </div>
          <div className={styles['cs-card-content']}>
            <p>V9-372K</p>
          </div>
        </div>
        <div className={styles['cs-card']}>
          <div className={styles['cs-card-img']}>
            <img src="/assets/card-3.jpeg" alt="" />
          </div>
          <div className={styles['cs-card-content']}>
            <p>Z84-Q17</p>
          </div>
        </div>
        <div className={styles['cs-card']}>
          <div className={styles['cs-card-img']}>
            <img src="/assets/card-4.jpeg" alt="" />
          </div>
          <div className={styles['cs-card-content']}>
            <p>L56-904</p>
          </div>
        </div>
        <div className={styles['cs-card']}>
          <div className={styles['cs-card-img']}>
            <img src="/assets/card-5.jpeg" alt="" />
          </div>
          <div className={styles['cs-card-content']}>
            <p>A23-7P1</p>
          </div>
        </div>
        <div className={styles['cs-card']}>
          <div className={styles['cs-card-img']}>
            <img src="/assets/card-6.jpeg" alt="" />
          </div>
          <div className={styles['cs-card-content']}>
            <p>T98-462</p>
          </div>
        </div>
        {/* <div className={styles['cs-card']}>
          <div className={styles['cs-card-img']}>
            <img src="/assets/card-7.jpeg" alt="" />
          </div>
          <div className={styles['cs-card-content']}>
            <p>B12-345</p>
          </div>
        </div>
        <div className={styles['cs-card']}>
          <div className={styles['cs-card-img']}>
            <img src="/assets/card-8.jpeg" alt="" />
          </div>
          <div className={styles['cs-card-content']}>
            <p>C67-890</p>
          </div>
        </div> */}
      </section>

      {/* <section className={styles['cs-outro']}>
        <h1>Tomorrow, tailored.</h1>
      </section> */}
    </>
  );
};

export default CardScroll;
