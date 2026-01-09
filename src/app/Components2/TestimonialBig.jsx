import React, { useState, useRef, useEffect } from 'react';
import './TestimonialBig.css';

const TestimonialBig = ({ videoSrc = '/assets/UNCLE-JERRY-WEBSITE.mp4' }) => {
  const [videoLoading, setVideoLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPlayPauseButton, setShowPlayPauseButton] = useState(false);
  const videoRef = useRef(null);
  const progressContainerRef = useRef(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId = null;
    let isPlaying = false;

    const updateProgress = () => {
      if (video.duration && video.duration > 0) {
        const currentProgress = (video.currentTime / video.duration) * 100;
        setProgress(currentProgress);
      }
      
      if (isPlaying && !video.paused && !video.ended) {
        rafId = requestAnimationFrame(updateProgress);
      }
    };

    const handleLoadedMetadata = () => {
      if (video.duration && video.duration > 0) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const startAnimation = () => {
      isPlaying = true;
      setIsPlaying(true);
      if (!rafId) {
        rafId = requestAnimationFrame(updateProgress);
      }
    };

    const stopAnimation = () => {
      isPlaying = false;
      setIsPlaying(false);
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleLoadedMetadata);
    video.addEventListener('play', startAnimation);
    video.addEventListener('pause', stopAnimation);
    video.addEventListener('ended', () => {
      // When video ends and loops, restart animation
      stopAnimation();
      if (video.loop) {
        setTimeout(() => {
          if (!video.paused) {
            startAnimation();
          }
        }, 0);
      }
    });
    video.addEventListener('seeked', updateProgress);

    // Initial check
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    // Start if already playing
    if (!video.paused) {
      startAnimation();
    }

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleLoadedMetadata);
      video.removeEventListener('play', startAnimation);
      video.removeEventListener('pause', stopAnimation);
      video.removeEventListener('ended', stopAnimation);
      video.removeEventListener('seeked', updateProgress);
    };
  }, []);

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlayPause = (e) => {
    // Don't toggle if clicking on the audio button or progress bar
    if (e.target.closest('.audio-toggle-button') || e.target.closest('.video-progress-container')) {
      return;
    }
    
    if (videoRef.current) {
      if (videoRef.current.paused) {
        // Video is paused, so play it
        videoRef.current.play();
        setIsPlaying(true);
        // Show play button and then fade it out
        setShowPlayPauseButton(true);
        setTimeout(() => {
          setShowPlayPauseButton(false);
        }, 1000);
      } else {
        // Video is playing, so pause it
        videoRef.current.pause();
        setIsPlaying(false);
        // Show pause button and keep it visible
        setShowPlayPauseButton(true);
      }
    }
  };

  const handleProgressClick = (e) => {
    e.stopPropagation();
    if (!videoRef.current || !progressContainerRef.current) return;
    
    const rect = progressContainerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    
    if (videoRef.current.duration) {
      videoRef.current.currentTime = (percentage / 100) * videoRef.current.duration;
      setProgress(percentage);
    }
  };

  const handleProgressMouseDown = (e) => {
    e.stopPropagation();
    isDraggingRef.current = true;
    handleProgressClick(e);
  };

  const handleProgressMouseMove = (e) => {
    if (isDraggingRef.current && videoRef.current && progressContainerRef.current) {
      const rect = progressContainerRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
      
      if (videoRef.current.duration) {
        videoRef.current.currentTime = (percentage / 100) * videoRef.current.duration;
        setProgress(percentage);
      }
    }
  };

  const handleProgressMouseUp = () => {
    isDraggingRef.current = false;
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isDraggingRef.current && videoRef.current && progressContainerRef.current) {
        const rect = progressContainerRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
        
        if (videoRef.current.duration) {
          videoRef.current.currentTime = (percentage / 100) * videoRef.current.duration;
          setProgress(percentage);
        }
      }
    };

    const handleGlobalMouseUp = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  const Spinner = () => (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 2,
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div className="video-spinner" />
    </div>
  );
  return (
    <div 
      className="testimonial-big-container" 
      style={{ position: 'relative', overflow: 'hidden', color: '#fff', cursor: 'pointer' }}
      onClick={togglePlayPause}
    >
      {videoLoading && <Spinner />}
      <video
        ref={videoRef}
        className="testimonial-bg-video"
        src={videoSrc}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        onLoadStart={() => setVideoLoading(true)}
        onPlay={() => {
          setVideoLoading(false);
          setIsPlaying(true);
        }}
        onPause={() => setIsPlaying(false)}
      />
      {/* Play/Pause Button (Center) */}
      {showPlayPauseButton && (
        <div className={`play-pause-button-center ${isPlaying ? 'fade-out' : 'stay-visible'}`}>
          {isPlaying ? (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" fill="currentColor"/>
            </svg>
          ) : (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5v14l11-7z" fill="currentColor"/>
            </svg>
          )}
        </div>
      )}
      {/* Audio Toggle Button */}
      <button
        className="audio-toggle-button"
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" fill="currentColor"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="currentColor"/>
          </svg>
        )}
      </button>
      {/* Progress Bar */}
      <div 
        ref={progressContainerRef}
        className="video-progress-container"
        onClick={handleProgressClick}
        onMouseDown={handleProgressMouseDown}
        onMouseMove={handleProgressMouseMove}
        onMouseUp={handleProgressMouseUp}
        onTouchStart={(e) => {
          e.stopPropagation();
          handleProgressMouseDown(e);
        }}
        onTouchMove={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const touch = e.touches[0];
          if (touch && progressContainerRef.current) {
            const rect = progressContainerRef.current.getBoundingClientRect();
            const touchX = touch.clientX - rect.left;
            const percentage = Math.max(0, Math.min(100, (touchX / rect.width) * 100));
            if (videoRef.current && videoRef.current.duration) {
              videoRef.current.currentTime = (percentage / 100) * videoRef.current.duration;
              setProgress(percentage);
            }
          }
        }}
        onTouchEnd={(e) => {
          e.stopPropagation();
          handleProgressMouseUp();
        }}
      >
        <div 
          className="video-progress-bar" 
          style={{ 
            width: `${Math.max(progress, 0)}%`,
            minWidth: progress > 0 ? '2px' : '0'
          }} 
        />
      </div>
      {/* <div className="testimonial-big-label">TESTIMONIAL1</div> */}
      {/* <div className="testimonial-big-quote">“WHAT A FUN IDEA! I CAN DEF SEE THE APPEAL”</div> */}
      {/* Larger text block in the center */}
      {/* <div className="testimonial-big-body">
        Camera Catering helped me quite drinking and tie up the sutures 
        that have been gagging the life from my soul since I was a kid.
        Even when I was scared of them. Really, none of my guests—my sister 
        was mortally offended, I'm not sure the Darkness personally, but 
        she has blocked every unveiling. I promise you, it's real. 
        But—it's this isn't about cameras anymore. I promise.
      </div> */}
      {/* Author at the bottom-left */}
      {/* <div className="testimonial-big-author">
        Jared Renard, San Diego
      </div> */}
      {/* Date at the bottom-right */}
      {/* <div className="testimonial-big-date">
        June 21st, 2025
      </div> */}
      <style jsx global>{`
        .video-spinner {
          border: 6px solid #f3f3f3;
          border-top: 6px solid #555;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default TestimonialBig;
