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

const CardFullWide = ({ className, postData, ...rest }) => {
  return (
    <Card
      className={className}
      elevation={0}
      component="article"
      sx={{
        position: "relative",
        display: "block",
      }}
      {...rest}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flex: "auto 0 1",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        {postData.coverImage && (
          <CardMedia
            alt="Live from space album cover"
            sx={{
              width: { xs: "100%", md: "330px" },
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            {/* <Image src={ imageBuilder(postData?.coverImage).width(286).height(180).url() } width={286} height={180} layout="responsive" alt={postData?.slug} /> */}

            <Image
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
              sx={{ borderRadius: "10px" }}
            />
          </CardMedia>
        )}

        <CardContent
          sx={{
            width: { xs: "100%", md: "calc(100% - 330px)" },
          }}
        >
          <Box>
            <Chip label={postData?.category?.title} size="small" />
          </Box>

          <Typography
            variant="h3"
            sx={{
              marginTop: "15px",
              position: "relative",
              fontWeight: "600",
              fontSize: "16px",
              lineHeight: "23px",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            <NextLink
              as={`/article/${postData?.slug}`}
              href={`/article/[slug]`}
              passHref
              style={{
                fontSize: "inherit",
                lineHeight: "inherit",
                color: "#055547",
                textDecoration: "none",
              }}
            >
              {postData?.title}
            </NextLink>
          </Typography>

          <Typography
            paragraph
            sx={{
              marginTop: "10px",
              marginBottom: "0",
              fontSize: "14px",
              lineBreak: "anywhere",
            }}
          >
            {truncate(postData?.excerpt)}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default CardFullWide;
