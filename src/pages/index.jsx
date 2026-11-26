import SEO, { SITE_CONFIG } from "../components/SEO";
import { useCallback, useState } from "react";
import TrendingPosts from "../components/Block/TrendingPosts";
import HeroBanner from "../components/HeroBanner";
import Layout from "../components/Layout";
import ArticlePreviewGrid from "../components/Block/ArticlePreviewGrid";
import {
  getAllPosts,
  getFeaturedPost,
  getRecommendedPost,
  getSiteSettings,
} from "@/services/sanity.service";
import DottedDivider from "../components/DottedDivider";
import dynamic from "next/dynamic";

const BlockPostCarSlider = dynamic(
  () => import("../components/Block/BlockPostCarSlider")
);
const BlockBanner = dynamic(() => import("../components/Block/BlockBanner"));

const homepageJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.domain}/#website`,
    "url": SITE_CONFIG.domain,
    "name": SITE_CONFIG.siteName,
    "description": SITE_CONFIG.defaultDescription,
    "inLanguage": "bn",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SITE_CONFIG.domain}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_CONFIG.domain}/#organization`,
    "name": SITE_CONFIG.siteName,
    "url": SITE_CONFIG.domain,
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_CONFIG.domain}/img/branding/favicon.png`,
    },
  },
];

export default function Home({
  featuredPosts,
  recommendedPosts,
  allPosts,
  settings,
}) {
  const [featuredPost] = useState(featuredPosts);
  const [recommendedPost] = useState(recommendedPosts);
  const [recentArticles, setRecentArticles] = useState(allPosts);
  const [loading, setLoading] = useState(false);

  /**
   * Load More Handler
   */
  const loadMoreHandler = useCallback(() => {
    setLoading(true);
    fetch(`/api/articles?offset=${recentArticles.offset}&limit=9`)
      .then((data) => data.json())
      .then((data) => {
        setRecentArticles({
          ...recentArticles,
          data: [...recentArticles.data, ...data.data],
          isPaginate: data.isPaginate,
          offset: data.offset,
        });
        setLoading(false);
      })
      .catch(() => {
        console.error("Something wrong!");
        setLoading(false);
      });
  }, [recentArticles]);

  return (
    <>
      <SEO canonicalUrl="/" jsonLd={homepageJsonLd} />

      <Layout settings={settings}>
        <HeroBanner post={featuredPost[0]} />
        <TrendingPosts posts={featuredPost.slice(1)} />

        {/* Recommended Articles */}
        {recommendedPost && (
          <BlockPostCarSlider
            posts={recommendedPost}
            title="নির্বাচিত লেখাসমুহ"
          />
        )}

        <BlockBanner />
        <DottedDivider />

        {/* Responsive 3-Column Article Preview Grid Section */}
        <section className="w-full py-10 md:py-14">
          <div className="container">
            <ArticlePreviewGrid
              title="সাম্প্রতিক লেখাসমূহ"
              subtitle="ইসলামের কন্ঠে প্রকাশিত সর্বশেষ প্রবন্ধ, তাফসীর, হাদীস ও জীবন জিজ্ঞাসা"
              posts={recentArticles?.data || []}
              isPaginate={recentArticles?.isPaginate}
              initialOffset={recentArticles?.offset || 9}
              pageSize={9}
              showCategoryFilter={true}
              loading={loading}
              onLoadMore={loadMoreHandler}
            />
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const featuredArticleRange = [0, 10];

  const featuredPosts = await getFeaturedPost(preview, featuredArticleRange);
  const recommendedPosts = await getRecommendedPost(preview, [0, 7]);
  const allPosts = await getAllPosts(false, 0, 9);
  const settings = await getSiteSettings(preview);

  return {
    props: { featuredPosts, recommendedPosts, allPosts, settings, preview },
    revalidate: 60 * 60 * 12,
  };
}
