"use client";

import Link from "next/link";
import styles from "./BlogNavbar.module.css";

export default function BlogNavbar() {
  return (
    <nav className={styles.blogNavbar}>
      <div className={styles.navInner}>
        <Link href="/blog" className={styles.brand}>
          <img
            src="/assets/camera-icon103.svg"
            alt="Blog"
            className={styles.brandIcon}
            width="48"
            height="48"
            loading="eager"
          />
        </Link>
        <div className={styles.navLinks}>
          <Link href="/blog" className={styles.navLink}>
            Blog
          </Link>
          <Link href="/" className={styles.navLink}>
            Camera Catering
          </Link>
        </div>
      </div>
    </nav>
  );
}
