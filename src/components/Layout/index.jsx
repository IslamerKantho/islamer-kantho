import clsx from "clsx";
import PropTypes from "prop-types";
import Footer from "../Footer";
import Header from "../Header";
import NavigationMenu from "../Header/NavigationMenu";

const Layout = ({ className, children, preview = false }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60 text-slate-900 selection:bg-primary selection:text-white">
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-md focus:bg-primary focus:text-white focus:ring-2 focus:ring-secondary focus:font-bold focus:shadow-lg"
      >
        মূল বিষয়বস্তুতে যান
      </a>

      {/* Optional Preview Mode Notice */}
      {preview && (
        <div className="w-full bg-secondary text-primary text-xs font-bold py-1.5 px-4 text-center border-b border-primary/15">
          প্রিভিউ মোড সক্রিয় রয়েছে — প্রকাশিত নয় এমন খসড়া প্রদর্শিত হচ্ছে।
        </div>
      )}

      {/* Consistent Application Header with Responsive Navigation Menu */}
      <Header />

      {/* Main Content Container */}
      <main
        id="main-content"
        className={clsx(
          "flex-1 w-full max-w-full focus:outline-none",
          className
        )}
      >
        {children}
      </main>

      {/* Consistent Application Footer */}
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  preview: PropTypes.bool,
};

export { NavigationMenu };
export default Layout;
