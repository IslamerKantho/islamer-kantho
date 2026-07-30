import { imageBuilder } from "../../../pages/api/sanity";
import Image from "next/image";
import Link from "next/link";
import { truncate } from "../../../utils/string.utils";
import { memo } from "react";

const CardGrid = ({ cardData }) => {
  const article = cardData;

  return (
    <article
      className="w-full bg-white rounded shadow-[0px_0px_20px_0_rgba(0,0,0,0.15)] overflow-hidden"
      key={article.slug}
    >
      <Link href={`/article/${article.slug}`} className="block no-underline">
        <div className="flex border-b border-b-[#055547]">
          {article.coverImage && (
            <Image
              src={imageBuilder(article?.coverImage)
                .width(286)
                .height(161)
                .url()}
              width={286}
              height={161}
              alt={article.title}
              placeholder="blur"
              blurDataURL={imageBuilder(article?.coverImage)
                .width(286)
                .height(161)
                .url()}
              className="w-full h-auto object-cover"
            />
          )}
        </div>

        <div className="min-h-[122px] p-5 bg-white">
          {article?.author?.name && (
            <span className="inline-block px-2.5 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full font-medium">
              {article.author.name}
            </span>
          )}

          <h3
            className="mt-2.5 text-sm font-bold text-[#055547]"
            title={article.title}
          >
            {truncate(article.title, 50)}
          </h3>
        </div>
      </Link>
    </article>
  );
};

export default memo(CardGrid);
