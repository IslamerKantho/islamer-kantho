import Image from "next/image";
import NextLink from "next/link";
import { imageBuilder } from "../../../pages/api/sanity";
import { truncate } from "../../../utils/string.utils";
import Link from "next/link";
import clsx from "clsx";
import { memo } from "react";

const CardFullWide = ({ className, postData, ...rest }) => {
  return (
    <article
      className={clsx("relative block max-w-[760px]", className)}
      {...rest}
    >
      <div className="w-full flex flex-col sm:flex-row gap-4">
        {postData.coverImage && (
          <div className="w-full sm:w-[330px] rounded-lg overflow-hidden shrink-0">
            <Image
              className="rounded-lg object-cover w-full h-auto"
              src={imageBuilder(postData?.coverImage)
                .width(286)
                .height(180)
                .url()}
              width={286}
              height={180}
              alt={postData?.title || "Article Image"}
              placeholder="blur"
              blurDataURL={imageBuilder(postData?.coverImage)
                .width(286)
                .height(180)
                .url()}
            />
          </div>
        )}

        <div className="w-full sm:w-[calc(100%-330px)]">
          <div className="mt-1 flex items-center flex-row gap-2">
            <Link
              className="text-black hover:opacity-75 text-[11px] font-bold leading-4 no-underline"
              href={`/category/${postData?.category?.slug}`}
            >
              {postData?.category?.title}
            </Link>
            <span className="pl-2 border-l border-gray-300 text-[#666] text-[11px] font-bold leading-4">
              {postData?.author?.name}
            </span>
          </div>

          <h3 className="mt-3 relative font-bold text-base cursor-pointer">
            <NextLink
              className="text-primary no-underline hover:opacity-75 font-bold"
              href={`/article/${postData?.slug}`}
            >
              {postData?.title}
            </NextLink>
          </h3>

          <p className="mt-2.5 mb-0 text-[#666] text-[13px] leading-[160%] [line-break:anywhere]">
            {truncate(postData?.excerpt)}
          </p>
        </div>
      </div>
    </article>
  );
};

export default memo(CardFullWide);
