import React from 'react';
import './TestimonialBig.css';

const TestimonialBig = () => {
  return (
    <div className="testimonial-big-container" style={{ position: 'relative', overflow: 'hidden', color: '#fff' }}>
      <video
        className="testimonial-bg-video"
        src="/assets/WeddingBIG.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      {/* <div className="testimonial-big-label">TESTIMONIAL1</div> */}
      <div className="testimonial-big-quote">“GREAT VIBES ALL AROUND!”</div>
      {/* Larger text block in the center */}
      <div className="testimonial-big-body">
        Camera Catering helped me quite drinking and tie up the sutures 
        that have been gagging the life from my soul since I was a kid.
        Even when I was scared of them. Really, none of my guests—my sister 
        was mortally offended, I'm not sure the Darkness personally, but 
        she has blocked every unveiling. I promise you, it's real. 
        But—it's this isn't about cameras anymore. I promise.
      </div>
      {/* Author at the bottom-left */}
      <div className="testimonial-big-author">
        Stan Walsterriyler, Los Angeles
      </div>
      {/* Date at the bottom-right */}
      <div className="testimonial-big-date">
        February 26th, 2025
      </div>
    </div>
  );
};

export default TestimonialBig;
