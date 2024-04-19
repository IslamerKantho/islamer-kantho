import SectionWidget from "../../SectionWidget";
import { memo } from "react";
import { imageBuilder } from "../../../pages/api/sanity";
import {
  Grid,
    Box,Container,
  Card,
CardActionArea,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { truncate } from "../../../utils/string.utils";

const PostCard = ({ cardData }) => {
  const article = cardData;

  return (
    <Card
      component="article"
      key={article.slug}
            sx={{
        width: "100%",
        background: "#fff",
        borderRadius: "5px",
        boxShadow: "0px 0px 20px 0 rgb(0 0 0 / 15%)",
      }}
    >
      <CardActionArea href={`/article/${article.slug}`} component={Link}>
        <Box
          sx={{
            display: "flex",
            borderBottom: "8px solid #055547",
          }}
        >
          {article.coverImage && (
            <Image
              src={imageBuilder(article?.coverImage)
                .width(286)
                .height(161)
                .url()}
              width={286}
              height={161}
              alt={article.title}
              placeholder="blur"
              blurDataURL={imageBuilder(article?.coverImage)
                .width(286)
                .height(161)
                .url()}
            />
          )}
        </Box>

        <CardContent
          sx={{
            minHeight: "122px",
            padding: "20px",
            background: "#fff",
          }}
        >
          <Chip label={article?.author?.name} size="small" />

          <Typography
            variant="h3"
            title={article.title}
            sx={{
              marginTop: "10px",
              fontSize: "14px",
              lineHeight: "24px",
              fontWeight: "700",
              color: "#055547",
            }}
          >
            {truncate(article.title, 50)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};


const PostGrid = ({ posts}) => {
  return (
    <Grid container spacing={2}>
      {posts &&
        posts?.map((article) => (
          <Grid
            item
            key={article._id}
            xs={12}
            sm={6}
            md={3}
            sx={{ width: "100%" }}
          >
            <PostCard cardData={article} />
          </Grid>
        ))}
    </Grid>
  )
}

const BlockGridPostCard = ({ className, posts, title, ...rest }) => {
  return (
    <>
      <Box component="section">
        <Container maxWidth="lg">
          <SectionWidget title={title} {...rest}>
            <PostGrid posts={posts} />
          </SectionWidget>
        </Container>
      </Box>
    </>
  );
};

export default memo(BlockGridPostCard);
