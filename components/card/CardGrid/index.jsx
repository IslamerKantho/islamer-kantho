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
import NextLink from "next/link";
import S from "./CardGrid.module.sass";
import { truncate } from "../../../utils/string.utils";
import { memo } from "react";

const CardGrid = ({ cardData }) => {
  const article = cardData;

  return (
    <Card component="article" className={S.__card} key={article.slug}>
      <CardActionArea
        className={S.__actionArea}
        href={`/article/${article.slug}`}
        component={NextLink}
      >
        <Box className={S.__thumbnail}>
          {article.coverImage && (
            <Image
              className={S.__img}
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

        <CardContent className={S.__content}>
          <Chip
            className={S.__meta}
            label={article?.author?.name}
            size="small"
          />

          <Typography variant="h3" className={S.__title} title={article.title}>
            {truncate(article.title, 50)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default memo(CardGrid);
