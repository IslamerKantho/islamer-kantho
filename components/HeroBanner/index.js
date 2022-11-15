import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import { memo } from "react";
import { imageBuilder } from "../../pages/api/sanity";
import S from "./HeroBanner.module.sass";

const HeroBanner = ({ className, post, ...rest }) => {
  return (
    <Box className={[S.__heroBanner, className]} component="section" {...rest}>
      <Box className={S.__bg}>
        <Image
          className={S.__bg__image}
          alt={post?.title}
          src={imageBuilder(post?.coverImage).height(450).width(1600).url()}
          layout="fill"
        />
      </Box>

      <Box className={S.__content}>
        <Container className={S.__container} maxWidth="lg">
          <Typography
            className={S.__title}
            href={`/article/${post.slug}`}
            title={post?.title}
            variant="h1"
            component={Link}
          >
            {post?.title}
          </Typography>

          <Typography className={S.__description} variant="body1" component="p">
            {post?.excerpt}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

HeroBanner.propTypes = {
  className: PropTypes.string,
  post: PropTypes.object,
  rest: PropTypes.object,
};

export default memo(HeroBanner);
