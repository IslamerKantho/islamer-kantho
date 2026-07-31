import Link from "next/link";
import React, { memo } from "react";
import clsx from "clsx";
import FormatterDate from "../../FormatterDate";
import { imageBuilder } from "@/pages/api/sanity";

const PostCard = ( { post, index } ) => {
  return (
    <article className="h-full bg-white rounded-xl p-3 hover:bg-slate-50 transition-all duration-300 group">
      <div className="h-full flex gap-3 items-start justify-between no-underline">

        {/* Large Number index for premium feel */}
        <div className="text-2xl md:text-3xl font-bold text-primary/15 group-hover:text-primary/30 transition-colors leading-none pt-1 shrink-0 font-sans">
          {String(index + 1).padStart(2, '0')}
        </div>

        <div className="flex-1 min-w-0">
          <div className="mb-1 flex items-center space-x-2">
            <Link
              className="text-[#055547] text-[11px] font-bold leading-4 hover:underline"
              href={ `/category/${post?.category?.slug}` }
            >
              { post?.category?.title }
            </Link>
            <span className="text-stone-400 text-[11px] font-medium leading-4">
              • { post?.author?.name }
            </span>
          </div>

          <h3 className="text-primary hover:text-primary/75 text-[13px] md:text-[14px] font-bold leading-snug transition-all duration-300 line-clamp-2 mb-1.5" title={ post?.title }>
            <Link href={ `/article/${post?.slug}` }>
              { post?.title }
            </Link>
          </h3>

          <div>
            <span className="text-[11px] leading-[14px] text-gray-400 font-medium">
              <FormatterDate dateString={ post?.date?.updatedAt || post?.date?.createdAt } />
            </span>
          </div>
        </div>

        { post?.coverImage && (
          <div className="w-[84px] h-[63px] relative rounded-lg overflow-hidden shrink-0 bg-gray-100 border border-slate-100 shadow-sm">
            <Link href={ `/article/${post?.slug}` }>
              <img
                src={ imageBuilder( post?.coverImage ).width( 84 ).height( 63 ).url() }
                alt={ post?.title }
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>
        ) }
      </div>
    </article>
  );
};


const TrendingPosts = ( { className, posts, ...rest } ) => {
  return (
    <section
      className={ clsx( "py-10 bg-white", className ) }
      { ...rest }
    >
      <div className="container">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
            <h2 className="text-lg md:text-xl font-bold text-gray-900 leading-none">আলোচিত লেখাসমূহ</h2>
          </div>
        </div>

        {/* Premium Grid layout without retro borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4">
          { posts && posts.map( ( post, index ) => (
            <PostCard key={ index } post={ post } index={ index } />
          ) ) }
        </div>
      </div>
    </section>
  );
};

export default memo( TrendingPosts );
