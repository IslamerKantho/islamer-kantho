import FormatterDate from "@/components/FormatterDate";
import { imageBuilder } from "@/pages/api/sanity";
import { truncate } from "@/utils/string.utils";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

const ArchivePostCard = ( { article } ) => {
  return (
    <article className="w-full" key={ article.slug }>
      <Link href={ `/article/${article.slug}` } className="group">
        { article.coverImage && (
          <div className="w-full flex justify-center items-center rounded-md overflow-hidden">
            <Image
              src={ imageBuilder( article?.coverImage )
                .width( 286 )
                .height( 161 )
                .url() }
              width={ 286 }
              height={ 161 }
              alt={ article.title }
              placeholder="blur"
              blurDataURL={ imageBuilder( article?.coverImage )
                .width( 286 )
                .height( 161 )
                .url() }
              className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-300"
            />
          </div>
        ) }

        <div className="md:min-h-24">
          <div className="mt-4 flex items-center flex-row">
            <Link
              className="text-black hover:opacity-75 text-[11px] font-bold leading-4"
              href={ `/category/${article?.category?.slug}` }
            >
              { article?.category?.title }
            </Link>
            <p className="ml-2 pl-2 border-l border-gray-300 text-[#6b6b6b] text-[11px] font-bold leading-4.5 uppercase">
              <FormatterDate dateString={ article?.date?.updatedAt || article?.date?.createdAt } />
            </p>
          </div>

          <h3 className="mt-2.5 mb-0 text-primary text-[15px] font-bold group-hover:opacity-75">
            { article.title }
          </h3>

          {/* <p className="my-2 text-[#6b6b6b] text-xs leading-[160%] [line-break:anywhere]">
            { truncate( article?.excerpt ) }
          </p> */}

          <span className="text-[#6b6b6b] hover:opacity-75 text-[11px] font-bold leading-4">
            { article?.author?.name }
          </span>
        </div>
      </Link>
    </article>
  );
};

export default memo( ArchivePostCard );
