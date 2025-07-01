import React, { useState } from 'react';
import './TestimonialMed.css';

const TestimonialMed = () => {
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
    <div className="testimonial-med-container" style={{ position: 'relative', overflow: 'hidden', color: '#fff' }}>
      {videoLoading && <Spinner />}
      <video
        className="testimonial-bg-video"
        src="/assets/Resturant1.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        onLoadStart={() => setVideoLoading(true)}
        onPlay={() => setVideoLoading(false)}
      />
      {/* <div className="testimonial-med-label">TESTIMONIAL1</div> */}
      <div className="testimonial-med-quote">“BEST PART OF THE NIGHT!”</div>
      <div className="testimonial-med-author">Mindy A. - Los Angeles, CA</div>
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

export default TestimonialMed;
