import React from 'react';
import { PopupButton } from '@typeform/embed-react';
import './ThreeCards.css';

const ThreeCards = () => {
  // Example data for the three cards
  // Instead of a "body" string, we have a "content" prop that is a React node.
  const cardData = [
    {
      title: "WHAT?",
      content: (
        <>
          <h2><i>Our Complete Content Solution:</i></h2>
          <p>
          We provide a <strong>complete,</strong> <em>immersive record</em> of your event—captured 
          entirely by the people experiencing it. <br />
          </p>
          <p1>🔹 25-100 vintage photo & video cameras in play, including camcorders, point-and-shoots, and instant print cameras.
             <br/> 🔹 A fully interactive memory-making experience where guests don't just pose for photos—they create them.
             <br/> 🔹 A rapid-printing camera experience—a new kind of nostalgia that's tactile, shareable, and completely unique.
             <br/> 🔹 A complete archive of the event, curated and uploaded for both the host and every guest to relive.<br/><br/></p1>
          <p>It's not about megapixels—it's about perspective. Instead of getting 
          one polished highlight reel, you get a real, multi-angle, guest-driven 
          record of the night.
          <em><br/><br/>Your event isn't just photographed—it's experienced, captured, and remembered.</em></p>
        </>
      ),
    },
    {
      title: "WHY?",
      content: (
        <>
          <h2><i>Event photography is missing something.</i>
          </h2>
          <p1>
          A single photographer captures one perspective. A videographer follows one 
          storyline. A photobooth creates staged moments.
          <br/>At most events, guests leave with maybe a handful of professional photos—if 
          they're lucky. But the truth is, the best moments happen between the photos 
          that get taken.   </p1>
          <p><br/>With Camera Catering Center, you don't just get photos. You get the full 
          memory.
          </p>
          <p1>
                ✅ A full-scale photography, video, and print experience—without hiring a single photographer or videographer.
          <br/>✅ A guest-driven archive of real, personal moments—POV shots, behind-the-scenes chaos, and everything in between.
          <br/>✅ A fully interactive, hands-on experience that guests love.
          </p1>
          <p><br/>Instead of a few polished images, you get hundreds, sometimes thousands of 
            pieces of content—raw, real, and unforgettable.
            <em><br/><br/>You're not just capturing moments—you're creating the entire story.</em></p>
        </>
      ),
    },
    {
      title: "HOW?",
      content: (
        <>
        <h2><i>We set the stage.</i></h2>
        <p>We don't just drop cameras and disappear. We facilitate, capture, and deliver immediate content creation.
        </p>
          <h2>The Event</h2>

          <p1>✅We set up a Camera Bar with 25-100 vintage cameras—handing them off, rotating them, making sure they get used.
          <br/>✅Guests take the lead—snapping, passing, filming, and recording every possible perspective.
          <br/>✅Cam-Tenders keep things moving, capturing their own shots and making sure the cameras stay in circulation.</p1>
        
          <h2>The Content</h2>
          <p1>(Infinite Possibilities)     <br/></p1>
          <p1>🔹Instant print cameras deliver real-time black & white photos, printed and shared instantly.
          <br/>🔹Every digital and video camera captures a rolling record of the night—grainy, cinematic, and deeply personal.
          <br/><i>🔹 Truly a limitless amount if images and videos.</i>
          </p1>

          <h2>The Delivery</h2>
          <p1>-✅Everything is reviewed, refined, and uploaded—we sift through the footage, remove the unusable shots, and make sure everything is of quality.
          <br/>✅All content is delivered on a private event website—shared not just with the host, but with every guest.
          <br/>✅Photos & videos are auto-tagged by the guest who took them, the camera used, and the people in them.
          <br/>✅Privacy controls allow guests to blur themselves across any images or videos.
          <br/>✅Guests can easily upload their own photos & videos to contribute to the full memory archive.</p1>

          <p><br/><i>The result? A fully organized, fully interactive, full-event memory system. A way to relive the event from every perspective, as if you were everywhere at once.</i></p>
        
        </>
      ),
    },
  ];

  return (
    <div className="three-cards-grid" id="threecards">
      {/* Render 3 cards in the first row */}
      {cardData.map((card, index) => (
        <div className="three-card-item" key={index}>
          {/* Top Rectangle */}
          <div className="three-card-top">
            <h2 className="three-card-title">{card.title}</h2>
          </div>

          {/* Middle Rectangle (extended downward) */}
          <div className="three-card-middle">
            {card.content}
          </div>
        </div>
      ))}

      {/* Single button on second row, centered under the middle card */}
      <div className="order-btn-desktop" style={{ position: 'relative', width: 'fit-content', pointerEvents: 'auto', zIndex: 10, margin: '2rem auto', transform: 'rotate(3deg)' }}>
        <PopupButton
          id="yyPNXkPK"
          className="order-button"
          size={80}
          style={{ width: '100%', zIndex: 10, position: 'relative', pointerEvents: 'auto', whiteSpace: 'nowrap', fontSize: '2.2rem' }}
        >
          GET CAMERAS!
        </PopupButton>
      </div>
    </div>
  );
};

export default ThreeCards;
