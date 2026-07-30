import Head from "next/head";
import { useState, useCallback } from "react";
import Layout from "../../components/Layout";
import { getAllPosts } from "../api/api";
import ArchivePostCard from "@/components/card/ArchivePostCard";

const PageArticles = ({ data, preview }) => {
  const [articles, setArticles] = useState(data || {});
  const [loading, setLoading] = useState(false);

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
      <Head>
        <title>আরটিকেল | ইসলামের কন্ঠ</title>
      </Head>

      <Layout preview={preview}>
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

export async function getStaticProps() {
  const preview = false;
  const articles = await getAllPosts(false, 0, 12);

  return {
    props: { data: articles, preview },
  };
}

export default PageArticles;
