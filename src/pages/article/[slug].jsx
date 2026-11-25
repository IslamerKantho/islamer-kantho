import { useState, useEffect, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import SEO, { SITE_CONFIG } from "../../components/SEO";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import ArticleCover from "../../components/Article/ArticleCover";
import ArticleHeader from "../../components/Article/ArticleHeader";
import SingleArticleContent from "../../components/Article/SingleArticleContent";
import ReadingProgressBar from "../../components/Article/ReadingProgressBar";
import ArticleTableOfContents from "../../components/Article/ArticleTableOfContents";
import Layout from "../../components/Layout";
import { getAllPostsWithSlug, getPostAndMorePosts, getSiteSettings } from "@/services/sanity.service";
import { imageBuilder } from "@/lib/sanity";
import SocialShare from "../../components/Article/SocialShare";
import { buildArticleReadingData } from "../../utils/articleContent.utils";

const ArticleReadingToolbar = dynamic(
  () => import("../../components/Article/ArticleReadingToolbar")
);
const BlockPostCarSlider = dynamic(
  () => import("@/components/Block/BlockPostCarSlider")
);

const FONT_SCALE_STORAGE_KEY = "ik_reader_font_scale";

export default function Post({ className, post, morePosts, settings, preview, ...rest }) {
  const router = useRouter();
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [fontScale, setFontScale] = useState("base");
  const [activeBlockKey, setActiveBlockKey] = useState(null);
  const [requestedPlayRequest, setRequestedPlayRequest] = useState(null);

  // Restore user's preferred reading font size from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const savedScale = window.localStorage.getItem(FONT_SCALE_STORAGE_KEY);
      if (savedScale && ["sm", "base", "lg", "xl"].includes(savedScale)) {
        setFontScale(savedScale);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleToggleReadingMode = useCallback(() => {
    setIsReadingMode((prev) => {
      const nextMode = !prev;
      if (!nextMode) {
        setActiveBlockKey(null);
        setRequestedPlayRequest(null);
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          window.speechSynthesis.cancel();
        }
      }
      return nextMode;
    });
  }, []);

  const handleChangeFontScale = useCallback((nextScale) => {
    setFontScale(nextScale);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(FONT_SCALE_STORAGE_KEY, nextScale);
      } catch {
        // Ignore storage errors
      }
    }
  }, []);

  const { ttsSegments, tocItems, verseItems } = useMemo(
    () => buildArticleReadingData(post),
    [post]
  );

  const handleJumpToBlock = useCallback((blockKey, anchorId) => {
    setActiveBlockKey(blockKey);
    if (typeof document !== "undefined") {
      const target = document.getElementById(anchorId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, []);

  const handlePlayFromBlock = useCallback((blockKey) => {
    setRequestedPlayRequest({ blockKey, timestamp: Date.now() });
    if (typeof document !== "undefined") {
      const target = document.getElementById(`article-block-${blockKey}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, []);

  const articleUrl = post?.slug ? `${SITE_CONFIG.domain}/article/${post.slug}` : SITE_CONFIG.domain;
  const imageUrl = post?.coverImage
    ? imageBuilder(post.coverImage).url()
    : SITE_CONFIG.defaultOgImage;

  const articleJsonLd = post?.slug
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": articleUrl,
        },
        "headline": post.title,
        "description": post.excerpt || "",
        "image": imageUrl ? [imageUrl] : undefined,
        "inLanguage": "bn",
        "datePublished": post?.date?.createdAt || undefined,
        "dateModified": post?.date?.updatedAt || post?.date?.createdAt || undefined,
        "author": post?.author?.name
          ? {
              "@type": "Person",
              "name": post.author.name,
            }
          : {
              "@type": "Organization",
              "name": SITE_CONFIG.siteName,
              "url": SITE_CONFIG.domain,
            },
        "publisher": {
          "@type": "Organization",
          "name": SITE_CONFIG.siteName,
          "url": SITE_CONFIG.domain,
          "logo": {
            "@type": "ImageObject",
            "url": `${SITE_CONFIG.domain}/img/branding/favicon.png`,
          },
        },
      }
    : null;

  const readingTime = Math.max(
    1,
    Math.ceil(JSON.stringify(post?.body || "").split(" ").length / 250)
  );

  const referencesList =
    post?.references?.length > 0
      ? post.references
      : post?.referenceLinks?.length > 0
      ? post.referenceLinks
      : [];

  return (
    <Layout preview={preview} settings={settings}>
      {router.isFallback ? (
        <p className="p-10 text-center">Loading…</p>
      ) : (
        <>
          <SEO
            title={post.seo?.metaTitle || post.title}
            description={post.seo?.metaDescription || post.excerpt}
            keywords={post.seo?.keywords?.join(", ")}
            canonicalUrl={`/article/${post.slug}`}
            ogType="article"
            ogImage={post.seo?.ogImageUrl || imageUrl}
            publishedTime={post.publishedAt || post?.date?.createdAt}
            modifiedTime={post?.date?.updatedAt || post.publishedAt || post?.date?.createdAt}
            authorName={post?.author?.name}
            categoryName={
              Array.isArray(post?.categories)
                ? post.categories[0]?.title
                : post?.categories?.title || post?.category?.title
            }
            noIndex={post.seo?.noIndex}
            jsonLd={articleJsonLd}
          />

          {/* Top Fixed Scroll-Based Progress Bar & Floating Scroll-to-Top Indicator (Only in Reading Mode) */}
          {isReadingMode && (
            <ReadingProgressBar targetId="article-reading-container" />
          )}

          <article
            className={`${className || ""} transition-colors duration-300 ${
              isReadingMode ? "bg-[#FAF8F5]" : ""
            }`}
            {...rest}
          >
            <div id="article-reading-container">
              <section
                className={`ik_article_header transition-all duration-300 ${
                  isReadingMode ? "py-8 md:py-12" : "py-5 md:py-14"
                }`}
              >
                <div className="container">
                  {isReadingMode ? (
                    <div className="max-w-[680px] mx-auto">
                      <ArticleHeader
                        title={post.title}
                        excerpt={post.excerpt}
                        author={post.author}
                        category={post.categories || post.category}
                        date={post.date}
                        slug={post.slug}
                        readingTime={readingTime}
                        isReadingMode={isReadingMode}
                        onToggleReadingMode={handleToggleReadingMode}
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                      <div className="md:col-span-5">
                        <ArticleHeader
                          title={post.title}
                          excerpt={post.excerpt}
                          author={post.author}
                          category={post.categories || post.category}
                          date={post.date}
                          slug={post.slug}
                          readingTime={readingTime}
                          isReadingMode={isReadingMode}
                          onToggleReadingMode={handleToggleReadingMode}
                        />
                      </div>

                      <div className="md:col-span-7">
                        <ArticleCover src={post.coverImage} title={post.title} />
                      </div>
                    </div>
                  )}
                </div>
              </section>

              <hr className="border-gray-200" />

              <section className="ik_sarticle_content py-5 md:py-10">
                <div
                  className={`container mx-auto transition-all duration-300 ${
                    isReadingMode ? "max-w-[680px]" : "max-w-4xl"
                  }`}
                >
                  {/* Read Out Loud Audio Player, Editorial Comfort Toolbar & Table of Contents (Only in Reading Mode) */}
                  {isReadingMode && (
                    <>
                      <ArticleReadingToolbar
                        post={post}
                        ttsSegments={ttsSegments}
                        fontScale={fontScale}
                        onChangeFontScale={handleChangeFontScale}
                        activeBlockKey={activeBlockKey}
                        onActiveBlockChange={setActiveBlockKey}
                        requestedPlayRequest={requestedPlayRequest}
                      />

                      <ArticleTableOfContents
                        tocItems={tocItems}
                        verseItems={verseItems}
                        activeBlockKey={activeBlockKey}
                        onJumpToBlock={handleJumpToBlock}
                        onPlayFromBlock={handlePlayFromBlock}
                      />
                    </>
                  )}

                  <SingleArticleContent
                    content={post.body}
                    fontScale={fontScale}
                    activeBlockKey={activeBlockKey}
                    isReadingMode={isReadingMode}
                  />

                  {referencesList.length > 0 && (
                    <div
                      className={`${
                        isReadingMode ? "max-w-[580px]" : "max-w-[610px]"
                      } mx-auto mt-6 p-4 rounded-xl bg-[#FAF8F5] border border-[#E2D9C8]`}
                    >
                      <h3 className="text-[15px] font-bold text-[#044f4f] mb-2.5">
                        * তথ্যসূত্র ও প্রামাণ্য গ্রন্থাবলি:
                      </h3>
                      <ol className="list-decimal list-inside space-y-1.5 text-sm text-slate-700">
                        {referencesList.map((link, idx) => (
                          <li key={idx}>
                            {link.url ? (
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#044f4f] font-medium hover:underline"
                              >
                                {link.title || link.url}
                              </a>
                            ) : (
                              <span>{link.title || link}</span>
                            )}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Share Buttons Section (Outside #article-reading-container so reading progress finishes right above it) */}
            <section className="pb-8 md:pb-12 print:hidden">
              <div
                className={`container mx-auto ${
                  isReadingMode ? "max-w-[680px]" : "max-w-4xl"
                }`}
              >
                <div className="pt-8 border-t border-gray-200 flex flex-col items-center justify-center">
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                    শেয়ার করুন
                  </h4>
                  <SocialShare title={post.title} slug={post.slug} />
                </div>
              </div>
            </section>

            {!isReadingMode && (
              <div className="print:hidden">
                <BlockPostCarSlider title="আরও পড়ুন" posts={morePosts} />
              </div>
            )}
          </article>
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview);

  if (!data?.post) {
    return { notFound: true };
  }

  const settings = await getSiteSettings(preview);

  return {
    props: {
      preview,
      post: data?.post || null,
      morePosts: data?.morePosts || null,
      settings: settings || null,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths:
      allPosts?.map((post) => ({
        params: {
          slug: post.slug,
        },
      })) || [],
    fallback: true,
  };
}

Post.propTypes = {
  className: PropTypes.string,
  post: PropTypes.object,
  morePosts: PropTypes.array,
  preview: PropTypes.bool,
};
