import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { imageBuilder } from "../../../pages/api/sanity";
import { truncate } from "../../../utils/string.utils";
import Link from "next/link";
import clsx from "clsx";
import { memo } from "react";

const CardFullWide = ({ className, postData, ...rest }) => {
  return (
    <Card
      className={clsx("relative block max-w-[760px]", className)}
      elevation={0}
      component="article"
      {...rest}
    >
      <Box
        className="w-full flex flex-col sm:flex-row"
      >
        {postData.coverImage && (
          <CardMedia
            className="w-full sm:w-[330px] rounded-lg overflow-hidden"
          >
            <Image
              className="rounded-lg"
              src={imageBuilder(postData?.coverImage)
                .width(286)
                .height(180)
                .url()}
              width={286}
              height={180}
              alt={postData?.title}
              placeholder="blur"
              blurDataURL={imageBuilder(postData?.coverImage)
                .width(286)
                .height(180)
                .url()}
            />
          </CardMedia>
        )}

        <CardContent
          className="w-full md:w-[calc(100%-330px)]"
        >
          <Box className="mt-4 flex items-center flex-start flex-row">
            <Typography
              className="pe-1 text-black hover:opacity-75 text-[11px] font-bold leading-4 no-underline"
              href={`/category/${postData?.category?.slug}`} 
              component={Link}
              passHref
            >
              {postData?.category?.title} 
            </Typography>
              <Typography
                className="ps-1 border-s ms-0 text-[#666] text-[11px] font-bold leading-4 no-underline"
              component="p"
              >
                {postData?.author?.name}
            </Typography>
          </Box>

          <Typography
            className="mt-4 relative font-bold text-base cursor-pointer"
            variant="h3"
          >
            <NextLink
              className="text-primary no-underline hover:opacity-75 font-bold"
              as={`/article/${postData?.slug}`}
              href={`/article/[slug]`}
              passHref
            >
              {postData?.title}
            </NextLink>
          </Typography>

          <Typography
            className="mt-2.5 mb-0 text-[#666] text-[13px] leading-[160%] [line-break:anywhere]"
            paragraph
          >
            {truncate(postData?.excerpt)}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default memo(CardFullWide);
