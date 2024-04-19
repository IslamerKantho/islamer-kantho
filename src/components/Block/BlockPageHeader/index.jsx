import { Box } from "@mui/material";
import clsx from "clsx";

const BlockPageHeader = ({ className, title, subtitle, ...rest }) => {
  return (
    <>
      <section className={clsx("d9_pageHeader", className)} {...rest}>
        <div className="d9_bg"></div>

        <div className="d9_container">
          <h1 className="d9__title">{title}</h1>
          {subtitle ?? <p className="d9__subtitle"></p>}
        </div>
      </section>

      <style jsx>{`
        .d9_pageHeader {
          position: relative;
          padding: 8rem 0;
          text-align: center;
          color: #fff;
        }
        .d9_pageHeader .d9_bg {
          background-image: url("https://images.pexels.com/photos/3638731/pexels-photo-3638731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;

          &:before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            background-image: linear-gradient(
              to bottom,
              #055547,
              rgba(5, 85, 71, 0.4)
            );

            z-index: 1;
          }
        }

        .d9_pageHeader .d9_container {
          max-width: 800px;
          margin: 0 auto;
        }
        .d9__title,
        .d9__subtitle {
          margin: 0;
          padding: 0;
        }

        .d9__title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #fff;

          margin-bottom: 1rem;

          @media (max-width: 600px) {
            font-size: 2rem;
          }
        }

        .d9__subtitle {
          font-size: 1rem;
          line-height: 1.5rem;
          font-weight: 400;
          color: #fff;
          margin-bottom: 1rem;
        }

        @media (max-width: 600px) {
          .d9_pageHeader {
            padding: 4rem 0;
          }
        }

        @media (max-width: 400px) {
          .d9__title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default BlockPageHeader;
