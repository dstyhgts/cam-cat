import React from 'react';
import './TestimonialMed.css';

const TestimonialMed = () => {
  return (
    <div className="testimonial-med-container" style={{ position: 'relative', overflow: 'hidden', color: '#fff' }}>
      <video
        className="testimonial-bg-video"
        src="/assets/Resturant1.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      {/* <div className="testimonial-med-label">TESTIMONIAL1</div> */}
      <div className="testimonial-med-quote">“BEST PART OF THE NIGHT!”</div>
      <div className="testimonial-med-author">Mindy A. - Los Angeles, CA</div>
    </div>
  );
};

export default TestimonialMed;
