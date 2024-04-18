import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { memo } from "react";
import { imageBuilder } from "../../../pages/api/sanity";
import clsx from "clsx";
import FormatterDate from "../../FormatterDate";
import { th } from "date-fns/locale";

const PostCard = ({ className, post, ...rest }) => {
  return (
    <Card
      elevation={0}
      sx={{
        background: "#FFF",
        transition: "all 0.3s ease-in-out",
        borderRadius: "4px",
        // "&:hover": {
        //   transform: "translateY(-5px)",
        //   transition: "all 0.3s ease-in-out",
        // },
      }}
    >
      <Box
        sx={{
          minHeight: "102px",
          // padding: "16px",
          // backgroundColor: "#f5f5f5",
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
          {/* <Avatar
            src={imageBuilder(post?.author?.image)
              .width(20)
              .height(20)
              .url()}
            sx={{
              height: "20px",
              width: "20px",
            }}
          /> */}
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
        <Grid container spacing={2}>
          {posts.map((post, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
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
