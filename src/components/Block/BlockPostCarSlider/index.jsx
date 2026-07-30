import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import SectionWidget from "../../SectionWidget";
import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { imageBuilder } from "../../../pages/api/sanity";
import Image from "next/image";
import Link from "next/link";
import { truncate } from "../../../utils/string.utils";
import { Grid, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

const PostCard = ({ cardData }) => {
  const article = cardData;

  return (
    <article
      key={article.slug}
      title={article.title}
      className="w-full bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <Link href={ `/article/${article.slug}` } className="">
        <div className="flex border-b-[8px] border-b-[#055547]">
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
              className="w-full h-auto object-cover"
            />
          )}
        </div>

        <div className="min-h-30.5 p-4 bg-white">
          {article?.author?.name && (
            <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded font-medium">
              {article.author.name}
            </span>
          )}

          <h3
            title={article.title}
            className="mt-2 text-sm leading-6 font-bold text-[#055547]"
          >
            {truncate(article.title, 50)}
          </h3>
        </div>
      </Link>
    </article>
  );
};

const PostGrid = ({ posts }) => {
  return (
    <div className="relative group">
      <Swiper
        spaceBetween={20}
        modules={[Grid, Navigation]}
        navigation={{
          prevEl: ".slider-prev-btn",
          nextEl: ".slider-next-btn",
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {posts &&
          posts?.map((article) => (
            <SwiperSlide key={article._id}>
              <PostCard cardData={article} />
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Navigation */}
      <button
        aria-label="Previous slide"
        className="slider-prev-btn absolute top-1/2 -translate-y-1/2 -left-3 sm:-left-5 z-10 flex items-center justify-center bg-white text-primary hover:text-primary/75 w-10 h-10 sm:w-11 sm:h-11 rounded-full shadow-md opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-hover:disabled:opacity-30 group-hover:disabled:pointer-events-none transition-all duration-300 cursor-pointer active:scale-95 border border-white/20"
      >
        <BiChevronLeft className="text-2xl sm:text-3xl" />
      </button>
      <button
        aria-label="Next slide"
        className="slider-next-btn absolute top-1/2 -translate-y-1/2 -right-3 sm:-right-5 z-10 flex items-center justify-center bg-white text-primary hover:text-primary/75 w-10 h-10 sm:w-11 sm:h-11 rounded-full shadow-md opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-hover:disabled:opacity-30 group-hover:disabled:pointer-events-none transition-all duration-300 cursor-pointer active:scale-95 border border-white/20"
      >
        <BiChevronRight className=" text-2xl sm:text-3xl" />
      </button>
    </div>
  );
};

const BlockPostCarSlider = ({ className, posts, title, ...rest }) => {
  return (
    <section className="bg-[#ECECEC] w-full group">
      <div className="container">
        <SectionWidget title={title} {...rest}>
          <PostGrid posts={posts} />
        </SectionWidget>
      </div>
    </section>
  );
};

export default memo(BlockPostCarSlider);
