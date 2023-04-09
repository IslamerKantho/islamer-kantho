import { Box, Container, Divider, Grid } from "@mui/material";
import Head from "next/head";
import { useCallback } from "react";
import { useState } from "react";
import BlockBanner from "../components/Block/BlockBanner";
import BlockCardWide10x from "../components/Block/BlockCardWide10x";
// import BlockCarouselFullWidth from "../components/Block/BlockCarouselFullWidth";
import BlockGridPostCard from "../components/Block/BlockGridPostCard";
import BlockSidebar from "../components/Block/BlockSidebar";
import TrendingPosts from "../components/Block/TrendingPosts";
import HeroBanner from "../components/HeroBanner";
import Layout from "../components/Layout";
import {
  getAllPosts,
  getFeaturedPost,
  getRecommendedPost
} from "./api/api";
// import dynamic from “next/dynamic”;

// const TrendingPosts = dynamic(() =>
//   import("../components/Block/TrendingPosts")
// );
// const BlockSidebar = dynamic(() => import("../components/Block/BlockSidebar"));
// const BlockGridPostCard = dynamic(() =>
//   import("../components/Block/BlockGridPostCard")
// );
// const BlockBanner = dynamic(() => import("../components/Block/BlockBanner"));
// const BlockCardWide10x = dynamic(() =>
//   import("../components/Block/BlockCardWide10x")
// );

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
    fetch(
      `/api/articles?offset=${recentArticles.offset}&limit=10`
    )
      .then((data) => data.json())
      .then((data) => {
        console.log("DATA", data)
        setRecentArticles({...recentArticles, data:[...recentArticles.data, ... data.data], isPaginate: data.isPaginate, offset: data.offset}); // Adding content to the state.
        setLoading(false);
        console.log("FINAL DATA", recentArticles)
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
        {/* <NavigationHeader /> */}
        <HeroBanner post={featuredPost[0]} />

        {/* This will contain latest updated contents */}
        <TrendingPosts posts={featuredPost.slice(1)} />

        {/* Recommended Articles */}
        {recommendedPost && (
          <BlockGridPostCard
            posts={recommendedPost}
            title="নির্বাচিত লেখাসমুহ"
          />
        )}

        <Divider />
        {/* Image Banner */}
        <BlockBanner />

        <Divider />

        <Box component="section">
          <Container maxWidth="lg">
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
  const featuredArticleRange = [0, 7]; // Featured Content Range.

  const featuredPosts = await getFeaturedPost(preview, featuredArticleRange);
  const recommendedPosts = await getRecommendedPost(preview, [0, 7]);
  const allPosts = await getAllPosts(false, 0, 10);

  return {
    props: { featuredPosts, recommendedPosts, allPosts,  preview },
    revalidate: 60 * 60 * 6,
  };
}
