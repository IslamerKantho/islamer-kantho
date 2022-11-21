// Core Component
import { Box, Button, Container, Divider, Grid } from "@mui/material";
import Head from "next/head";
import { useEffect } from "react";
import { useMemo } from "react";
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
  length,
  preview,
}) {
  const [featuredPost, setFeaturedPost] = useState(featuredPosts);
  const [recommendedPost, setRecommendedPost] = useState(recommendedPosts);
  const [recentArticles, setRecentArticles] = useState(allPosts);
  const [pagination, setPagination] = useState({
    page: 1,
    postPerPage: 10,
    totalPost: length,
    totalPage: 0,
  });

  useEffect(() => {
    // Calculating & Updating total page number.
    setPagination({
      ...pagination,
      totalPage: Math.ceil(
        parseInt(pagination.totalPost) / parseInt(pagination.postPerPage)
      ),
    });
  }, [pagination.totalPost, pagination.postPerPage]);

  /**
   * Load more button
   */
  const loadArticleHandler = useCallback(async () => {
    await fetch(
      `/api/articles?page=${pagination.page + 1}&limit=${
        pagination.postPerPage
      }`
    )
      .then((data) => data.json())
      .then((data) => {
        setPagination({ ...pagination, page: pagination.page + 1 }); // Updating page number.
        setRecentArticles([...recentArticles, ...data.data]); // Adding content to the state.
      })
      // .then((posts) => console.log("Pagination: ", posts))
      .catch((err) => console.error("Something wrong!"));

    console.log("Pagination: ", pagination);
  }, [pagination]);

  return (
    <>
      <Head>
        <title>ইসলামের কন্ঠ</title>0
      </Head>

      <Layout>
        {/* <NavigationHeader /> */}
        <HeroBanner post={featuredPost[0]} />

        {/* This will contain latest updated contents */}
        <TrendingPosts posts={featuredPost} />

        {/* Recommended Articles */}
        {recommendedPost && (
          <BlockGridPostCard
            postData={recommendedPost}
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
                  page={pagination.page}
                  totalPage={pagination.totalPage}
                  nextPage={loadArticleHandler}
                  postData={recentArticles}
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
  const allPostRange = [0, 10]; // Recent Article Range
  const featuredArticleRange = [0, 6]; // Featured Content Range.

  const featuredPosts = await getFeaturedPost(preview, featuredArticleRange);
  const recommendedPosts = await getRecommendedPost(preview, [0, 7]);
  const { data, length } = await getAllPosts(preview, allPostRange);

  return {
    props: { featuredPosts, recommendedPosts, allPosts: data, length, preview },
    revalidate: 60 * 60 * 6,
  };
}
