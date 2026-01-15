"use client";

import Link from "next/link";
import styles from "./BlogPostNavigation.module.css";

export default function BlogPostNavigation({ prev, next, position }) {
  return (
    <nav className={`${styles.navigation} ${styles[position]}`}>
      <div className={styles.navContainer}>
        {prev ? (
          <Link href={`/blog/${prev.slug}`} className={styles.navLink}>
            <span className={styles.navArrow}>←</span>
            <div className={styles.navContent}>
              <span className={styles.navLabel}>Previous</span>
              <span className={styles.navTitle}>{prev.title}</span>
            </div>
          </Link>
        ) : (
          <div className={styles.navLinkDisabled}>
            <span className={styles.navArrow}>←</span>
            <div className={styles.navContent}>
              <span className={styles.navLabel}>Previous</span>
            </div>
          </div>
        )}

        <Link href="/blog" className={styles.backToBlog}>
          Back to Blog
        </Link>

        {next ? (
          <Link href={`/blog/${next.slug}`} className={styles.navLink}>
            <div className={styles.navContent}>
              <span className={styles.navLabel}>Next</span>
              <span className={styles.navTitle}>{next.title}</span>
            </div>
            <span className={styles.navArrow}>→</span>
          </Link>
        ) : (
          <div className={styles.navLinkDisabled}>
            <div className={styles.navContent}>
              <span className={styles.navLabel}>Next</span>
            </div>
            <span className={styles.navArrow}>→</span>
          </div>
        )}
      </div>
    </nav>
  );
}
