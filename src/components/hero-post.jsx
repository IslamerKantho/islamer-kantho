import FormatterDate from "./FormatterDate";
import CoverImage from "./cover-image";
import Link from "next/link";

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <section>
      <div>
        <CoverImage
          slug={slug}
          imageObject={coverImage}
          title={title}
          url={coverImage}
        />
      </div>
      <div>
        <div>
          <h3>
            <Link as={`/article/${slug}`} href="/article/[slug]">
              {title}
            </Link>
          </h3>
          <div>
            <FormatterDate dateString={date} />
          </div>
        </div>
        <div>
          <p>{excerpt}</p>
          {author?.name && <span>{author.name}</span>}
        </div>
      </div>
    </section>
  );
}
