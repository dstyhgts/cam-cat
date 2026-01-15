"use client";

import { useEffect, useRef } from "react";
import styles from "./BlogPostModal.module.css";

export default function BlogPostModal({ post, onClose }) {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Handle click outside modal
  const handleBackdropClick = (e) => {
    if (modalRef.current && e.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      className={styles.modalBackdrop}
      onClick={handleBackdropClick}
    >
      <div className={styles.modalContainer}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close blog post"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className={styles.modalContent} ref={contentRef}>
          <div className={styles.modalHeader}>
            <h1 className={styles.modalTitle}>{post.title}</h1>
            <div className={styles.modalMeta}>
              <span className={styles.modalDate}>{post.date}</span>
              <span className={styles.modalAuthor}>{post.author}</span>
            </div>
          </div>

          <div className={styles.modalImageContainer}>
            <img
              src={post.thumbnail}
              alt={post.title}
              className={styles.modalImage}
            />
          </div>

          <div
            className={styles.modalBody}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </div>
  );
}
