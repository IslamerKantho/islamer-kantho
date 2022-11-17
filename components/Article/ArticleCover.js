import Image from "next/image";
import PropsType from "prop-types";
import { imageBuilder } from "../../pages/api/sanity";

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
          src={imageBuilder(src).width(660).height(372).url()}
          alt={title}
          width={660}
          height={372}
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
  src: PropsType.object,
  title: PropsType.string,
  rest: PropsType.object,
};

export default ArticleCover;
