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

const TrendingPosts = ({ className, posts, ...rest }) => {
  return (
    <Box
      className={className}
      component="section"
      sx={{
        paddingTop: "16px",
        paddingBottom: "20px",
      }}
      {...rest}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {posts.map((post, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Card
                elevation={0}
                sx={{
                  transition: "all 0.3s ease-in-out",
                  borderRadius: "4px",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    transition: "all 0.3s ease-in-out",
                  },
                }}
              >
                <CardActionArea
                  href={`/article/${post?.slug}`}
                  component={Link}
                  sx={{
                    minHeight: "134px",
                    padding: "16px",
                    backgroundColor: "#f5f5f5",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      component="p"
                      sx={{
                        fontSize: "11px",
                        lineHeight: "16px",
                        color: "#797979",
                        fontWeight: "700",
                      }}
                    >
                      {post?.category?.title}
                    </Typography>

                    <Typography
                      component="h3"
                      sx={{
                        marginTop: "4px",
                        fontSize: "14px",
                        lineHeight: "25px",
                        color: "#055547",
                        fontWeight: "700",
                      }}
                    >
                      {post?.title}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1} sx={{ marginTop: "10px" }}>
                    <Avatar
                      src={imageBuilder(post?.author?.image)
                        .width(20)
                        .height(20)
                        .url()}
                      sx={{
                        height: "20px",
                        width: "20px",
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "11px",
                        lineHeight: "16px",
                        color: "#797979",
                      }}
                    >
                      {post?.author?.name}
                    </Typography>
                  </Stack>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default memo(TrendingPosts);
