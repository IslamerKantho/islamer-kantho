import Head from "next/head";
import { memo } from "react";

const SITE_CONFIG = {
  siteName: "ইসলামের কন্ঠ",
  domain: "https://islamerkantho.org",
  defaultTitle: "ইসলামের কন্ঠ - বাংলা ভাষায় বিশুদ্ধ ইসলামী জ্ঞানের ক্ষেত্র",
  defaultDescription:
    "“ইসলামের কন্ঠ” এর মাধ্যমে জনসম্মুখে ‘আহলে সুন্নাত ওয়াল জামাআত’ এর আক্বীদাহ অনুযায়ী ইসলামের সঠিক চিত্র উপস্থাপন, সেই সাথে অপব্যাখ্যা ও ভ্রান্ত ধারনা নিরসনের লক্ষ্যে কাজ করা আমাদের একমাত্র উদ্দেশ্য।",
  defaultOgImage: "https://islamerkantho.org/img/branding/og_image.jpeg",
  twitterHandle: "@islamer_kantho",
  locale: "bn_BD",
};

const SEO = ({
  title,
  description,
  canonicalUrl,
  ogType = "website",
  ogImage,
  publishedTime,
  modifiedTime,
  authorName,
  categoryName,
  jsonLd,
  noindex = false,
}) => {
  const fullTitle = title
    ? `${title} | ${SITE_CONFIG.siteName}`
    : SITE_CONFIG.defaultTitle;

  const metaDescription = description || SITE_CONFIG.defaultDescription;

  // Format canonical URL
  let fullCanonicalUrl = SITE_CONFIG.domain;
  if (canonicalUrl) {
    fullCanonicalUrl = canonicalUrl.startsWith("http")
      ? canonicalUrl
      : `${SITE_CONFIG.domain}${canonicalUrl.startsWith("/") ? "" : "/"}${canonicalUrl}`;
  }

  // Format image URL
  let fullOgImage = SITE_CONFIG.defaultOgImage;
  if (ogImage) {
    fullOgImage = ogImage.startsWith("http")
      ? ogImage
      : `${SITE_CONFIG.domain}${ogImage.startsWith("/") ? "" : "/"}${ogImage}`;
  }

  return (
    <Head>
      {/* Basic Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={fullCanonicalUrl} />

      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content={SITE_CONFIG.siteName} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title || SITE_CONFIG.siteName} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:locale" content={SITE_CONFIG.locale} />

      {ogType === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === "article" && authorName && (
        <meta property="article:author" content={authorName} />
      )}
      {ogType === "article" && categoryName && (
        <meta property="article:section" content={categoryName} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE_CONFIG.twitterHandle} />
      <meta name="twitter:title" content={title || SITE_CONFIG.siteName} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Structured Data (LD+JSON) */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  );
};

export default memo(SEO);
export { SITE_CONFIG };
