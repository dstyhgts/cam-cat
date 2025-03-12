"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Services.module.css";

const Services = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Helper for linear interpolation
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const config = {
      SCROLL_SPEED: 0.75,
      LERP_FACTOR: 0.05,
      BUFFER_SIZE: 15,
      CLEANUP_THRESHOLD: 50,
      MAX_VELOCITY: 120,
      SNAP_DURATION: 500,
    };

    // Added description property to each project
    const projectData = [
      { 
        title: "Why This? <br/> Why Now?", 
        image: "/assets/img1.jpeg", 
        isAlternate: false, 
        description: 'Because you have to see what we are up to... <br/>   <br/> We’ve spent years in the event industry. We know how it goes. <br/>   <br/> A photographer walks around, snaps polished, well-lit photos—and yet somehow, you still leave the event feeling like something was missing. <br/>   <br/>  Because the best moments? They’re the ones people create when they don’t think anyone is watching. <br/>   <br/>  With Camera Catering, the cameras are in their hands. <br/>   <br/>  That means your event doesn’t just get documented—it gets remembered. <br/>   <br/> Our services offer a new kind of instant photo-print expirience through our use of thermal printers built directly into your camera, as well as tacful throwback expirienced focused on vintage cameras from the ‘80s, ‘90s, and early 2000s and camcorders that capture the grain, texture, and imperfections that make nostalgia feel like our parents captured it.  <br/>   <br/> After your event, you’ll receive: <br/>  ✔️ All images and footage reviewed, refined, and delivered. <br/> ✔️ A mix of edited and raw content—so you get both polish and authenticity. <br/> ✔️ Fast turnaround—sent not just to the host, but to the guests who captured the night.'
      },
      { 
        title: "The 'Print' <br/> Package", 
        image: "/assets/img2.jpeg", 
        isAlternate: true, 
        description: '💰 $2,500 | 📸 25 Instant Print Cameras | 📤 Digitized & Delivered in 36 Hours  <br/>   <br/>  Some moments are meant to be disposable—but that doesn’t mean they should be forgotten. <br/>   <br/> This is our signature product: the bare-bones, blink-and-you’ll-miss-it version of the experience. No camera bar, no spectacle—just cameras, handed off to the guests who matter most. The ones in the thick of the action, capturing the real stuff. <br/>   <br/> DAY-OF: <br/> 📸 25 Novel© instant print cameras—small, simple, and made to be passed around. Every shot prints immediately, but every image is also stored digitally. <br/>  📼 Physical keepsakes + digital archives—so no moment is lost, even after the prints fade. <br/>  📤 Delivery in 36 hours—you get every digital file, plus a fully preserved archive of the night. <br/>   <br/> 🔹 Want a little more? Add a Cam-Tender ($150/hr)—for when guests need a little direction. <br/>   <br/> No production, no planning, no pressure. Just real moments, instantly preserved.'
      },
      { 
        title: "'Classics' <br/> Package", 
        image: "/assets/img3.jpeg", 
        isAlternate: false, 
        description: '💰 $4,500 | 📸 250 Photos Delivered | 📤 10-Min Unedited Retro Video | ⏳ Time Frame: 4 Hours  <br/>   <br/> Somewhere in the room, there’s a bar. But not the kind you’re thinking of. <br/>   <br/> The Camera Bar is a curiosity—a beacon for the ones who get it. Stocked with vintage cameras and strange little props, it’s an invitation to step outside of time. No selfie filters, no posing for the ‘gram—just real people, real memories, caught the way they should be. <br/>   <br/> DAY-OF: <br/> 📸 25 vintage cameras—left out, handed off, capturing the event from every possible angle. <br/> 📸 10 Novel© instant print cameras—small, simple, and made to be passed around. Every shot prints immediately, but every image is also stored digitally. <br/> 🎥 2 Cam-Tenders, guiding guests into the world of analog nostalgia, making sure the cameras don’t just sit on the table. 🗝 Fully Loaded Camera Bar; both acting as an event spectacle and community center. <br/> 📤 Delivery in 36 hours—sent directly to guests via email & text, so the best shots don’t get lost in someone’s camera roll. <br/> 🎞 A complimentary 3-minute highlight edit—quick, fun, no revisions. A thank-you for letting us in. <br/>   <br/> DAY-AFTER: <br/> 📸 Total Images Delivered: 250 <br/> 📸 Professionally Edited Photos: 25 <br/> 📼 Total Video Captured: Up to 1 hour <br/> 🎥 Trimmed Version: 10 minutes of refined unedited footage <br/> 🎞 Every image and video is reviewed before delivery (removing unusable content) <br/> 📤 Delivery in 36 hours—because nostalgia hits best when you least expect it. <br/>   <br/> More structured than Disposable, but still effortless. If you’ve got a photographer, this slides right in alongside them. If you don’t, it might make you wonder if you even needed one.'
      },
      { 
        title: "'Premiere' <br/> Package", 
        image: "/assets/img4.jpeg", 
        isAlternate: true, 
        description: '💰 $7,500 | 📸 1000+ Photos Delivered | 📤 30-Min Unedited Retro Video | ⏳ Full Event Coverage <br/>  <br/> If Classic is a time capsule, Premiere is the director’s cut. <br/>  <br/> Every guest-driven moment, every handoff, every stolen-frame snapshot—stitched into something that actually tells the full story. This is when we bring professionals in to fill in the gaps. <br/>   <br/> DAY-OF: <br/> 📸 25-50 guest-operated vintage cameras—documenting every side of the event, from first arrivals to final toasts. <br/>  📸 15 Novel© instant print cameras—small, simple, and made to be passed around. Every shot prints immediately, but every image is also stored digitally. <br/> 🎥 2+ Cam-Tenders—facilitating, shooting, making sure no storyline is left unfinished. <br/> 📷 A dedicated photographer—there solely to capture the best stills of the night. <br/> 🎥 A dedicated videographer—focused entirely on moving images, ensuring the night flows seamlessly on screen. <br/> 🎭 A substancially enticing sleu of vintage props and constume accessories - designed to bring some personal touch to your guests. <br/>   <br/> DAY-AFTER: <br/> 📸 Total Images Delivered: 1000+ <br/> 📸 Professionally Edited Photos: 50 <br/> 📼 Total Video Captured: Up to 3 hours <br/>🎥 Trimmed Version: 30 minutes of refined unedited footage <br/> 🎞 5 polished social videos (with 1 revision rounds) <br/> 🎞 10-15 min nostalgia full-edit that captures the night like it’s already a memory. <br/> 📤 Delivery in 36 hours—because time moves fast, and we want you to keep up. <br/> 🔹 Raw video categorized by the person who filmed it (full content available on request) <br/> 🎞 Every image and video is reviewed before delivery (removing unusable content) <br/>  <br/> This isn’t just more. It’s complete.'
      },
      { 
        title: "Vacuum", 
        image: "/assets/img5.jpeg", 
        isAlternate: false, 
        description: "Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh." 
      },
      { 
        title: "Synthesis", 
        image: "/assets/img6.jpeg", 
        isAlternate: true, 
        description: "Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem." 
      },
    ];

    const state = {
      currentY: 0,
      targetY: 0,
      isDragging: false,
      startY: 0,
      projects: new Map(),
      parallaxImages: new Map(),
      projectHeight: window.innerHeight,
      isSnapping: false,
      snapStartTime: 0,
      snapStartY: 0,
      snapTargetY: 0,
      lastScrollTime: Date.now(),
    };

    let animationId;

    // Parallax helper for image elements
    const createParallaxImage = (imageElement) => {
      let bounds = null;
      let currentTranslateY = 0;
      let targetTranslateY = 0;

      const updateBounds = () => {
        if (imageElement) {
          const rect = imageElement.getBoundingClientRect();
          bounds = {
            top: rect.top + window.scrollY,
            bottom: rect.bottom + window.scrollY,
          };
        }
      };

      const update = (scroll) => {
        if (!bounds) return;
        const relativeScroll = -scroll - bounds.top;
        targetTranslateY = relativeScroll * 0.2;
        currentTranslateY = lerp(currentTranslateY, targetTranslateY, 0.1);
        if (Math.abs(currentTranslateY - targetTranslateY) > 0.01) {
          imageElement.style.transform = `translateY(${currentTranslateY}px) scale(1.5)`;
        }
      };

      updateBounds();
      return { update, updateBounds };
    };

    // Retrieve project data (looping over the data array)
    const getProjectData = (index) => {
      const dataIndex =
        ((Math.abs(index) % projectData.length) + projectData.length) %
        projectData.length;
      return projectData[dataIndex];
    };

    // Create and insert a project element from the hidden template
    const createProjectElement = (index) => {
      if (state.projects.has(index)) return;
      if (!containerRef.current) return;

      const template = containerRef.current.querySelector(`.${styles["packs-template"]}`);
      if (!template) {
        console.error("Template element not found!");
        return;
      }
      const project = template.cloneNode(true);
      project.style.display = "flex";
      project.classList.remove(styles["packs-template"]);

      const data = getProjectData(index);
      const dataIndex =
        ((Math.abs(index) % projectData.length) + projectData.length) %
        projectData.length;
      const projectNumber = (dataIndex + 1).toString().padStart(2, "0");

      // Include a description paragraph under the title
      if (data.isAlternate) {
        project.innerHTML = `
          <div class="${styles["packs-side"]}">
            <div class="${styles["packs-img"]}"><img src="${data.image}" alt="${data.title}" /></div>
          </div>
          <div class="${styles["packs-side"]}">
            <div class="${styles["packs-title"]}">
              <h1>${data.title}</h1>
              <h1>${projectNumber}</h1>
              <p class="${styles["packs-description"]}">${data.description}</p>
            </div>
          </div>
        `;
      } else {
        project.innerHTML = `
          <div class="${styles["packs-side"]}">
            <div class="${styles["packs-title"]}">
              <h1>${data.title}</h1>
              <h1>${projectNumber}</h1>
              <p class="${styles["packs-description"]}">${data.description}</p>
            </div>
          </div>
          <div class="${styles["packs-side"]}">
            <div class="${styles["packs-img"]}"><img src="${data.image}" alt="${data.title}" /></div>
          </div>
        `;
      }

      project.style.transform = `translateY(${index * state.projectHeight}px)`;
      const projectList = containerRef.current.querySelector(`.${styles["packs-project-list"]}`);
      if (projectList) {
        projectList.appendChild(project);
      }
      state.projects.set(index, project);

      const img = project.querySelector("img");
      if (img) {
        state.parallaxImages.set(index, createParallaxImage(img));
      }
    };

    const createInitialProjects = () => {
      for (let i = -config.BUFFER_SIZE; i <= config.BUFFER_SIZE; i++) {
        createProjectElement(i);
      }
    };

    const getCurrentIndex = () => Math.round(-state.targetY / state.projectHeight);

    const checkAndCreateProjects = () => {
      const currentIndex = getCurrentIndex();
      const minNeeded = currentIndex - config.BUFFER_SIZE;
      const maxNeeded = currentIndex + config.BUFFER_SIZE;

      for (let i = minNeeded; i <= maxNeeded; i++) {
        if (!state.projects.has(i)) {
          createProjectElement(i);
        }
      }

      for (const [index, project] of Array.from(state.projects.entries())) {
        if (
          index < currentIndex - config.CLEANUP_THRESHOLD ||
          index > currentIndex + config.CLEANUP_THRESHOLD
        ) {
          try {
            if (project && project.parentNode && project.parentNode.contains(project)) {
              project.parentNode.removeChild(project);
            }
          } catch (error) {
            console.error("Error removing project:", error);
          }
          state.projects.delete(index);
          state.parallaxImages.delete(index);
        }
      }
    };

    const getClosestSnapPoint = () => {
      const currentIndex = Math.round(-state.targetY / state.projectHeight);
      return -currentIndex * state.projectHeight;
    };

    const initiateSnap = () => {
      state.isSnapping = true;
      state.snapStartTime = Date.now();
      state.snapStartY = state.targetY;
      state.snapTargetY = getClosestSnapPoint();
    };

    const updateSnap = () => {
      const elapsed = Date.now() - state.snapStartTime;
      const progress = Math.min(elapsed / config.SNAP_DURATION, 1);
      const t = 1 - Math.pow(1 - progress, 3);
      state.targetY = state.snapStartY + (state.snapTargetY - state.snapStartY) * t;
      if (progress >= 1) {
        state.isSnapping = false;
        state.targetY = state.snapTargetY;
      }
    };

    const animate = () => {
      const now = Date.now();
      const timeSinceLastScroll = now - state.lastScrollTime;
      if (!state.isSnapping && !state.isDragging && timeSinceLastScroll > 100) {
        const snapPoint = getClosestSnapPoint();
        if (Math.abs(state.targetY - snapPoint) > 1) {
          initiateSnap();
        }
      }
      if (state.isSnapping) {
        updateSnap();
      }
      if (!state.isDragging) {
        state.currentY += (state.targetY - state.currentY) * config.LERP_FACTOR;
      }
      checkAndCreateProjects();
      state.projects.forEach((project, index) => {
        const y = index * state.projectHeight + state.currentY;
        project.style.transform = `translateY(${y}px)`;
        const parallaxImage = state.parallaxImages.get(index);
        if (parallaxImage) {
          parallaxImage.update(state.currentY);
        }
      });
      animationId = requestAnimationFrame(animate);
    };

    const handleWheel = (e) => {
      e.preventDefault();
      state.isSnapping = false;
      state.lastScrollTime = Date.now();
      const scrollDelta = e.deltaY * config.SCROLL_SPEED;
      state.targetY -= Math.max(
        Math.min(scrollDelta, config.MAX_VELOCITY),
        -config.MAX_VELOCITY
      );
    };

    const handleTouchStart = (e) => {
      state.isDragging = true;
      state.isSnapping = false;
      state.startY = e.touches[0].clientY;
      state.lastY = state.targetY;
      state.lastScrollTime = Date.now();
    };

    const handleTouchMove = (e) => {
      if (!state.isDragging) return;
      const deltaY = (e.touches[0].clientY - state.startY) * 1.5;
      state.targetY = state.lastY + deltaY;
      state.lastScrollTime = Date.now();
    };

    const handleTouchEnd = () => {
      state.isDragging = false;
    };

    const handleResize = () => {
      state.projectHeight = window.innerHeight;
      state.projects.forEach((project, index) => {
        project.style.transform = `translateY(${index * state.projectHeight}px)`;
        const parallaxImage = state.parallaxImages.get(index);
        if (parallaxImage) {
          parallaxImage.updateBounds();
        }
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("resize", handleResize);

    createInitialProjects();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles["packs-container"]}>
      <ul className={styles["packs-project-list"]}>
        {/* Hidden template for cloning */}
        <li
          className={`${styles["packs-project"]} ${styles["packs-template"]}`}
          style={{ display: "none" }}
        >
          <div className={styles["packs-side"]}>
            <div className={styles["packs-title"]}>
              <h1>Euphoria</h1>
              <h1>01</h1>
              <p className={styles["packs-description"]}>
                Sample description text goes here. This text should wrap reactively under the title.
              </p>
            </div>
          </div>
          <div className={styles["packs-side"]}>
            <div className={styles["packs-img"]}>
              <img alt="placeholder" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}  

export default Services;
