import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { imageBuilder } from "../../pages/api/sanity";
import clsx from "clsx";

const HeroBanner = ({ className, post, ...rest }) => {
  return (
    <section
      className={clsx(
        "w-full max-h-[580px] relative block border-b-[6px] border-b-primary overflow-hidden",
        className
      )}
      {...rest}
    >
      <div className="w-full max-h-[580px] absolute inset-0 -z-10">
        {post?.coverImage && (
          <Image
            alt={post?.title || "Banner"}
            src={imageBuilder(post?.coverImage).height(1080).width(1920).url()}
            fill
            className="object-cover object-center"
          />
        )}
      </div>

      <div className="h-[350px] md:h-[calc(94vh-6px)] xl:h-[580px] max-h-[580px] bg-black/40">
        <div className="container h-full min-h-[350px] sm:min-h-[calc(94vh-6px)] xl:min-h-[580px] max-h-[580px] pt-[20px] sm:pt-[40px] md:pt-[100px] pb-[20px] sm:pb-[40px] md:pb-[80px] flex flex-col justify-end items-start">
          <Link
            href={`/article/${post?.slug}`}
            title={post?.title}
            className="max-w-[825px] text-[26px] sm:text-[32px] md:text-[42px] leading-[26px] sm:leading-[55px] font-bold text-white no-underline hover:underline"
          >
            <h1>{post?.title}</h1>
          </Link>

          <p className="max-w-[825px] mt-2.5 md:mt-5 text-[13px] sm:text-[15px] leading-[23px] sm:leading-[25px] text-white/80 line-clamp-3">
            {post?.excerpt}
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(HeroBanner);
