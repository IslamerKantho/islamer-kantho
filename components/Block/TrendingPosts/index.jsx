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

const TrendingPosts = ({ className, posts, ...rest }) => {
  return (
    <Box
      className={className}
      component="section"
      sx={{
        paddingTop: "40px",
        paddingBottom: "40px",
        borderBottom: "1px solid rgb(230, 230, 230)",
      }}
      {...rest}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {posts.map((post, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Card elevation={0}>
                <CardActionArea
                  sx={{
                    minHeight: "154px",
                    padding: "20px",
                    backgroundColor: "#f5f5f5",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Chip
                      label={dateFormatter(
                        post?.date?.updatedAt
                          ? post?.date?.updatedAt
                          : post?.date?.createdAt
                      )}
                      size="small"
                      sx={{
                        color: "#797979",
                        fontSize: "12px",
                      }}
                    />

                    <Typography
                      component="h3"
                      sx={{
                        marginTop: "10px",
                        fontSize: "15px",
                        lineHeight: "25px",
                        color: "#292929",
                        fontWeight: "700",
                      }}
                    >
                      {post?.title}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={2} sx={{ marginTop: "10px" }}>
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
                        fontSize: "13px",
                        lineHight: "13px",
                        color: "#797979",
                      }}
                    >
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
