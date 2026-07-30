import Head from "next/head";
import { useCallback, useState } from "react";
import BlockPostCarSlider from "../components/Block/BlockPostCarSlider";
import BlockSidebar from "../components/Block/BlockSidebar";
import TrendingPosts from "../components/Block/TrendingPosts";
import HeroBanner from "../components/HeroBanner";
import Layout from "../components/Layout";
import { getAllPosts, getFeaturedPost, getRecommendedPost } from "./api/api";
import DottedDivider from "../components/DottedDivider";
import dynamic from "next/dynamic";

const BlockBanner = dynamic(() => import("../components/Block/BlockBanner"));
const BlockCardWide10x = dynamic(() =>
  import("../components/Block/BlockCardWide10x")
);

export default function Home({
  featuredPosts,
  recommendedPosts,
  allPosts,
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
    fetch(`/api/articles?offset=${recentArticles.offset}&limit=10`)
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
      <Head>
        <title>ইসলামের কন্ঠ</title>
      </Head>

      <Layout>
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

        <section className="w-full">
          <div className="container py-8 md:py-12 flex flex-col md:flex-row gap-10">
            <div className="flex-1">
              <BlockCardWide10x
                posts={recentArticles.data}
                isPaginate={recentArticles.isPaginate}
                loading={loading}
                onLoadMore={loadMoreHandler}
              />
            </div>

            <div className="w-full md:w-[340px] shrink-0">
              <BlockSidebar />
            </div>
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
  const allPosts = await getAllPosts(false, 0, 10);

  return {
    props: { featuredPosts, recommendedPosts, allPosts, preview },
    revalidate: 60 * 60 * 12,
  };
}
