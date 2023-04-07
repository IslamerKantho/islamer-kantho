// Core Component
import { Box, Container, Divider, Grid } from "@mui/material";
import Head from "next/head";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
// API Content
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
  getRecommendedPost,
  length,
} from "./api/api";

// import daynamic from "next/dynamic";

// const TrendingPosts = daynamic(() =>
//   import("../components/Block/TrendingPosts")
// );
// const BlockSidebar = daynamic(() => import("../components/Block/BlockSidebar"));
// const BlockGridPostCard = daynamic(() =>
//   import("../components/Block/BlockGridPostCard")
// );
// const BlockBanner = daynamic(() => import("../components/Block/BlockBanner"));
// const BlockCardWide10x = daynamic(() =>
//   import("../components/Block/BlockCardWide10x")
// );

export default function Home({
  featuredPosts,
  recommendedPosts,
  allPosts,
  preview
}) {
  const [featuredPost, setFeaturedPost] = useState(featuredPosts);
  const [recommendedPost, setRecommendedPost] = useState(recommendedPosts);
  const [recentArticles, setRecentArticles] = useState(allPosts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(allPosts)
  }, [allPosts]);

  /**
   * Load more button
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
      .catch((err) => {
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
  const allPosts = await getAllPosts(preview, 0, 10);

  return {
    props: { featuredPosts, recommendedPosts, allPosts,  preview },
    revalidate: 60 * 60 * 6,
  };
}
