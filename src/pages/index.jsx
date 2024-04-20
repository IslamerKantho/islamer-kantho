import { Box, Container, Grid } from "@mui/material";
import Head from "next/head";
import { useCallback, useState } from "react";
// import BlockCarouselFullWidth from "../components/Block/BlockCarouselFullWidth";
import BlockPostCarSlider from "../components/Block/BlockPostCarSlider";
import BlockSidebar from "../components/Block/BlockSidebar";
import TrendingPosts from "../components/Block/TrendingPosts";
import HeroBanner from "../components/HeroBanner";
import Layout from "../components/Layout";
import { getAllPosts, getFeaturedPost, getRecommendedPost } from "./api/api";
import DottedDivider from "../components/DottedDivider";
import dynamic from "next/dynamic";
// const TrendingPosts = dynamic(() =>
//   import("../components/Block/TrendingPosts")
// );
// const BlockSidebar = dynamic(() => import("../components/Block/BlockSidebar"));
// const BlockPostCarSlider = dynamic(() =>
//   import("../components/Block/BlockPostCarSlider")
// );
const BlockBanner = dynamic(() => import("../components/Block/BlockBanner"));
const BlockCardWide10x = dynamic(() =>
  import("../components/Block/BlockCardWide10x")
);

export default function Home({
  featuredPosts,
  recommendedPosts,
  allPosts,
  // preview
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
        }); // Adding content to the state.
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
        <title>ইসলামের কন্ঠ</title>0
      </Head>

      <Layout>
        <HeroBanner post={featuredPost[0]} />
        <TrendingPosts posts={featuredPost.slice(1)} />
        {/* <DottedDivider /> */}

        {/* Recommended Articles */}
        {recommendedPost && (
          <BlockPostCarSlider
            posts={recommendedPost}
            title="নির্বাচিত লেখাসমুহ"
          />
        )}

        {/* <DottedDivider /> */}
        <BlockBanner />
        <DottedDivider />

        <Box component="section">
          <Container className="max-w-[1280px]" maxWidth="lg">
            <Grid container spacing={5}>
              <Grid item xs={12} md={8.5}>
                <BlockCardWide10x
                  posts={recentArticles.data}
                  isPaginate={recentArticles.isPaginate}
                  loading={loading}
                  onLoadMore={loadMoreHandler}
                />
              </Grid>

              <Grid item xs={12} md={3.5}>
                <BlockSidebar />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const featuredArticleRange = [0, 10]; // Featured Content Range.

  const featuredPosts = await getFeaturedPost(preview, featuredArticleRange);
  const recommendedPosts = await getRecommendedPost(preview, [0, 7]);
  const allPosts = await getAllPosts(false, 0, 10);

  return {
    props: { featuredPosts, recommendedPosts, allPosts, preview },
    revalidate: 60 * 60 * 12,
  };
}
