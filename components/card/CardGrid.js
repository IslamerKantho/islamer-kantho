// API
import { imageBuilder } from "../../pages/api/sanity";
// Components
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";

export default function CardGrid({ cardData }) {
  const article = cardData;

  return (
    <Box
      component="article"
      className="post_grid_card"
      key={article.slug}
      sx={{ width: "100%" }}
    >
      <NextLink as={`/article/${article.slug}`} href="/article/[slug]" passHref>
        <Card
          sx={{
            width: "100%",
            background: "#fff",
            borderRadius: "5px",
            boxShadow: "0px 0px 20px 0 rgb(0 0 0 / 15%)",
          }}
        >
          <CardActionArea>
            <Box
              className="img ik_rounded-md"
              sx={{ borderBottom: "8px solid #055547" }}
            >
              {/* <Image src={imageBuilder(article.coverImage).width(286).height(161).url()} width={286} height={161} layout="responsive" alt={article.slug} /> */}
              {article.coverImage && (
                <Image
                  src={imageBuilder(article?.coverImage)
                    .width(286)
                    .height(161)
                    .url()}
                  width={286}
                  height={161}
                  alt={article.slug}
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
              {/* Meta */}

              <Chip label={article?.author?.name} size="small" />

              {/* Title */}
              <Typography
                variant="h3"
                className="ik_meta__title"
                sx={{
                  marginTop: "10px",
                  fontSize: "13px",
                  lineHeight: "24px",
                  fontWeight: "700",
                  color: "#055547",
                }}
              >
                {article.title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </NextLink>
    </Box>
  );
}
