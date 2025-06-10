

// app/page.js
"use client";
import Footer from "./Components/Footer";
import LandingGallery from "./Components/LandingGallery";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import ColorfulBranding from "./Components/ColorfulBranding";
import "./globals.css";
import ZoomScroll from "./Components/ZoomScroll";
import StickyScroll from "./Components/StickyScroll";
import ColorfulBranding2 from "./Components/ColorfulBranding2";
// import MainGrid from "./Components2/MainGrid";
import BigSvg from "./Components2/BigSvg";
import WelcomeCamera from "./Components2/WelcomeCamera";
import ThreeCards from "./Components2/ThreeCards";
import ImagesContainer from "./Components2/ImageContainer";
import NewNavbar from "./Components2/NewNavbar";
import SimpleStage from "./Components2/SimpleStage";
// import GlobalComponentsWrapper from "./Components/GlobalComponentsWrapper";




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>
        <NewNavbar />
        {/* <ImagesContainer /> */}
      <section id="section1" style={{ height: '100%', scrollMarginTop: '80px' }}>
        <WelcomeCamera />
        <ColorfulBranding />
      </section>
      <section id="section2" style={{ height: '100%', scrollMarginTop: '80px' }}>
      </section>
      <section id="section3" style={{ height: '100%', scrollMarginTop: '120px' }}>
        <BigSvg />
      </section>
      <section id="section4" style={{ height: '100%', scrollMarginTop: '200px' }}>
        {/* Content */}
      </section>
      <section id="section5" style={{ height: '100%', scrollMarginTop: '80px' }}>
        {/* Content */}
      </section>
      <section id="section6" style={{ height: '100%', scrollMarginTop: '300px' }}>
        <ThreeCards />
        <ColorfulBranding2 />

      </section>
      {/* <ImagesContainer /> */}
      {/* <SimpleStage  /> */}
      {/* <ColorfulBranding />
      <ColorfulBranding2 /> */}

        {/* <Footer /> */}
        </div>
        <Sidebar />
      </body>
    </html>
  );
}
