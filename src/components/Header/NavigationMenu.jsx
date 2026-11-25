import { useState, useEffect, memo } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import {
  RiMenuLine,
  RiCloseLine,
  RiArrowDownSLine,
  RiCompass3Line,
} from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { CATEGORIES } from "../../db/categories.db";

const MAIN_SECTIONS = [
  { title: "প্রচ্ছদ", url: "/" },
  { title: "আর্কাইভ", url: "/archive" },
  { title: "গ্যালারি", url: "/gallery" },
  { title: "সম্পাদকীয়", url: "/sompadokiyo" },
  { title: "আমাদের পরিচিতি", url: "/amader-porichithi" },
  { title: "লেখা পাঠানোর নিয়মাবলী", url: "/lekha-patanur-niyomaboli" },
  { title: "যোগাযোগের মাধ্যম", url: "/jugajuger-maddyom" },
];

const FEATURED_CATEGORIES = [
  { title: "তাফসীর", slug: "tafsir" },
  { title: "হাদীস", slug: "hadith" },
  { title: "সীরাত", slug: "sirath" },
  { title: "আকাঈদ", slug: "aqaidh" },
  { title: "তাসাওউফ", slug: "tasauf" },
  { title: "ঈমান", slug: "iman" },
  { title: "সালাত", slug: "salath" },
  { title: "পারিবারিক জীবন", slug: "paribarik-jibon" },
  { title: "ইসলামি অর্থনীতি", slug: "islamic-orthonithi" },
];

const NavigationMenu = ({ onOpenDrawer }) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategoryGroup, setActiveCategoryGroup] = useState("article");

  // Close mobile menu on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setMobileMenuOpen(false);
    };
    router?.events?.on("routeChangeStart", handleRouteChange);
    return () => {
      router?.events?.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  const isRouteActive = (url) => {
    if (!router?.pathname) return false;
    if (url === "/") return router.pathname === "/";
    return router.pathname.startsWith(url) || router.asPath === url;
  };

  const currentCategorySlug =
    router?.pathname === "/category/[slug]" ? router?.query?.slug : null;

  return (
    <div className="w-full bg-primary text-white border-b-2 border-secondary shadow-md">
      {/* Main Top Navigation Bar */}
      <div className="container-lg">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand & All-Categories Drawer Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            {onOpenDrawer && (
              <button
                type="button"
                onClick={onOpenDrawer}
                className="p-2 rounded-lg text-white hover:text-secondary hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-secondary transition-colors cursor-pointer"
                aria-label="সকল বিভাগ ও সাইডবার মেনু খুলুন"
                title="সকল বিভাগ"
              >
                <RiCompass3Line size={22} />
              </button>
            )}

            <NextLink
              href="/"
              className="flex items-center gap-2 font-bold text-xl md:text-2xl text-white hover:text-secondary transition-colors tracking-tight no-underline whitespace-nowrap shrink-0"
            >
              <span>ইসলামের কন্ঠ</span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-secondary" />
            </NextLink>
          </div>

          {/* Desktop Primary Section Links */}
          <nav
            aria-label="প্রধান নেভিগেশন মেনু"
            className="hidden lg:flex items-center gap-1 xl:gap-1.5"
          >
            {MAIN_SECTIONS.map((item) => {
              const active = isRouteActive(item.url);
              return (
                <NextLink
                  key={item.url}
                  href={item.url}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "relative px-3 py-2 rounded-md text-[13px] leading-5 font-bold whitespace-nowrap shrink-0 transition-all duration-150 no-underline",
                    active
                      ? "bg-white text-primary shadow-xs ring-2 ring-secondary"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.title}
                  {active && (
                    <span
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-secondary rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </NextLink>
              );
            })}
          </nav>

          {/* Right Action Controls: Search, Write CTA, Mobile Menu Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <NextLink
              href="/search"
              title="অনুসন্ধান করুন"
              aria-label="অনুসন্ধান করুন"
              className={clsx(
                "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors no-underline whitespace-nowrap shrink-0",
                isRouteActive("/search")
                  ? "bg-white text-primary ring-2 ring-secondary"
                  : "bg-white/10 text-white hover:bg-secondary hover:text-primary"
              )}
            >
              <BiSearch size={17} />
              <span className="hidden sm:inline">অনুসন্ধান</span>
            </NextLink>

            <NextLink
              href="/lekha-patanur-niyomaboli"
              className="hidden sm:inline-flex items-center px-3.5 py-2 rounded-lg text-xs font-bold bg-secondary text-primary hover:bg-white hover:text-primary transition-colors no-underline whitespace-nowrap shrink-0 shadow-xs"
            >
              লেখা পাঠান
            </NextLink>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-panel"
              aria-label={mobileMenuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-white bg-white/10 hover:bg-secondary hover:text-primary focus-visible:outline-2 focus-visible:outline-white transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? (
                <RiCloseLine size={24} />
              ) : (
                <RiMenuLine size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Category Strip (Desktop & Tablet Horizontal Scroll) */}
      <div className="w-full bg-black/15 border-t border-white/10">
        <div className="container-lg flex items-center justify-between gap-2 py-1.5 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-secondary pr-2 border-r border-white/20 whitespace-nowrap">
              বিভাগসমূহ
            </span>
            {FEATURED_CATEGORIES.map((cat) => {
              const isCatActive = currentCategorySlug === cat.slug;
              return (
                <NextLink
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className={clsx(
                    "px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap shrink-0 transition-colors no-underline",
                    isCatActive
                      ? "bg-secondary text-primary font-bold shadow-2xs"
                      : "text-white/85 hover:text-white hover:bg-white/15"
                  )}
                >
                  {cat.title}
                </NextLink>
              );
            })}
          </div>

          {onOpenDrawer && (
            <button
              type="button"
              onClick={onOpenDrawer}
              className="hidden md:inline-flex items-center gap-1 text-xs font-bold text-secondary hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer pl-2"
            >
              <span>সকল বিভাগ</span>
              <RiArrowDownSLine size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Responsive Mobile Navigation Collapse Panel */}
      <div
        id="mobile-navigation-panel"
        className={clsx(
          "lg:hidden bg-primary border-t border-secondary/30 overflow-hidden transition-all duration-200",
          mobileMenuOpen ? "max-h-[85vh] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        )}
      >
        <div className="container-lg space-y-5 overflow-y-auto max-h-[78vh]">
          {/* Mobile Main Sections */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-secondary mb-2.5 px-1">
              প্রধান পাতা
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {MAIN_SECTIONS.map((item) => {
                const active = isRouteActive(item.url);
                return (
                  <NextLink
                    key={item.url}
                    href={item.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className={clsx(
                      "flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-bold no-underline transition-colors",
                      active
                        ? "bg-white text-primary ring-2 ring-secondary"
                        : "text-white hover:bg-white/10 hover:text-secondary"
                    )}
                  >
                    <span>{item.title}</span>
                    {active && (
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </NextLink>
                );
              })}
            </div>
          </div>

          {/* Mobile Interactive Category Tabs */}
          <div className="pt-3 border-t border-white/15">
            <div className="flex items-center justify-between mb-3 px-1">
              <p className="text-xs font-bold uppercase tracking-wider text-secondary m-0">
                বিষয়ভিত্তিক বিভাগ
              </p>
              <div className="flex items-center gap-1 bg-black/20 p-1 rounded-lg">
                {Object.keys(CATEGORIES).map((groupKey) => (
                  <button
                    key={groupKey}
                    type="button"
                    onClick={() => setActiveCategoryGroup(groupKey)}
                    className={clsx(
                      "px-2.5 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer",
                      activeCategoryGroup === groupKey
                        ? "bg-secondary text-primary"
                        : "text-white/80 hover:text-white"
                    )}
                  >
                    {CATEGORIES[groupKey].title}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {CATEGORIES[activeCategoryGroup]?.list?.map((cat) => {
                const isCatActive = currentCategorySlug === cat.slug;
                return (
                  <NextLink
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={clsx(
                      "px-3 py-2 rounded-md text-xs font-semibold no-underline transition-colors truncate",
                      isCatActive
                        ? "bg-white text-primary font-bold ring-1 ring-secondary"
                        : "bg-white/10 text-white hover:bg-secondary hover:text-primary"
                    )}
                  >
                    {cat.title}
                  </NextLink>
                );
              })}
            </div>
          </div>

          {/* Mobile Bottom Action Bar */}
          <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-3">
            <NextLink
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white/15 text-white hover:bg-white hover:text-primary text-xs font-bold no-underline transition-colors"
            >
              <BiSearch size={16} />
              <span>আর্কাইভ অনুসন্ধান</span>
            </NextLink>
            <NextLink
              href="/lekha-patanur-niyomaboli"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center py-2.5 px-4 rounded-lg bg-secondary text-primary hover:bg-white text-xs font-bold no-underline transition-colors"
            >
              লেখা পাঠান
            </NextLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(NavigationMenu);
