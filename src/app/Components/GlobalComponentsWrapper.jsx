"use client";

import { usePathname } from "next/navigation";
import LandingGallery from "./LandingGallery.jsx";
import HorizontalScroll from "./HorizontalScroll.jsx";
import Footer from "../Components2/Footer";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import CardScroll from "./CardScroll.jsx";
import ZoomScroll from "./ZoomScroll.jsx";
import StickyScroll from "./StickyScroll.jsx";
import { Color } from "p5";
import ColorfulBranding from '../Components2/ColorfulBranding';
import ColorfulBranding2 from '../Components2/ColorfulBranding2';

export default function GlobalComponentsWrapper() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  console.log("GlobalComponentsWrapper rendered on:", pathname, "isHomePage:", isHomePage);

  return (
    <>
      {isHomePage && (
        <>
          <LandingGallery />
          <ZoomScroll />
          {/* <StickyScroll />
          <HorizontalScroll />
          <CardScroll /> */}
          <ColorfulBranding />
          <ColorfulBranding2 />
          <Footer />
        </>
      )}
      {/* Always render these components */}
      <Sidebar />
      <Navbar />
    </>
  );
}








