import 'swiper/css';
import 'swiper/css/grid';
import SectionWidget from "../../SectionWidget";
import { memo } from "react";
import {Swiper, SwiperSlide} from "swiper/react";import { imageBuilder } from "../../../pages/api/sanity";
import {
  Box,Container,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { truncate } from "../../../utils/string.utils";
import {Grid } from "swiper/modules";

const PostCard = ({ cardData }) => {
  const article = cardData;

  return (
    <Card
      component="article"
      key={article.slug}
      elevation={0}
      title={article.title}
      sx={{
        width: "100%",
        // background: "#fff",
        borderRadius: "5px",
        // boxShadow: "0px 0px 20px 0 rgb(0 0 0 / 15%)",
      }}
    >
      <Box href={`/article/${article.slug}`} component={Link} passHref sx={{ textDecoration: "none" }}>
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
      </Box>
    </Card>
  );
};


const PostGrid = ({ posts}) => {
  return (
    <Swiper
      spaceBetween={20}
      freeMode={true}
      modules={[Grid]}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        // 768: {
          //   slidesPerView: 2,
        // },
        1024: {
          slidesPerView: 4,
        },
      }}
      // grid={{rows: 2}}
    >
      {posts &&
        posts?.map((article) => (
          <SwiperSlide key={article._id}>
            <PostCard cardData={article} />
          </SwiperSlide>
        ))}
    </Swiper>
  )
}

const BlockPostCarSlider = ({ className, posts, title, ...rest }) => {
  return (
    <>
      <Box component="section" sx={{backgroundColor: "#ECECEC"}}>
        <Container maxWidth="lg">
          <SectionWidget title={title} {...rest}>
            <PostGrid posts={posts} />
          </SectionWidget>
        </Container>
      </Box>
    </>
  );
};

export default memo(BlockPostCarSlider);
