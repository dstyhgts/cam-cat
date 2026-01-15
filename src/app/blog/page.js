"use client";

import Link from "next/link";
import { getAllPosts } from "./blogData";
import styles from "./page.module.css";

export default function Blog() {
  const blogPosts = getAllPosts();

  return (
    <div className={styles.blogContainer}>
      <div className={styles.blogHeader}>
        <h1 className={styles.blogTitle}>Blog</h1>
        <p className={styles.blogSubtitle}>Stories, Tips, and Insights from Camera Catering</p>
      </div>
      
      <div className={styles.blogGrid}>
        {blogPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className={styles.blogCard}
            aria-label={`Read ${post.title}`}
          >
            <div className={styles.cardImageContainer}>
              <img
                src={post.thumbnail}
                alt={post.title}
                className={styles.cardImage}
              />
            </div>
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{post.title}</h2>
              <p className={styles.cardDescription}>{post.description}</p>
              <div className={styles.cardMeta}>
                <span className={styles.cardDate}>{post.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
