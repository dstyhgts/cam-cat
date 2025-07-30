import React, { useState } from 'react';
import './TestimonialBig.css';

const TestimonialBig = () => {
  const [videoLoading, setVideoLoading] = useState(true);
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
    <div className="testimonial-big-container" style={{ position: 'relative', overflow: 'hidden', color: '#fff' }}>
      {videoLoading && <Spinner />}
      <video
        className="testimonial-bg-video"
        src="/assets/The Cousins_1.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        onLoadStart={() => setVideoLoading(true)}
        onPlay={() => setVideoLoading(false)}
      />
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
