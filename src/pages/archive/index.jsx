import { Box, Button, Container } from "@mui/material";
import Head from "next/head";
import { useState, useCallback } from "react";
import Layout from "../../components/Layout";
import { getAllPosts } from "../api/api";
import { ArchivePostCard } from "@/components/card/ArchivePostCard";

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
        }); // Adding content to the state.
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
        {/* <BlockGridPostCard posts={articles.data} /> */}

        <Box className="w-full py-14" component="section">
          <Container className="max-w-[1280px]" maxWidth="lg">
            <Box className="w-full grid grid-cols-3 gap-x-8 gap-y-10 mb-12">
            {articles?.data.map((article) => (
              <ArchivePostCard key={article.slug} article={article} />
            ))}
              </Box>

        {/* Pagination  */}
        {articles.isPaginate && (
            <Box
              className="w-full flex justify-center items-center"
            >
              <Button
                className="max-w-[450px] sm:p-2.5 bg-[#055547] hover:bg-[#055547ee] font-bold"
                variant="contained"
                color="primary"
                disableElevation
                fullWidth
                disabled={loading}
                onClick={loadMoreHandler}
              >
                {loading ? "Loading..." : "Load more"}
              </Button>
            </Box>
        )}
            </Container>
        </Box>
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
