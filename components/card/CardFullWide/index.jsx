import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { imageBuilder } from "../../../pages/api/sanity";
import { truncate } from "../../../utils/string.utils";
import S from "./CardFullWide.module.sass";

const CardFullWide = ({ className, postData, ...rest }) => {
  return (
    <Card
      className={[S.__card, className]}
      elevation={0}
      component="article"
      {...rest}
    >
      <Box className={S.__container}>
        {postData.coverImage && (
          <CardMedia
            className={S.__thumbnail}
            alt="Live from space album cover"
            sx={{ width: "330px" }}
          >
            {/* <Image src={ imageBuilder(postData?.coverImage).width(286).height(180).url() } width={286} height={180} layout="responsive" alt={postData?.slug} /> */}

            <Image
              className={S.__img}
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

        <CardContent className={S.__cardBody}>
          <Box className={S.__meta}>
            <Chip
              className={S.__metaCat}
              label={postData?.category?.title}
              size="small"
            />
          </Box>

          <Typography
            variant="h3"
            // component="a"
            className={S.__title}
          >
            <NextLink
              className={S.__titleLink}
              as={`/article/${postData?.slug}`}
              href={`/article/[slug]`}
              passHref
            >
              {postData?.title}
            </NextLink>
          </Typography>

          <Typography className={S.__description} paragraph>
            {truncate(postData?.excerpt)}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default CardFullWide;
