import { memo } from "react";

const SectionWidget = ({ title, children, ...rest }) => {
  return (
    <section className="w-full py-10 md:py-12" {...rest}>
      {title && (
        <div className="w-full">
          <div className="container">
            <h4 className="mb-5 text-[#055547] text-lg font-bold">
              {title}
            </h4>
          </div>
        </div>
      )}

      <div className="w-full">
        <div className="container">
          {children}
        </div>
      </div>
    </section>
  );
};

export default memo(SectionWidget);
