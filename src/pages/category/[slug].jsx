import Head from "next/head";
import { useState, useCallback } from "react";
import BlockGridPostCard from "../../components/Block/BlockGridPostCard";
import Layout from "../../components/Layout";
import { getAllPosts } from "../api/api";

const PageArticles = ({ data, slug, preview }) => {
  const [articles, setArticles] = useState(data || {});
  const [loading, setLoading] = useState(false);

  /**
   * Load More Handler
   */
  const loadMoreHandler = useCallback(() => {
    setLoading(true);
    fetch(`/api/articles?offset=${articles.offset}&limit=8&category=${slug}`)
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
      <Head>
        <title>আরটিকেল | ইসলামের কন্ঠ</title>
      </Head>

      <Layout preview={preview}>
        <BlockGridPostCard posts={articles.data} />

        {/* Pagination  */}
        {articles.isPaginate && (
          <div className="container max-w-[600px] mb-[30px]">
            <div className="w-full flex justify-center items-center">
              <button
                className="w-full py-2.5 px-4 bg-[#055547] hover:bg-[#055547ee] text-white font-bold rounded transition-colors disabled:opacity-50"
                disabled={loading}
                onClick={loadMoreHandler}
              >
                {loading ? "Loading..." : "Load more"}
              </button>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx) {
  ctx.res.setHeader(
    "Cache-Control",
    "public, s-maxage=604800, stale-while-revalidate=86400"
  );

  const preview = false;
  const { slug } = ctx.query;
  const articles = await getAllPosts(false, 0, 12, slug);

  return {
    props: { data: articles, slug, preview },
  };
}

export default PageArticles;
