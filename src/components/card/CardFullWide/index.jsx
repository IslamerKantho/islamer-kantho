import Image from "next/image";
import NextLink from "next/link";
import { imageBuilder } from "../../../pages/api/sanity";
import { truncate } from "../../../utils/string.utils";
import Link from "next/link";
import clsx from "clsx";
import { memo } from "react";

const CardFullWide = ( { className, postData, ...rest } ) => {
  return (
    <article
      className={ clsx( "relative block max-w-[760px] group", className ) }
      { ...rest }
    >
      <div className="w-full flex flex-col sm:flex-row gap-5">
        { postData.coverImage && (
          <div className="w-full sm:w-[330px] rounded-lg overflow-hidden shrink-0 bg-gray-50 border border-slate-100 shadow-sm relative">
            <Link href={ `/article/${postData?.slug}` }>
              <Image
                className="rounded-lg object-cover w-full h-auto group-hover:scale-103 transition-transform duration-500"
                src={ imageBuilder( postData?.coverImage )
                  .width( 330 )
                  .height( 208 )
                  .url() }
                width={ 330 }
                height={ 208 }
                alt={ postData?.title || "Article Image" }
                placeholder="blur"
                blurDataURL={ imageBuilder( postData?.coverImage )
                  .width( 330 )
                  .height( 208 )
                  .url() }
              />
            </Link>
          </div>
        ) }

        <div className="w-full sm:w-[calc(100%-350px)] flex flex-col justify-center">
          <div className="mt-1 flex items-center flex-row gap-2">
            <Link
              className="text-primary hover:underline text-[11px] font-bold leading-4 no-underline uppercase"
              href={ `/category/${postData?.category?.slug}` }
            >
              { postData?.category?.title }
            </Link>
            <span className="pl-2 border-l border-gray-300 text-gray-400 text-[11px] font-medium leading-4">
              { postData?.author?.name }
            </span>
          </div>

          <h3 className="mt-2.5 mb-1.5 relative font-bold text-[16px] md:text-[18px] leading-snug cursor-pointer group-hover:text-primary/80 transition-colors">
            <NextLink
              className="text-primary no-underline font-bold"
              href={ `/article/${postData?.slug}` }
            >
              { postData?.title }
            </NextLink>
          </h3>

          <p className="mt-1 mb-0 text-slate-500 text-[13px] leading-[160%] line-clamp-3">
            { truncate( postData?.excerpt ) }
          </p>
        </div>
      </div>
    </article>
  );
};

export default memo( CardFullWide );
