import SEO, { SITE_CONFIG } from "../../components/SEO";
import { useState, useCallback, useEffect } from "react";
import Layout from "../../components/Layout";
import { getAllPosts, getSiteSettings } from "@/services/sanity.service";
import ArticlePreviewGrid from "@/components/Block/ArticlePreviewGrid";
import BlockPageHeader from "../../components/Block/BlockPageHeader";

const PageArticles = ({ data, slug, settings, preview }) => {
  const [articles, setArticles] = useState(data || {});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setArticles(data || {});
  }, [data, slug]);

  const categoryTitle =
    articles?.data?.[0]?.category?.title ||
    articles?.data?.[0]?.categories?.[0]?.title ||
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

      <Layout preview={preview} settings={settings}>
        <BlockPageHeader
          title={`বিভাগ: ${categoryTitle}`}
          subtitle={`${categoryTitle} বিভাগের সর্বাধুনিক প্রবন্ধ, গবেষণা ও নিবন্ধমালা`}
        />
        <section className="w-full py-10 md:py-14">
          <div className="container">
            <ArticlePreviewGrid
              posts={articles?.data || []}
              isPaginate={articles?.isPaginate}
              initialOffset={articles?.offset || 12}
              pageSize={12}
              activeCategorySlug={slug}
              showCategoryFilter={false}
              loading={loading}
              onLoadMore={loadMoreHandler}
              emptyMessage={`${categoryTitle} বিভাগে এখনো কোনো প্রবন্ধ প্রকাশিত হয়নি।`}
            />
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
  const settings = await getSiteSettings(false);

  return {
    props: { data: articles, slug, settings, preview },
  };
}

export default PageArticles;
