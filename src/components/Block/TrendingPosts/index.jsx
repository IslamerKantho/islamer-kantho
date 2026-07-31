import Link from "next/link";
import React, { memo } from "react";
import clsx from "clsx";
import FormatterDate from "../../FormatterDate";

const PostCard = ( { post } ) => {
  return (
    <article className="h-full bg-white rounded-none transition-all duration-300">
      <div className="h-full flex flex-col items-start justify-start no-underline">
        <div>
          <div className="mb-1.75 flex items-center space-x-2">
            <Link
              className="text-[#055547] text-[11px] font-bold leading-4 hover:underline"
              href={ `/category/${post?.category?.slug}` }
            >
              { post?.category?.title }
            </Link>
            <span className="text-stone-400 text-[11px] font-bold leading-4">
              • { post?.author?.name }
            </span>
          </div>

          <h3 className="text-primary hover:text-primary/75 text-[15px] font-bold leading-5 transition-all duration-300" title={ post?.title }>
            <Link href={ `/article/${post?.slug}` }>
              { post?.title }
            </Link>
          </h3>
        </div>

        <div className="mt-2.5">
          <span className="text-[12px] leading-[16px] text-[#797979]">
            <FormatterDate dateString={ post?.date?.updatedAt || post?.date?.createdAt } />
          </span>
        </div>
      </div>
    </article>
  );
};


const TrendingPosts = ( { className, posts, ...rest } ) => {
  return (
    <section
      className={ clsx( "hero-banner pt-10 pb-10", className ) }
      { ...rest }
    >
      <div className="container border-t border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 divide-y sm:divide-y-0 md:divide-x divide-gray-200">
          { posts && posts.map( ( post, index ) => (
            <div
              className="min-h-25 md:min-h-30 py-3 px-3 border-b border-gray-200"
              key={ index }
            >
              <PostCard post={ post } />
            </div>
          ) ) }
        </div>
      </div>
    </section>
  );
};

export default memo( TrendingPosts );
