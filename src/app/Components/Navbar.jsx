"use client";
import Link from "next/link";



export default function Navbar() {
  return (
    <>
      <nav className="main-navbar preload">
        <div className="left">
          <Link href="/">
            <img src="/assets/camera-icon119.png" alt="Logo" />
          </Link>
        </div>
        <div className="center">
          <Link href="/"> CAMERA <br/> CATERING</Link>
        </div>
        <div className="right">
          <Link href="/projects">Projects</Link>
          <Link href="/Services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>
      <style jsx>{`
        .main-navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1em;
          background: transparent;
          color: #46bdc6;
          z-index: 100;
          opacity: 0; /* start hidden */
        }
        
        
        .right {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          gap: 1em;
          color: #46bdc6;
        }
        .right a {
          text-decoration: none;
          color: #46bdc6;
        }
        img {
          height: 40px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
