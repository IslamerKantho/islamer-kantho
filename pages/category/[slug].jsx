import { Box, Button, Container } from "@mui/material";
import { arDZ } from "date-fns/locale";
import Head from "next/head";
import PropsType from "prop-types";
import { useState, useEffect, useCallback } from "react";
import BlockGridPostCard from "../../components/Block/BlockGridPostCard";
import Layout from "../../components/Layout";
import { getAllPostsByCategory } from "../api/api";

const PageArticles = ({ posts, length, slug, preview }) => {
  const [articles, setArticles] = useState(posts);
  const [pagination, setPagination] = useState({
    page: 1,
    postPerPage: 12,
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
  }, []);

  /**
   * Load more button
   */
  const loadArticleHandler = useCallback(async () => {
    await fetch(
      `/api/articles?page=${pagination.page + 1}&category=${slug}&limit=${
        pagination.postPerPage
      }`
    )
      .then((data) => data.json())
      .then((data) => {
        setPagination({ ...pagination, page: pagination.page + 1 }); // Updating page number.
        setArticles([...articles, ...data.data]); // Adding content to the state.
      })
      .catch((err) => console.error("Something wrong!"));
  }, [pagination, articles]);

  return (
    <>
      <Head>
        <title>আরটিকেল | ইসলামের কন্ঠ</title>
      </Head>

      <Layout preview={preview}>
        <BlockGridPostCard posts={articles} />

        {/* Pagination  */}
        <Container maxWidth="sm">
          {pagination.page < pagination.totalPage && (
            <Box
              sx={{
                width: "100%",
                paddingTop: "10px",
                paddingBottom: "30px",
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
                onClick={loadArticleHandler}
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
          )}
        </Container>
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx) {
  ctx.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const preview = false;
  const { slug } = ctx.query;
  console.log(ctx.query);
  const allPostRange = [0, 12]; // Recent Article Range
  const { data, length } = await getAllPostsByCategory(
    preview,
    slug,
    allPostRange
  );

  return {
    props: { posts: data, length, slug, preview },
  };
}

PageArticles.propTypes = {
  allPosts: PropsType.object,
  preview: PropsType.bool,
};

export default PageArticles;
