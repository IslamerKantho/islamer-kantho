import SEO, { SITE_CONFIG } from "../../components/SEO";
import { useState, useCallback } from "react";
import Layout from "../../components/Layout";
import { getAllPosts } from "../api/api";
import ArchivePostCard from "@/components/card/ArchivePostCard";
import BlockPageHeader from "../../components/Block/BlockPageHeader";

const PageArticles = ({ data, slug, preview }) => {
  const [articles, setArticles] = useState(data || {});
  const [loading, setLoading] = useState(false);

  const categoryTitle =
    articles?.data?.[0]?.category?.title ||
    articles?.data?.[0]?.categories?.title ||
    slug ||
    "ক্যাটাগরি";

  const categoryUrl = `${SITE_CONFIG.domain}/category/${slug}`;

  const categoryJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": categoryUrl,
      "url": categoryUrl,
      "name": `${categoryTitle} | ${SITE_CONFIG.siteName}`,
      "isPartOf": {
        "@type": "WebSite",
        "@id": `${SITE_CONFIG.domain}/#website`,
        "name": SITE_CONFIG.siteName,
        "url": SITE_CONFIG.domain,
      },
      "inLanguage": "bn",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "প্রচ্ছদ",
          "item": SITE_CONFIG.domain,
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": categoryTitle,
          "item": categoryUrl,
        },
      ],
    },
  ];

  /**
   * Load More Handler
   */
  const loadMoreHandler = useCallback(() => {
    setLoading(true);
    fetch(`/api/articles?offset=${articles.offset}&limit=12&category=${slug}`)
      .then((data) => data.json())
      .then((data) => {
        setArticles({
          ...articles,
          data: [...articles.data, ...data.data],
          isPaginate: data.isPaginate,
          offset: data.offset,
        });
        setLoading(false);
      })
      .catch(() => {
        console.error("Something wrong!");
        setLoading(false);
      });
  }, [articles, slug]);

  return (
    <>
      <SEO
        title={categoryTitle}
        description={`${categoryTitle} বিভাগের সর্বাধুনিক প্রবন্ধ, গবেষণা ও নিবন্ধমালা - ${SITE_CONFIG.siteName}`}
        canonicalUrl={`/category/${slug}`}
        jsonLd={categoryJsonLd}
      />

      <Layout preview={preview}>
        <BlockPageHeader 
          title={`বিভাগ: ${categoryTitle}`} 
          subtitle={`${categoryTitle} বিভাগের সর্বাধুনিক প্রবন্ধ, গবেষণা ও নিবন্ধমালা`} 
        />
        <section className="w-full py-10 md:py-14">
          <div className="container">

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mb-12">
              {articles?.data.map((article) => (
                <ArchivePostCard key={article.slug} article={article} />
              ))}
            </div>

            {/* Pagination  */}
            {articles.isPaginate && (
              <div className="w-full flex justify-center items-center">
                <button
                  className="h-12 w-full max-w-[320px] py-2.5 px-4 bg-[#055547] hover:bg-[#055547ee] text-white font-semibold rounded transition-colors disabled:opacity-50"
                  disabled={loading}
                  onClick={loadMoreHandler}
                >
                  {loading ? "Loading..." : "Load more"}
                </button>
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx) {
  ctx.res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400"
  );

  const preview = false;
  const { slug } = ctx.query;
  const articles = await getAllPosts(false, 0, 12, slug);

  return {
    props: { data: articles, slug, preview },
  };
}

export default PageArticles;
