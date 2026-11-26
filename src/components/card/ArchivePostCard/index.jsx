import FormatterDate from "@/components/FormatterDate";
import { imageBuilder } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import PropTypes from "prop-types";

const ArchivePostCard = ({ article }) => {
  if (!article) return null;

  const articleUrl = `/article/${article.slug}`;
  const categoryTitle =
    article?.category?.title ||
    article?.categories?.[0]?.title ||
    "প্রবন্ধ";
  const categorySlug =
    article?.category?.slug ||
    article?.categories?.[0]?.slug ||
    "";
  const publishDate =
    article?.date?.updatedAt ||
    article?.date?.createdAt ||
    article?.publishedAt;

  const thumbnailUrl = article?.coverImage
    ? imageBuilder(article.coverImage).width(640).height(360).auto("format").url()
    : "/img/banner.jpg";

  return (
    <article className="group flex flex-col h-full bg-white rounded-xl border border-slate-200/85 hover:border-secondary transition-colors duration-200 overflow-hidden">
      {/* 1. Article Thumbnail (16:9 Aspect Ratio) */}
      <Link
        href={articleUrl}
        className="relative block w-full aspect-video bg-slate-100 overflow-hidden border-b-2 border-primary/80 no-underline"
        aria-label={article.title}
      >
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            width={640}
            height={360}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={article.title || "প্রবন্ধের ছবি"}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-sm px-4 text-center">
            ইসলামের কন্ঠ
          </div>
        )}
      </Link>

      {/* 2. Card Content Body: Unboxed Metadata Kicker, Title, Excerpt & Author Footer */}
      <div className="flex flex-col flex-1 justify-between p-5">
        <div>
          {/* Unboxed Inline Metadata Kicker (Zero-Pill Discipline) */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-2">
            {categorySlug ? (
              <Link
                href={`/category/${categorySlug}`}
                className="font-bold text-primary hover:underline no-underline"
              >
                {categoryTitle}
              </Link>
            ) : (
              <span className="font-bold text-primary">{categoryTitle}</span>
            )}

            {publishDate && (
              <>
                <span aria-hidden="true" className="text-slate-300">
                  ·
                </span>
                <span className="font-medium text-slate-500">
                  <FormatterDate dateString={publishDate} />
                </span>
              </>
            )}
          </div>

          {/* Article Title */}
          <h3 className="m-0 mb-2.5 text-base md:text-[17px] font-bold leading-snug text-slate-900 group-hover:text-primary transition-colors">
            <Link
              href={articleUrl}
              className="no-underline text-inherit hover:text-primary block"
            >
              {article.title}
            </Link>
          </h3>

          {/* Article Excerpt */}
          {article.excerpt && (
            <p className="m-0 text-[13.5px] text-slate-600 leading-relaxed line-clamp-3">
              {article.excerpt}
            </p>
          )}
        </div>

        {/* Footer Row: Author Name & Read More Link */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-slate-600 truncate">
            {article?.author?.name || "ইসলামের কন্ঠ ডেস্ক"}
          </span>

          <Link
            href={articleUrl}
            className="font-bold text-primary group-hover:translate-x-0.5 transition-transform no-underline whitespace-nowrap shrink-0"
          >
            বিস্তারিত পড়ুন →
          </Link>
        </div>
      </div>
    </article>
  );
};

ArchivePostCard.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    slug: PropTypes.string,
    excerpt: PropTypes.string,
    coverImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    category: PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
    }),
    categories: PropTypes.array,
    date: PropTypes.shape({
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
    }),
    publishedAt: PropTypes.string,
    author: PropTypes.shape({
      name: PropTypes.string,
      picture: PropTypes.string,
    }),
  }),
};

export default memo(ArchivePostCard);
