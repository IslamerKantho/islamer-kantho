import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import SectionWidget from "../../SectionWidget";
import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { imageBuilder } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { truncate } from "../../../utils/string.utils";
import { Grid, Navigation } from "swiper/modules";
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

const PostCard = ({ cardData }) => {
  const article = cardData;
  const imageUrl = article?.coverImage
    ? imageBuilder(article.coverImage)
        .width(286)
        .height(161)
        .auto("format")
        .url()
    : null;

  return (
    <article
      key={article.slug}
      title={article.title}
      className="w-full bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <Link href={ `/article/${article.slug}` } className="">
        <div className="flex border-b-[8px] border-b-[#055547]">
          {imageUrl && (
            <Image
              src={imageUrl}
              width={286}
              height={161}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              alt={article.title || "প্রবন্ধের ছবি"}
              className="w-full h-auto object-cover"
            />
          )}
        </div>

        <div className="min-h-30.5 p-4 bg-white">
          {article?.author?.name && (
            <span className="block text-xs text-slate-500 font-semibold">
              {article.author.name}
            </span>
          )}

          <h3
            title={article.title}
            className="mt-1.5 text-sm leading-6 font-bold text-[#055547]"
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
        type="button"
        aria-label="Previous slide"
        className="slider-prev-btn absolute top-1/2 -translate-y-1/2 left-1.5 sm:-left-4 z-10 flex items-center justify-center bg-white text-primary hover:text-primary/75 w-10 h-10 sm:w-11 sm:h-11 rounded-full shadow-md opacity-90 sm:opacity-0 sm:pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto disabled:opacity-0 disabled:pointer-events-none transition-all duration-200 cursor-pointer active:scale-95 border border-slate-200/80"
      >
        <BiChevronLeft className="text-2xl sm:text-3xl" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        className="slider-next-btn absolute top-1/2 -translate-y-1/2 right-1.5 sm:-right-4 z-10 flex items-center justify-center bg-white text-primary hover:text-primary/75 w-10 h-10 sm:w-11 sm:h-11 rounded-full shadow-md opacity-90 sm:opacity-0 sm:pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto disabled:opacity-0 disabled:pointer-events-none transition-all duration-200 cursor-pointer active:scale-95 border border-slate-200/80"
      >
        <BiChevronRight className="text-2xl sm:text-3xl" />
      </button>
    </div>
  );
};

const BlockPostCarSlider = ({ className, posts, title, ...rest }) => {
  return (
    <section className="bg-[#ECECEC] w-full overflow-hidden group">
      <div className="container">
        <SectionWidget title={title} {...rest}>
          <PostGrid posts={posts} />
        </SectionWidget>
      </div>
    </section>
  );
};

export default memo(BlockPostCarSlider);
