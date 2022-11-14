import Avatar from "../components/avatar";
import Date from "../components/date";
import CoverImage from "../components/cover-image";
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
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <p>{excerpt}</p>
          <Avatar name={author?.name} picture={author?.picture} />
        </div>
      </div>
    </section>
  );
}
