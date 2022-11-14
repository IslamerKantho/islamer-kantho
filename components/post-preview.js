import FormatterDate from "./FormatterDate";
import CoverImage from "./cover-image";
import Link from "next/link";
import { imageBuilder } from "../lib/sanity";
export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <div>
      <div>
        <CoverImage
          slug={slug}
          title={title}
          imageObject={coverImage}
          url={imageBuilder(coverImage).url()}
        />
      </div>
      <h3>
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          {title}
        </Link>
      </h3>
      <div>
        <FormatterDate dateString={date} />
      </div>
      <p>{excerpt}</p>
      {/* <Avatar name={author?.name} picture={author?.picture} /> */}
    </div>
  );
}
