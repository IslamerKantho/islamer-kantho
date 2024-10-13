import {
  Box,
  Card,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { memo } from "react";
import clsx from "clsx";
import FormatterDate from "../../FormatterDate";

const PostCard = ({ className, post, ...rest }) => {
  return (
    <Card
      className="h-full bg-white rounded-none [transition:all_0.3s_ease-in-out]"
      elevation={0}
    >
      <Box
        className="h-full flex flex-col items-start justify-start no-underline"
      >
        <Box>
          <Stack direction="row" spacing={1}>
            <Typography
              className="color-primary text-[11px] font-bold leading-4"
              href={`/category/${post?.category?.slug}`} 
              passHref
              style={{ textDecoration: "none" }}
              component={Link}
            >
              {post?.category?.title} 
            </Typography>
            <Typography
              className="text-stone-400 text-[11px] font-bold leading-4"
              component="p"
            >
              • {post?.author?.name}
            </Typography>
          </Stack>

          <Typography
            className="mt-1 text-primary text-[15px] font-bold leading-5 [&>a]:hover:opacity-75"
            component="h3"
            title={post?.title}
          >
            <Link
              href={`/article/${post?.slug}`} 
              passHref
              style={{ textDecoration: "none"}}
            >
            {post?.title}
            </Link>
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} sx={{ marginTop: "10px" }}>
          <Typography
            variant="body2"
            sx={{
              fontSize: "12px",
              lineHeight: "16px",
              color: "#797979",
            }}
          >
            <FormatterDate dateString={post?.date?.updatedAt || post?.date?.createdAt} />
          </Typography>
        </Stack>
      </Box>
    </Card>
  )
}

const PostCardGrid = ({ posts }) => {
  return (
        <Grid container>
          {posts.map((post, index) => (
            <Grid 
              className="min-h-[100px] md:min-h-[120px] py-3 px-0 border-b border-b-[#eee]"
            key={index} 
            item 
            xs={12} 
            sm={6} 
            md={4}
            sx={{
              "@media (min-width: 960px)": {
                "&:nth-of-type(3n + 1)>div": {
                  paddingRight: "12px",
                  borderRight: "1px solid #eee"
                },
                "&:nth-of-type(3n + 2)>div": {
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  borderRight: "1px solid #eee"
                },
                "&:nth-of-type(3n)>div": {
                  paddingLeft: "12px",
                }
              }
            }}
            >
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>
  )
}

const TrendingPosts = ({ className, posts, ...rest }) => {
  return (
    <Box
      className={clsx("hero-banner pt-10 pb-12 md:pt-16 md:pb-14", className)}
      component="section"
      {...rest}
    >
      <Container className="max-w-[1280px]" maxWidth="lg">
        <PostCardGrid posts={posts} />
      </Container>
    </Box>
  );
};

export default memo(TrendingPosts);
