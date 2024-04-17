import { Box, Button, Container } from "@mui/material";
import Head from "next/head";
import { useState, useCallback } from "react";
import BlockGridPostCard from "../../components/Block/BlockGridPostCard";
import Layout from "../../components/Layout";
import { getAllPosts } from "../api/api";

const PageArticles = ({ data, slug, preview }) => {
  // console.log("DATA", data);
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
        }); // Adding content to the state.
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
          <Container maxWidth="sm" sx={{ marginBottom: "30px" }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                disableElevation
                fullWidth
                disabled={loading}
                onClick={loadMoreHandler}
                sx={{
                  padding: { sm: "10px" },
                  background: "#055547",
                  "&:hover": {
                    background: "#055547ee",
                  },
                }}
              >
                Load more
              </Button>
            </Box>
          </Container>
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
  const articles = await getAllPosts(false, 0, 8, slug);

  return {
    props: { data: articles, slug, preview },
  };
}

export default PageArticles;
