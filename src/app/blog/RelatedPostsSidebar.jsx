"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./RelatedPostsSidebar.module.css";

export default function RelatedPostsSidebar({ relatedPosts, currentPostSlug }) {
  const pathname = usePathname();

  if (!relatedPosts || relatedPosts.length === 0) {
    return null;
  }

  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.sidebarTitle}>Related Articles</h3>
      <ul className={styles.relatedPostsList}>
        {relatedPosts.map((post) => {
          const isCurrent = pathname === `/blog/${post.slug}`;
          return (
            <li key={post.id} className={styles.relatedPostItem}>
              <Link
                href={`/blog/${post.slug}`}
                className={`${styles.relatedPostLink} ${isCurrent ? styles.current : ''}`}
              >
                {isCurrent && <span className={styles.currentMarker}>●</span>}
                <span className={styles.relatedPostTitle}>{post.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
