import clsx from "clsx";

const BlockPageHeader = ({ className, title, subtitle, ...rest }) => {
  return (
    <section
      className={clsx(
        "relative py-12 sm:py-20 md:py-24 text-center text-white overflow-hidden",
        className
      )}
      {...rest}
    >
      <div className="absolute inset-0 -z-10 bg-[url('/img/banner.jpg')] bg-cover bg-center bg-no-repeat after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-b after:from-[#044f4f]/90 after:via-[#044f4f]/80 after:to-[#044f4f]/65" />

      <div className="max-w-[800px] mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug mb-3 text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-base leading-relaxed text-white/90 mb-0 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default BlockPageHeader;
