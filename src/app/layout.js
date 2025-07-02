// app/page.js
"use client";
import Footer from "./Components2/Footer";
import LandingGallery from "./Components2/LandingGallery";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components2/Sidebar";
import ColorfulBranding from "./Components2/ColorfulBranding";
import "./globals.css";
import ZoomScroll from "./Components/ZoomScroll";
import StickyScroll from "./Components/StickyScroll";
import ColorfulBranding2 from "./Components2/ColorfulBranding2";
// import MainGrid from "./Components2/MainGrid";
import BigSvg from "./Components2/BigSvg";
import WelcomeCamera from "./Components2/WelcomeCamera";
import ThreeCards from "./Components2/ThreeCards";
import ImagesContainer from "./Components2/ImageContainer";
import NewNavbar from "./Components2/NewNavbar";
import SimpleStage from "./Components2/SimpleStage";
import { ThemeProvider } from "./Components2/ThemeProvider";
// import GlobalComponentsWrapper from "./Components/GlobalComponentsWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/assets/camera-icon112.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/assets/camera-icon113.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/assets/camera-icon111.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/assets/camera-icon100.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/assets/camera-icon13.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/assets/camera-icon115.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/assets/camera-icon23.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/assets/camera-icon20.svg" as="image" type="image/svg+xml" />
      </head>
      <body>
        <ThemeProvider>
        <div>
          {/* <NewNavbar /> */}
          <NewNavbar />
          {/* <ImagesContainer /> */}
          <section id="section1" style={{ height: '100%', scrollMarginTop: '80px' }}>
            {/* <LandingGallery /> */}
            <WelcomeCamera />
            <ColorfulBranding />
          </section>
          <section id="main-content" style={{ width: '100%', scrollMarginTop: '50px' }}>
            <BigSvg />
            <ThreeCards />
            <ColorfulBranding2 />
            <Footer />

          </section>
          {/* <ImagesContainer /> */}
          {/* <SimpleStage  /> */}
          {/* <ColorfulBranding />
          <ColorfulBranding2 /> */}
          {/* <Footer /> */}
          
        </div>
        <Sidebar />
        </ThemeProvider>
      </body>
    </html>
  );
}
