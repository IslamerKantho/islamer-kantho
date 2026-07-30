import clsx from "clsx";

const BlockPageHeader = ({ className, title, subtitle, ...rest }) => {
  return (
    <section className={clsx("relative py-16 sm:py-32 text-center text-white overflow-hidden", className)} {...rest}>
      <div className="absolute inset-0 -z-10 bg-[url('https://images.pexels.com/photos/3638731/pexels-photo-3638731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center bg-no-repeat after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-b after:from-[#055547] after:to-[#055547]/40" />

      <div className="max-w-[800px] mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          {title}
        </h1>
        {subtitle && <p className="text-base leading-6 text-white mb-4">{subtitle}</p>}
      </div>
    </section>
  );
};

export default BlockPageHeader;
