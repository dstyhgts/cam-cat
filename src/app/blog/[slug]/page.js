"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getRelatedPosts, getAdjacentPosts } from "../blogData";
import BlogPostNavigation from "../BlogPostNavigation";
import RelatedPostsSidebar from "../RelatedPostsSidebar";
import styles from "./page.module.css";

const slugify = (text = "") =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug;
  const post = getPostBySlug(slug);
  const bodyRef = useRef(null);
  const articleRef = useRef(null);
  const [toc, setToc] = useState([]);
  const [copied, setCopied] = useState(false);
  const [segmentHeight, setSegmentHeight] = useState(600);

  const popularLinks = [
    { label: "Cameras", href: "/blog" },
    { label: "Tech", href: "/blog" },
    { label: "Tablets", href: "/blog" },
    { label: "Buying Guides", href: "/blog" },
    { label: "Reviews", href: "/blog" },
  ];

  useEffect(() => {
    if (!bodyRef.current) return;
    const headings = Array.from(bodyRef.current.querySelectorAll("h2, h3"));

    const items = headings.map((el) => {
      const text = el.textContent || "";
      const id = el.id || slugify(text);
      if (!el.id) el.id = id;
      return { id, text, level: el.tagName.toLowerCase() };
    });

    setToc(items);
  }, [post?.content]);

  // Measure article height to distribute ad slices evenly
  useEffect(() => {
    const measure = () => {
      if (!articleRef.current) return;
      const adsCount = 3;
      const h = articleRef.current.offsetHeight || 0;
      const slice = Math.max(Math.floor(h / adsCount), 320);
      setSegmentHeight(slice);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [post?.content]);

  const handleCopyLink = async () => {
    if (typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      setCopied(false);
    }
  };

  if (!post) {
    return (
      <div className={styles.blogPostContainer}>
        <div className={styles.blogPostContent}>
          <h1>Post Not Found</h1>
          <Link href="/blog">Back to Blog</Link>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post.id, post.relatedPosts || []);
  const { next, prev } = getAdjacentPosts(post.id);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className={styles.blogPostWrapper}>
      {/* Popular bar */}
      <div className={styles.popularBar}>
        <div className={styles.popularInner}>
          <span className={styles.popularLabel}>Popular:</span>
          <div className={styles.popularLinks}>
            {popularLinks.map((item) => (
              <Link key={item.label} href={item.href} className={styles.popularLink}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.blogPostContainer}>
        {/* Article Header */}
        <header className={styles.articleHeader}>
          <div className={styles.articleHeaderContent}>
            <nav className={styles.breadcrumbs}>
              <Link href="/blog">{post.generalCategory || "Blog"}</Link>
              {post.indexTag && (
                <>
                  <span className={styles.breadcrumbDivider}>/</span>
                  <Link href="/blog" className={styles.breadcrumbCurrent}>
                    {post.indexTag}
                  </Link>
                </>
              )}
            </nav>
            <h1 className={styles.articleTitle}>{post.title}</h1>
            <div className={styles.articleMeta}>
              {post.category && (
                <span className={styles.articleCategory}>{post.category}</span>
              )}
              <span className={styles.articleByline}>
                By <span className={styles.authorName}>{post.author}</span>
                {post.contributors && post.contributors.length > 0 && (
                  <> • Contributions from {post.contributors.join(", ")} </>
                )}
                {post.date && <span className={styles.articleDate}> • {post.date}</span>}
              </span>
            </div>
            {post.description && (
              <p className={styles.subtitle}>{post.description}</p>
            )}
            <p className={styles.affiliateNote}>
              When you purchase through links on our site, we may earn an affiliate commission.{" "}
              <a href="/blog" className={styles.affiliateLink}>Here’s how it works.</a>
            </p>
          </div>
        </header>

        {/* Main Content Area with Sidebar */}
        <div className={styles.contentLayout}>
          {/* Left rail: Related (static) above Jump To (sticky) */}
          <aside className={styles.leftRail}>
            <div className={styles.relatedBlock}>
              <RelatedPostsSidebar 
                relatedPosts={relatedPosts} 
                currentPostSlug={post.slug}
              />
            </div>
            {toc.length > 0 && (
              <div className={styles.tocSticky}>
                <div className={styles.toc}>
                  <h4 className={styles.tocTitle}>Jump to</h4>
                  <ul className={styles.tocList}>
                    {toc.map((item) => (
                      <li
                        key={item.id}
                        className={`${styles.tocItem} ${
                          item.level === "h3" ? styles.tocItemSub : ""
                        }`}
                      >
                        <a href={`#${item.id}`} className={styles.tocLink}>
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </aside>

          {/* Main Article Content */}
          <main className={styles.mainContent}>
            <article className={styles.article} ref={articleRef}>
              {/* Hero Image */}
              {post.thumbnail && (
                <div className={styles.heroImageContainer}>
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className={styles.heroImage}
                  />
                  {post.imageCredit && (
                    <div className={styles.imageCredit}>Image credit: {post.imageCredit}</div>
                  )}
                </div>
              )}

              {/* Share Bar */}
              <div className={styles.shareBar}>
                <span className={styles.shareLabel}>Share:</span>
                <button className={styles.shareButton} onClick={handleCopyLink}>
                  {copied ? "Copied" : "Link"}
                </button>
                <a
                  className={styles.shareButton}
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X
                </a>
                <a
                  className={styles.shareButton}
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
                <a
                  className={styles.shareButton}
                  href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(currentUrl)}`}
                >
                  Email
                </a>
              </div>

              {/* Article Content */}
              <div
                ref={bodyRef}
                className={styles.articleBody}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Ad Placement Areas (in-article) */}
              <div className={styles.adPlacement}>
                <div className={styles.adPlaceholder}>
                  Advertisement
                </div>
              </div>
            </article>

            {/* Bottom Navigation */}
            <BlogPostNavigation prev={prev} next={next} position="bottom" />
          </main>

          {/* Right rail: Sticky ads */}
          <aside className={styles.adRail}>
            <div
              className={styles.adWrapper}
              style={{ height: `${segmentHeight}px` }}
            >
              <div className={`${styles.adBlock} ${styles.adSmall}`}></div>
            </div>
            <div
              className={styles.adWrapper}
              style={{ height: `${segmentHeight}px` }}
            >
              <div className={`${styles.adBlock} ${styles.adTall}`}></div>
            </div>
            <div
              className={styles.adWrapper}
              style={{ height: `${segmentHeight}px` }}
            >
              <div className={`${styles.adBlock} ${styles.adSkyscraper}`}></div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
