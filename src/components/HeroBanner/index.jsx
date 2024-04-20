import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { imageBuilder } from "../../pages/api/sanity";
import clsx from "clsx";

const HeroBanner = ({ className, post, ...rest }) => {
  return (
    <Box
      className={clsx("ik_heroBanner", className)}
      component="section"
      sx={{
        width: "100%",
        // minHeight: { xs: "350px", sm: "calc(94vh - 6px)" },
        maxHeight: "650px",
        position: "relative",
        display: "block",
        borderBottom: "6px solid #055547",
        overflow: "hidden",
      }}
      {...rest}
    >
      <Box
        sx={{
          width: "100%",
        maxHeight: "650px",
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          zIndex: -1,
          "&::after": {
            // content: "",
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            background: "linear-gradient(to bottom,#055547, rgba(5, 85, 71, 0.4))",
            // background:
            //   "linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.7) 100%)",
          },
        }}
      >
        <Image
          alt={post?.title}
          // src={imageBuilder(post?.coverImage).height(450).width(1600).url()}
          src={imageBuilder(post?.coverImage).height(1080).width(1920).url()}
          layout="fill"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </Box>

      <Box
        sx={{
          height: { xs: "350px", md: "calc(94vh - 6px)", xl: "650px" },
          maxHeight: "650px",
          background: "#00000065",
        }}
      >
        <Container className="max-w-[1280px]"
          maxWidth="lg"
          sx={{
            height: "100%",
            minHeight: { xs: "350px", sm: "calc(94vh - 6px)", xl: "650px" },
            maxHeight: "650px",
            paddingTop: { xs: "20px", sm: "40px", md: "100px" },
            paddingBottom: { xs: "20px", sm: "40px", md: "80px" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <Typography
            href={`/article/${post?.slug}`}
            title={post?.title}
            variant="h1"
            component={Link}
            sx={{
              maxWidth: { md: "825px" },
              fontSize: { xs: "26px", sm: "32px", md: "42px" },
              lineHeight: { xs: "26px", sm: "55px" },
              fontWeight: "bold",
              color: "white",
              textDecoration: "none",
            }}
          >
            {post?.title}
          </Typography>

          <Typography
            variant="body1"
            component="p"
            sx={{
              maxWidth: { md: "825px" },
              marginTop: { xs: "10px", md: "20px" },
              fontSize: { xs: "13px", sm: "15px" },
              lineHeight: { xs: "23px", sm: "25px" },
              color: "rgb(255 255 255 / 80%)",
            }}
          >
            {post?.excerpt}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default memo(HeroBanner);
