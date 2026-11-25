import SEO, { SITE_CONFIG } from "@/components/SEO";
import { useState, useCallback } from "react";
import Layout from "../../components/Layout";
import { getAllPosts, getSiteSettings } from "@/services/sanity.service";
import ArticlePreviewGrid from "@/components/Block/ArticlePreviewGrid";
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
            <ArticlePreviewGrid
              title="প্রবন্ধ সংগ্রহশালা"
              subtitle="বিভাগ অনুযায়ী প্রবন্ধ ফিল্টার করুন অথবা নিচে স্ক্রল করে আরও পড়ুন"
              posts={articles?.data || []}
              isPaginate={articles?.isPaginate}
              initialOffset={articles?.offset || 12}
              pageSize={12}
              showCategoryFilter={true}
              loading={loading}
              onLoadMore={loadMoreHandler}
            />
          </div>
        </section>
      </Layout>
    </>
  );
};

export async function getServerSideProps({ res }) {
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
