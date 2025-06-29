import React from 'react';
import './TestimonialSmall.css';

const TestimonialSmall = () => {
  return (
    <div className="testimonial-small-container" style={{ position: 'relative', overflow: 'hidden', color: '#fff' }}>
      <video
        className="testimonial-bg-video"
        src="/assets/PiggyBackRide.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      {/* <div className="testimonial-small-label">TESTIMONIAL1</div> */}
      <div className="testimonial-small-quote">“GREAT”</div>
      <div className="testimonial-small-author">Stan Walsterriyler, Los Angeles</div>
    </div>
  );
};

export default TestimonialSmall;
