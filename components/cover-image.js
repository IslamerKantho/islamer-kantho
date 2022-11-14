import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { imageBuilder } from "../pages/api/sanity";

export default function CoverImage({ title, url, imageObject, slug }) {
  const image = (
    <Image
      width={1240}
      height={540}
      alt={`Cover Image for ${title}`}
      src={imageBuilder(imageObject).width(1240).height(540).url()}
    />
  );

  return (
    <div>
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
