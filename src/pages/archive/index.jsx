import SEO, { SITE_CONFIG } from "@/components/SEO";
import { useState, useCallback } from "react";
import Layout from "../../components/Layout";
import { getAllPosts, getSiteSettings } from "../api/api";
import ArchivePostCard from "@/components/card/ArchivePostCard";
import BlockPageHeader from "../../components/Block/BlockPageHeader";

const PageArticles = ({ data, settings, preview }) => {
  const [articles, setArticles] = useState(data || {});
  const [loading, setLoading] = useState(false);

  const archiveUrl = `${SITE_CONFIG.domain}/archive`;

  const archiveJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": archiveUrl,
      "url": archiveUrl,
      "name": `আর্কাইভ | ${SITE_CONFIG.siteName}`,
      "description": `ইসলামের কন্ঠ পত্রিকার সকল প্রবন্ধ ও লেখালেখির সংগ্রহশালা।`,
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
          "name": "আর্কাইভ",
          "item": archiveUrl,
        },
      ],
    },
  ];

  /**
   * Load More Handler
   */
  const loadMoreHandler = useCallback(() => {
    setLoading(true);
    fetch(`/api/articles?offset=${articles.offset}&limit=12`)
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
  }, [articles]);

  return (
    <>
      <SEO
        title="আর্কাইভ"
        description={`ইসলামের কন্ঠ পত্রিকার সকল প্রবন্ধ ও লেখালেখির সংগ্রহশালা - ${SITE_CONFIG.siteName}`}
        canonicalUrl="/archive"
        jsonLd={archiveJsonLd}
      />

      <Layout preview={preview} settings={settings}>
        <BlockPageHeader 
          title="আর্কাইভ" 
          subtitle="ইসলামের কন্ঠ পত্রিকার সকল প্রবন্ধ ও লেখালেখির সংগ্রহশালা" 
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

export async function getServerSideProps({ res }) {
  // Cache for 1 hour on CDN/browser, allow stale for 24 hours while revalidating
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400"
  );

  const preview = false;
  const articles = await getAllPosts(false, 0, 12);
  const settings = await getSiteSettings(false);

  return {
    props: { data: articles, settings, preview },
  };
}

export default PageArticles;
