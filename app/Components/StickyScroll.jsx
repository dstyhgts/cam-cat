"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import GalleryScroll from "./GalleryScroll"; // Import the GalleryScroll component

gsap.registerPlugin(ScrollTrigger);

const StickyScrollCard = ({ title, copy, index }) => {
  return (
    <div className="ss-card" id={`card-${index + 1}`}>
      <div className="ss-card-inner">
        <div className="ss-card-content">
          <h1>{title}</h1>
          <p>{copy}</p>
        </div>
        <div className="ss-card-img">
          <img src={`/assets/card-${index + 1}.jpeg`} alt={title} />
        </div>
      </div>
    </div>
  );
};

export default function StickyScroll() {
  const cardsData = [
    {
      title: "What?",
      copy: "At Camera Catering, we believe memories have an aesthetic. That’s why we bring a camera bar to your event—stocked with vintage cameras, instant print cameras, and the tools of nostalgia.",
    },
    {
      title: "How?",
      copy: "No photographers telling people where to stand. No stiff posing. Just real moments, captured by the people living them.",
    },
    {
      title: "Why?",
      copy: "Because when you give someone a camera, you don’t just get photos—you get their story.",
    },
    {
      title: "Where?",
      copy: "We come to where the party is, so that you can leave with the memories.",
    },
  ];

  const container = useRef(null);
  const outroRef = useRef(null);

  useEffect(() => {
    // Use ScrollTrigger.matchMedia to set up different animations for desktop and mobile/tablet
    const mm = ScrollTrigger.matchMedia({
      // Desktop settings
      "(min-width: 901px)": () => {
        const cards = gsap.utils.toArray(".ss-card");

        // Pin the intro section
        ScrollTrigger.create({
          trigger: cards[0],
          start: "top 35%",
          endTrigger: cards[cards.length - 1],
          end: "top 30%",
          pin: ".ss-intro",
          pinSpacing: false,
        });

        // Card animations for desktop
        cards.forEach((card, index) => {
          const isLastCard = index === cards.length - 1;
          const cardInner = card.querySelector(".ss-card-inner");

          if (!isLastCard) {
            ScrollTrigger.create({
              trigger: card,
              start: "top 35%",
              endTrigger: ".ss-outro",
              end: "top 65%",
              pin: true,
              pinSpacing: false,
            });

            gsap.to(cardInner, {
              y: `-${(cards.length - index) * 14}vh`,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 35%",
                endTrigger: ".ss-outro",
                end: "top 65%",
                scrub: true,
              },
            });
          }
        });

        // Outro section remains unchanged
        const outro = outroRef.current;
        if (outro) {
          const slider = outro.querySelector(".gs-slider");
          if (slider) {
            const baseTravel = slider.scrollWidth - outro.clientWidth;
            // For 20 images total, lock until 15 images have scrolled (leaving 5 visible)
            const tweenTravel = baseTravel * (15 / 25);
            // And release the pin slightly earlier
            const pinTravel = baseTravel * (12 / 25);

            ScrollTrigger.create({
              trigger: outro,
              start: "top top",
              end: `+=${pinTravel}`,
              pin: true,
              pinSpacing: true,
            });
          }
        }
      },
      // Mobile/Tablet settings
      "(max-width: 900px)": () => {
        const cards = gsap.utils.toArray(".ss-card");

        // Adjust pinning for the intro section on mobile/tablet
        ScrollTrigger.create({
          trigger: cards[0],
          start: "top 50%",
          endTrigger: cards[cards.length - 1],
          end: "top 40%",
          pin: ".ss-intro",
          pinSpacing: false,
        });

        // Adjust card animations for mobile/tablet
        cards.forEach((card, index) => {
          const isLastCard = index === cards.length - 1;
          const cardInner = card.querySelector(".ss-card-inner");

          if (!isLastCard) {
            ScrollTrigger.create({
              trigger: card,
              start: "top 50%",
              endTrigger: ".ss-outro",
              end: "top 60%",
              pin: true,
              pinSpacing: false,
            });

            gsap.to(cardInner, {
              y: `-${(cards.length - index) * 10}vh`,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 50%",
                endTrigger: ".ss-outro",
                end: "top 60%",
                scrub: true,
              },
            });
          }
        });

        // Keep the outro animation consistent across breakpoints
        const outro = outroRef.current;
        if (outro) {
          const slider = outro.querySelector(".gs-slider");
          if (slider) {
            const baseTravel = slider.scrollWidth - outro.clientWidth;
            const tweenTravel = baseTravel * (15 / 25);
            const pinTravel = baseTravel * (12 / 25);

            ScrollTrigger.create({
              trigger: outro,
              start: "top top",
              end: `+=${pinTravel}`,
              pin: true,
              pinSpacing: true,
            });
          }
        }
      },
    });

    // Cleanup when the component unmounts or media conditions change
    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div className="ss-app" ref={container}>
      <section className="ss-intro">
        <h1>
        Because when you give someone a camera, you don’t just get photos—you get their story.        </h1>
      </section>

      <section className="ss-cards">
        {cardsData.map((card, index) => (
          <StickyScrollCard key={index} {...card} index={index} />
        ))}
      </section>

      <section className="ss-outro" ref={outroRef}>
        <GalleryScroll />
        <h1>Let’s build a brand that leaves a mark.</h1>
      </section>
    </div>
  );
}
