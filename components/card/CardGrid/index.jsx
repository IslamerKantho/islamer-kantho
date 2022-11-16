import { imageBuilder } from "../../../pages/api/sanity";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { truncate } from "../../../utils/string.utils";
import { memo } from "react";

const CardGrid = ({ cardData }) => {
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

export default memo(CardGrid);
