// Core Component
import { Container, Divider, Grid } from "@mui/material";
import Head from "next/head";
// API Content
import BlockBanner from "../components/Block/BlockBanner";
import BlockCardWide10x from "../components/Block/BlockCardWide10x";
// import BlockCarouselFullWidth from "../components/Block/BlockCarouselFullWidth";
import BlockGridPostCard from "../components/Block/BlockGridPostCard";
import BlockSidebar from "../components/Block/BlockSidebar";
import TrendingPosts from "../components/Block/TrendingPosts";
import HeroBanner from "../components/HeroBanner";
import Layout from "../components/Layout";
import { getAllPosts, getFeaturedPost, getRecommendedPost } from "./api/api";

export default function Home({
  featuredPosts,
  recommendedPosts,
  allPosts,
  preview,
}) {
  return (
    <>
      <Head>
        <title>ইসলামের কন্ঠ</title>0
      </Head>

      <Layout>
        {/* <NavigationHeader /> */}
        <HeroBanner post={featuredPosts[0]} />

        {/* This will contain latest updated contents */}
        <TrendingPosts posts={featuredPosts} />

        {/* Featured Article Slider */}
        {/* <BlockCarouselFullWidth
          key={`ik_block_carousel_full_width`}
          dataSlides={featuredPosts}
        /> */}

        {/* Recommended Articles */}
        {recommendedPosts && (
          <BlockGridPostCard
            key={`ik_block_grid_post_card_4x2`}
            postData={recommendedPosts}
            title="নির্বাচিত লেখাসমুহ"
          />
        )}

        <Divider />
        {/* Image Banner */}
        <BlockBanner />

        <Divider />
        <Container maxWidth="lg">
          <Grid container>
            <Grid item xs={12} md={9}>
              <BlockCardWide10x postData={allPosts} />
            </Grid>

            <Grid item xs={12} md={3}>
              <BlockSidebar />
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPostRange = [0, 10]; // Recent Article Range
  const featuredArticleRange = [0, 6]; // Featured Content Range.

  const featuredPosts = await getFeaturedPost(preview, featuredArticleRange);
  const recommendedPosts = await getRecommendedPost(preview, [0, 7]);
  const allPosts = await getAllPosts(preview, allPostRange);

  return {
    props: { featuredPosts, recommendedPosts, allPosts, preview },
    revalidate: 60 * 60 * 6,
  };
}
