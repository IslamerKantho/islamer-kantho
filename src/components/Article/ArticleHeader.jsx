import PropTypes from "prop-types";
import { getFinalDate } from "../../utils/date.utils";
import Image from "next/image";
import SocialShare from "./SocialShare";

const ArticleHeader = ({
  className,
  title,
  date,
  author,
  excerpt,
  category,
  slug,
}) => {
  return (
    <div className={`ik_article_header ${className || ""} flex flex-col justify-between h-full space-y-6`}>
      <div className="ik_header_top_content">
        {category?.title && (
          <div className="ik_meta mb-2.5">
            <span className="inline-block px-2.5 py-1 text-[13px] leading-[22px] text-white rounded bg-[#1A1A1A]">
              {category.title}
            </span>
          </div>
        )}

        <h1 className="ik_article__title mt-2.5 text-[24px] leading-[32px] sm:text-[32px] sm:leading-[40px] text-[#2A2A2A] font-bold">
          {title}
        </h1>

        {excerpt && (
          <p className="ik_article__excerpt mt-4 text-[13px] leading-[23px] text-black">
            {excerpt}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-3">
          {author?.picture ? (
            <div className="w-10 h-10 rounded-full overflow-hidden relative">
              <Image
                src={author.picture}
                alt={author.name || "Author"}
                fill
                className="object-cover"
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

        <div>
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
  category: PropTypes.object,
};

export default ArticleHeader;
