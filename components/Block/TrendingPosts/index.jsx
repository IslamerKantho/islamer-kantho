import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { memo } from "react";
import { imageBuilder } from "../../../pages/api/sanity";
import { dateFormatter } from "../../../utils/date.utils";
import S from "./TrendingPosts.module.sass";

const TrendingPosts = ({ className, posts, ...rest }) => {
  return (
    <Box
      className={[S.__trendingPosts, className]}
      component="section"
      {...rest}
    >
      <Container className={S.__container} maxWidth="lg">
        <Grid className={S.__row} container spacing={2}>
          {posts.map((post, index) => (
            <Grid className={S.__col} key={index} item xs={12} sm={6} md={4}>
              <Card elevation={0} className={S.__card}>
                <CardActionArea className={S.__action}>
                  <Box>
                    <Chip
                      className={S.__date}
                      label={dateFormatter(
                        post?.date?.updatedAt
                          ? post?.date?.updatedAt
                          : post?.date?.createdAt
                      )}
                      size="small"
                    />

                    <Typography className={S.__title} component="h3">
                      {post?.title}
                    </Typography>
                  </Box>

                  <Stack className={S.__meta} direction="row" spacing={2}>
                    <Avatar
                      className={S.__avatar}
                      src={imageBuilder(post?.author?.image)
                        .width(20)
                        .height(20)
                        .url()}
                    />
                    <Typography className={S.__authorName} variant="body2">
                      {post?.author?.name} • {post?.category?.title}
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
