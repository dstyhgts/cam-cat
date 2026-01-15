// Blog posts data - can be moved to a CMS or database later
// Shape reference for backend/CMS:
// {
//   id: number,
//   slug: string,                 // URL slug
//   title: string,
//   description: string,          // subtitle/standfirst
//   thumbnail: string,            // hero image
//   imageCredit: string,          // optional credit
//   generalCategory: string,      // e.g., "Tech"
//   indexTag: string,             // e.g., "Tablets"
//   category: string,             // badge/category label
//   author: string,
//   contributors: string[],       // optional additional authors
//   date: string,
//   relatedPosts: number[],       // list of post ids
//   content: string,              // HTML string with headings, imgs, links
// }

export const blogPosts = [
  {
    id: 1,
    slug: "the-art-of-capturing-moments",
    title: "The Art of Capturing Moments",
    description: "Discover the techniques and philosophy behind creating timeless photographs that tell a story.",
    thumbnail: "/assets/img1.JPG",
    imageCredit: "Apple",
    generalCategory: "Tech",
    indexTag: "Tablets",
    contributors: ["Tom May"],
    content: `
      <h2>The Art of Capturing Moments</h2>
      <p>Photography is more than just pointing a camera and pressing a button. It's about understanding light, composition, and the story you want to tell. In this comprehensive guide, we explore the fundamental principles that separate good photographs from great ones.</p>
      <p>Every moment is unique, and as photographers, our job is to preserve that uniqueness. Whether you're shooting a wedding, a corporate event, or a family gathering, the key is to be present and observant.</p>
      <img src="/assets/img1.JPG" alt="Photography in action" />
      <p>Light is the most important element in photography. Understanding how to work with natural light, artificial light, and the interplay between shadows and highlights can transform an ordinary scene into something extraordinary.</p>
      <h3>Understanding Natural Light</h3>
      <p>Natural light changes throughout the day, creating different moods and opportunities. The golden hour—that magical time just after sunrise and before sunset—provides soft, warm light that flatters subjects and creates depth.</p>
      <p>Midday light can be harsh, but with the right techniques, it can also create dramatic contrasts. Understanding how to position subjects relative to the light source is crucial for achieving the desired effect.</p>
      <h3>Working with Artificial Light</h3>
      <p>Indoor events often require working with artificial lighting. Learning to balance ambient light with flash or continuous lighting sources allows you to maintain the atmosphere while ensuring proper exposure.</p>
      <p>Diffusers, reflectors, and modifiers become essential tools in your kit. Each serves a specific purpose in shaping and controlling light to achieve your vision.</p>
      <h3>Composition and Storytelling</h3>
      <p>Great composition guides the viewer's eye and tells a story. The rule of thirds, leading lines, and framing techniques are starting points, but breaking these rules intentionally can create even more compelling images.</p>
      <p>Every element in the frame should serve a purpose. Whether it's a person, an object, or negative space, each component contributes to the overall narrative of the photograph.</p>
    `,
    date: "March 15, 2024",
    author: "Camera Catering Team",
    category: "Techniques",
    relatedPosts: [2, 3, 4]
  },
  {
    id: 2,
    slug: "event-photography-best-practices",
    title: "Event Photography Best Practices",
    description: "Learn the essential tips and tricks for capturing memorable events with professional quality.",
    thumbnail: "/assets/img2.JPG",
    imageCredit: "Camera Catering",
    generalCategory: "Tech",
    indexTag: "Events",
    contributors: [],
    content: `
      <h2>Event Photography Best Practices</h2>
      <p>Event photography requires a unique set of skills. You need to be prepared, adaptable, and always ready to capture the unexpected. Here are some best practices we've learned over years of shooting events.</p>
      <p>Preparation is key. Before any event, we scout the location, understand the lighting conditions, and prepare backup equipment. This preparation allows us to focus on capturing moments rather than troubleshooting technical issues.</p>
      <p>Building rapport with your subjects is crucial. People are more likely to be natural and relaxed when they trust the photographer. Take time to connect, even if it's just a brief conversation.</p>
    `,
    date: "March 10, 2024",
    author: "Camera Catering Team",
    category: "Tips",
    relatedPosts: [1, 7, 8]
  },
  {
    id: 3,
    slug: "choosing-the-right-camera-equipment",
    title: "Choosing the Right Camera Equipment",
    description: "A guide to selecting the perfect camera gear for different types of photography projects.",
    thumbnail: "/assets/img3.JPG",
    imageCredit: "Camera Catering",
    generalCategory: "Tech",
    indexTag: "Gear",
    contributors: [],
    content: `
      <h2>Choosing the Right Camera Equipment</h2>
      <p>The right equipment can make a significant difference in your photography, but it's important to remember that the best camera is the one you have with you. That said, understanding your options helps you make informed decisions.</p>
      <p>For event photography, we recommend cameras with excellent low-light performance, fast autofocus, and reliable battery life. Mirrorless cameras have become increasingly popular for their compact size and advanced features.</p>
      <p>Lenses are equally important. A good 24-70mm f/2.8 lens is versatile enough for most situations, while a 70-200mm f/2.8 is perfect for capturing candid moments from a distance.</p>
    `,
    date: "March 5, 2024",
    author: "Camera Catering Team",
    category: "Reviews",
    relatedPosts: [1, 4, 5]
  },
  {
    id: 4,
    slug: "post-processing-workflow",
    title: "Post-Processing Workflow",
    description: "Streamline your editing process with these professional post-processing techniques and workflows.",
    thumbnail: "/assets/img4.JPG",
    imageCredit: "Camera Catering",
    generalCategory: "Tech",
    indexTag: "Editing",
    contributors: [],
    content: `
      <h2>Post-Processing Workflow</h2>
      <p>A well-organized post-processing workflow can save hours of work and ensure consistent results across all your images. Here's how we approach editing at Camera Catering.</p>
      <p>We start with a consistent color grading approach that matches the mood and style of the event. This creates a cohesive look throughout the entire gallery.</p>
      <p>Organization is crucial. We use a systematic approach to file naming, folder structure, and metadata tagging that makes it easy to find and deliver images quickly.</p>
    `,
    date: "February 28, 2024",
    author: "Camera Catering Team",
    category: "Techniques",
    relatedPosts: [1, 3, 5]
  },
  {
    id: 5,
    slug: "building-client-relationships",
    title: "Building Client Relationships",
    description: "Tips for creating lasting relationships with clients through communication and exceptional service.",
    thumbnail: "/assets/img5.JPG",
    imageCredit: "Camera Catering",
    generalCategory: "Business",
    indexTag: "Clients",
    contributors: [],
    content: `
      <h2>Building Client Relationships</h2>
      <p>Great photography is only part of the equation. Building strong relationships with clients ensures repeat business and referrals. Communication is the foundation of any successful client relationship.</p>
      <p>We always start with a consultation to understand the client's vision, expectations, and any specific requirements. This upfront communication prevents misunderstandings and ensures we deliver exactly what they're looking for.</p>
      <img src="/assets/img5.JPG" alt="Client consultation meeting" />
      <p>Following up after an event is just as important. We check in with clients, share preview images, and make sure they're happy with the results. This attention to detail sets us apart.</p>
      <h3>The Initial Consultation</h3>
      <p>The first meeting with a client sets the tone for the entire relationship. We take time to listen, ask questions, and understand not just what they want, but why they want it. This deeper understanding helps us create images that truly resonate.</p>
      <p>During consultations, we discuss everything from timeline and logistics to style preferences and must-have shots. We also use this time to set clear expectations about deliverables, timelines, and communication protocols.</p>
      <h3>Maintaining Communication</h3>
      <p>Regular communication throughout the planning process builds trust and prevents last-minute surprises. We provide updates, answer questions promptly, and make ourselves available when clients need us.</p>
      <p>After the event, we follow a structured communication plan that includes preview images within 48 hours, regular updates on editing progress, and a final delivery that exceeds expectations.</p>
      <h3>Going the Extra Mile</h3>
      <p>Small gestures can make a big difference. Whether it's helping coordinate with other vendors, providing extra images, or simply being flexible when plans change, these moments of exceptional service create lasting impressions.</p>
      <p>We've found that clients remember how we made them feel just as much as they remember the quality of our work. By focusing on both, we build relationships that extend far beyond a single event.</p>
    `,
    date: "February 20, 2024",
    author: "Camera Catering Team",
    category: "Business",
    relatedPosts: [3, 4, 9]
  },
  {
    id: 6,
    slug: "the-future-of-event-photography",
    title: "The Future of Event Photography",
    description: "Exploring emerging trends and technologies shaping the future of event photography.",
    thumbnail: "/assets/img6.JPG",
    imageCredit: "Camera Catering",
    generalCategory: "News",
    indexTag: "Future",
    contributors: [],
    content: `
      <h2>The Future of Event Photography</h2>
      <p>The photography industry is constantly evolving, with new technologies and trends emerging regularly. From AI-assisted editing to instant sharing platforms, the way we capture and deliver images is changing.</p>
      <p>Live streaming and instant photo sharing have become increasingly important, especially for corporate events and weddings. Clients want to see and share their photos immediately.</p>
      <p>While technology advances, the fundamentals remain the same: capturing authentic moments, telling a story, and creating images that evoke emotion. The tools may change, but the art remains constant.</p>
    `,
    date: "February 15, 2024",
    author: "Camera Catering Team",
    category: "News",
    relatedPosts: [2, 7, 8]
  },
  {
    id: 7,
    slug: "wedding-photography-essentials",
    title: "Wedding Photography Essentials",
    description: "Everything you need to know about capturing the perfect wedding day from start to finish.",
    thumbnail: "/assets/img7.JPG",
    imageCredit: "Camera Catering",
    generalCategory: "Tips",
    indexTag: "Weddings",
    contributors: [],
    content: `
      <h2>Wedding Photography Essentials</h2>
      <p>Wedding photography is one of the most challenging and rewarding types of photography. You're capturing one of the most important days in someone's life, and there are no second chances.</p>
      <p>Preparation is everything. We create detailed timelines, coordinate with other vendors, and always have backup plans. Understanding the flow of the day helps us anticipate moments before they happen.</p>
      <p>Emotional intelligence is crucial. We need to be present and observant, ready to capture both the big moments and the small, intimate details that make each wedding unique.</p>
    `,
    date: "February 10, 2024",
    author: "Camera Catering Team",
    category: "Tips",
    relatedPosts: [2, 6, 8]
  },
  {
    id: 8,
    slug: "corporate-event-photography",
    title: "Corporate Event Photography",
    description: "Professional tips for capturing corporate events, conferences, and business gatherings.",
    thumbnail: "/assets/img8.JPG",
    imageCredit: "Camera Catering",
    generalCategory: "Tips",
    indexTag: "Corporate",
    contributors: [],
    content: `
      <h2>Corporate Event Photography</h2>
      <p>Corporate events require a different approach than weddings or social gatherings. The focus is often on professionalism, networking, and showcasing the company's brand.</p>
      <p>We pay special attention to capturing key speakers, networking moments, and the overall atmosphere of the event. These images are often used for marketing and company communications.</p>
      <p>Discretion is important. We blend into the background, capturing authentic moments without disrupting the flow of the event. This approach results in more natural, candid images.</p>
    `,
    date: "February 5, 2024",
    author: "Camera Catering Team",
    category: "Tips",
    relatedPosts: [2, 6, 7]
  },
  {
    id: 9,
    slug: "photography-business-tips",
    title: "Photography Business Tips",
    description: "Practical advice for running a successful photography business, from pricing to marketing.",
    thumbnail: "/assets/img9.JPG",
    imageCredit: "Camera Catering",
    generalCategory: "Business",
    indexTag: "Pricing",
    contributors: [],
    content: `
      <h2>Photography Business Tips</h2>
      <p>Running a photography business involves much more than taking great photos. You need to understand pricing, marketing, client management, and business operations.</p>
      <p>Pricing is one of the most challenging aspects. You need to cover your costs, pay yourself a fair wage, and remain competitive. We recommend starting with a clear understanding of your expenses and desired income.</p>
      <p>Marketing is essential for growth. Social media, word-of-mouth referrals, and a strong portfolio are all important. But the best marketing is consistently delivering exceptional work that exceeds client expectations.</p>
    `,
    date: "January 30, 2024",
    author: "Camera Catering Team",
    category: "Business",
    relatedPosts: [4, 5, 6]
  }
];

// Helper function to get post by slug
export function getPostBySlug(slug) {
  return blogPosts.find(post => post.slug === slug);
}

// Helper function to get all posts
export function getAllPosts() {
  return blogPosts;
}

// Helper function to get related posts
export function getRelatedPosts(currentPostId, relatedPostIds) {
  return blogPosts.filter(post => 
    relatedPostIds.includes(post.id) && post.id !== currentPostId
  );
}

// Helper function to get next and previous posts
export function getAdjacentPosts(currentPostId) {
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const currentIndex = sortedPosts.findIndex(post => post.id === currentPostId);
  
  return {
    next: currentIndex > 0 ? sortedPosts[currentIndex - 1] : null,
    prev: currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null
  };
}
