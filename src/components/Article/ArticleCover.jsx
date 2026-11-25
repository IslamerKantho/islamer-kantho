import Image from "next/image";
import PropsType from "prop-types";
import { imageBuilder } from "@/lib/sanity";

const ArticleCover = ({ className, src, title, ...rest }) => {
  return (
    <>
      <div
        className={`ik_single_cover ${className}`}
        sx={{
          width: "100%",
        }}
        {...rest}
      >
        <Image
          src={imageBuilder(src).width(660).height(372).auto("format").url()}
          alt={title || "Article Cover"}
          width={660}
          height={372}
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, 58vw"
          className="w-full h-auto rounded-lg object-cover"
        />
      </div>

      <style jsx>{`
        .ik_single_cover {
          width: 100%;
          height: auto;
        }
      `}</style>
    </>
  );
};

ArticleCover.propTypes = {
  className: PropsType.string,
  src: PropsType.oneOfType([PropsType.object, PropsType.string]),
  title: PropsType.string,
  rest: PropsType.object,
};

export default ArticleCover;
