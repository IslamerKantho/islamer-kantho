import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { imageBuilder } from "@/lib/sanity";
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
            src={imageBuilder(post?.coverImage)
              .width(1920)
              .height(1080)
              .auto("format")
              .url()}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center"
          />
        )}
      </div>

      <div className="min-h-[320px] sm:min-h-[420px] md:min-h-[480px] xl:min-h-[540px] max-h-[580px] bg-gradient-to-t from-black/85 via-black/45 to-black/25 flex items-end">
        <div className="container w-full py-7 sm:py-10 md:py-16 flex flex-col justify-end items-start">
          <Link
            href={`/article/${post?.slug}`}
            title={post?.title}
            className="max-w-[825px] text-[22px] sm:text-[30px] md:text-[40px] leading-[1.45] sm:leading-[1.4] md:leading-[1.35] font-bold text-white no-underline hover:underline text-balance"
          >
            <h1>{post?.title}</h1>
          </Link>

          <p className="max-w-[780px] mt-2.5 md:mt-4 text-[13px] sm:text-[15px] leading-[1.65] text-white/85 line-clamp-3 mb-0">
            {post?.excerpt}
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(HeroBanner);
