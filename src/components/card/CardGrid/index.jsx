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
      className="w-full bg-white rounded shadow-[0px_0px_20px_0_rgba(0,0,0,0.15)]"
      component="article"
      key={article.slug}
    >
      <CardActionArea href={`/article/${article.slug}`} component={Link}>
        <Box className="flex border-b border-b-[#055547]" >
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

        <CardContent className="min-h-[122px] p-5 bg-white" >
          <Chip label={article?.author?.name} size="small" />

          <Typography 
            className="mt-2.5 text-sm font-bold text-[#055547]"
            variant="h3"
            title={article.title}
          >
            {truncate(article.title, 50)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default memo(CardGrid);
