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
      elevation={0}
      sx={{
        height: "100%",
        background: "#FFF",
        transition: "all 0.3s ease-in-out",
        borderRadius: "0",
        
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          // justifyContent: "space-between",
          justifyContent: "flex-start",
          textDecoration: "none",
        }}
      >
        <Box>
          <Stack direction="row" spacing={1}>
            <Typography
              href={`/category/${post?.category?.slug}`} 
              passHref
              style={{ textDecoration: "none" }}
              component={Link}
              sx={{
                color: "#044f4f",
                fontSize: "11px",
                lineHeight: "16px",
                // color: "#797979",
                fontWeight: "700",
              }}
            >
              {post?.category?.title} 
            </Typography>
            <Typography
              component="p"
              sx={{
                fontSize: "11px",
                lineHeight: "16px",
                color: "#797979",
                fontWeight: "700",
              }}
            >
              • {post?.author?.name}
            </Typography>
          </Stack>

          <Typography
            component="h3"
            title={post?.title}
            sx={{
              marginTop: "4px",
              fontSize: "15px",
              lineHeight: "25px",
              color: "#055547",
              fontWeight: "700",
              "&>a:hover": {
                opacity: 0.8
              } 
            }}
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
            key={index} 
            item 
            xs={12} 
            sm={6} 
            md={4}
            sx={{
              minHeight: "120px",
              padding: "12px 0",
              borderBottom: "1px solid #eeeeee",
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
      className={clsx("hero-banner", className)}
      component="section"
      sx={{
        paddingTop: "60px",
        paddingBottom: "50px",
      }}
      {...rest}
    >
      <Container maxWidth="lg">
        <PostCardGrid posts={posts} />
      </Container>
    </Box>
  );
};

export default memo(TrendingPosts);
