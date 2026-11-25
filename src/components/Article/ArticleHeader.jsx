import PropTypes from "prop-types";
import { getFinalDate } from "../../utils/date.utils";
import Image from "next/image";
import Link from "next/link";
import SocialShare from "./SocialShare";
import { toBengaliNumber } from "../../utils/articleContent.utils";
import { imageBuilder } from "@/lib/sanity";

const ArticleHeader = ({
  className,
  title,
  date,
  author,
  excerpt,
  category,
  slug,
  readingTime,
  isReadingMode = false,
  onToggleReadingMode,
}) => {
  const primaryCategory = Array.isArray(category) ? category[0] : category;

  return (
    <div
      id="article-header-top"
      className={`ik_article_header ${className || ""} flex flex-col justify-between h-full space-y-6`}
    >
      <div className="ik_header_top_content">
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3 text-[13px] font-semibold">
          <div className="flex flex-wrap items-center gap-2.5">
            {primaryCategory?.title && (
              <>
                {primaryCategory.slug ? (
                  <Link
                    href={`/category/${primaryCategory.slug}`}
                    className="text-[#044f4f] hover:underline tracking-wide"
                  >
                    {primaryCategory.title}
                  </Link>
                ) : (
                  <span className="text-[#044f4f] tracking-wide">
                    {primaryCategory.title}
                  </span>
                )}
              </>
            )}
            {primaryCategory?.title && readingTime && (
              <span className="text-slate-300" aria-hidden="true">
                ·
              </span>
            )}
            {readingTime && (
              <span className="inline-flex items-center text-slate-600 font-medium">
                <svg
                  className="w-3.5 h-3.5 mr-1.5 text-[#044f4f]/80"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {toBengaliNumber(readingTime)} মিনিট পাঠের সময়
              </span>
            )}
          </div>

          {onToggleReadingMode && (
            <button
              type="button"
              onClick={onToggleReadingMode}
              aria-pressed={isReadingMode}
              title={
                isReadingMode
                  ? "সাধারণ লেআউটে ফিরে যান"
                  : "মনোযোগী পঠন মোড (Reading Mode) চালু করুন"
              }
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs border ${
                isReadingMode
                  ? "bg-[#044f4f] text-[#D1BB9E] border-[#044f4f] hover:bg-[#033b3b]"
                  : "bg-[#FAF8F5] text-[#044f4f] border-[#D1BB9E] hover:bg-[#044f4f] hover:text-white hover:border-[#044f4f]"
              }`}
            >
              <svg
                className="w-3.5 h-3.5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span>
                {isReadingMode ? "পঠন মোড চালু আছে" : "পঠন মোড"}
              </span>
            </button>
          )}
        </div>

        <h1
          className={`ik_article__title mt-1 text-[#2A2A2A] font-bold transition-all ${
            isReadingMode
              ? "text-[26px] leading-[36px] sm:text-[36px] sm:leading-[48px]"
              : "text-[24px] leading-[32px] sm:text-[32px] sm:leading-[40px]"
          }`}
        >
          {title}
        </h1>

        {excerpt && (
          <p
            className={`ik_article__excerpt mt-4 text-black transition-all ${
              isReadingMode
                ? "text-[15px] leading-[27px] text-slate-700"
                : "text-[13px] leading-[23px]"
            }`}
          >
            {excerpt}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-3">
          {author?.picture ? (
            <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0">
              <Image
                src={imageBuilder(author.picture)
                  .width(80)
                  .height(80)
                  .auto("format")
                  .url()}
                alt={author.name || "Author"}
                width={40}
                height={40}
                sizes="40px"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold text-sm">
              {author?.name?.charAt(0) || "A"}
            </div>
          )}

          <div>
            {author?.name && (
              <p className="ik_article__meta__author text-[11px] leading-[16px] font-bold text-gray-900 mb-0.5">
                {author.name}
              </p>
            )}

            <p className="ik_article__meta__date text-[11px] leading-[16px] text-gray-500">
              {getFinalDate(date)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <SocialShare title={title} slug={slug} />
        </div>
      </div>
    </div>
  );
};

ArticleHeader.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.object,
  author: PropTypes.object,
  excerpt: PropTypes.string,
  category: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  slug: PropTypes.string,
  readingTime: PropTypes.number,
  isReadingMode: PropTypes.bool,
  onToggleReadingMode: PropTypes.func,
};

export default ArticleHeader;
