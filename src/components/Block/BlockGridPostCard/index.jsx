import SectionWidget from "../../SectionWidget";
import { memo } from "react";
import { imageBuilder } from "../../../pages/api/sanity";
import Image from "next/image";
import Link from "next/link";
import { truncate } from "../../../utils/string.utils";

const PostCard = ({ cardData }) => {
  const article = cardData;

  return (
    <article
      key={article.slug}
      className="w-full bg-white rounded-md shadow-[0px_0px_20px_0_rgba(0,0,0,0.15)] overflow-hidden"
    >
      <Link href={`/article/${article.slug}`} className="no-underline block">
        <div className="flex border-b-[8px] border-b-[#055547]">
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
            <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded font-medium">
              {article.author.name}
            </span>
          )}

          <h3
            title={article.title}
            className="mt-2.5 text-sm leading-6 font-bold text-[#055547]"
          >
            {truncate(article.title, 50)}
          </h3>
        </div>
      </Link>
    </article>
  );
};

const PostGrid = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {posts &&
        posts?.map((article) => (
          <div key={article._id} className="w-full">
            <PostCard cardData={article} />
          </div>
        ))}
    </div>
  );
};

const BlockGridPostCard = ({ className, posts, title, ...rest }) => {
  return (
    <section>
      <div className="container">
        <SectionWidget title={title} {...rest}>
          <PostGrid posts={posts} />
        </SectionWidget>
      </div>
    </section>
  );
};

export default memo(BlockGridPostCard);
