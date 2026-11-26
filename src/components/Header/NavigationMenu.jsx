import { useState, useEffect, memo } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import {
  RiMenuLine,
  RiCloseLine,
} from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { CATEGORIES } from "../../db/categories.db";
import BrandLogo from "../BrandLogo";

const MAIN_SECTIONS = [
  { title: "প্রচ্ছদ", url: "/" },
  { title: "আর্কাইভ", url: "/archive" },
  { title: "গ্যালারি", url: "/gallery" },
  { title: "সম্পাদকীয়", url: "/sompadokiyo" },
  { title: "আমাদের পরিচিতি", url: "/amader-porichithi" },
];

const NavigationMenu = () => {
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
    <div
      className="w-full max-w-full overflow-x-hidden bg-primary text-white border-b-2 border-secondary shadow-md"
      style={{ fontFamily: 'var(--font-hnt), "Arial", sans-serif' }}
    >
      {/* Main Top Navigation Bar */}
      <div className="container-lg mx-auto w-full max-w-full px-3 sm:px-4">
        <div className="flex min-h-[4rem] py-1.5 items-center justify-between gap-2 sm:gap-4">
          {/* Brand & All-Categories Drawer Trigger */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <NextLink
              href="/"
              aria-label="ইসলামের কন্ঠ — প্রচ্ছদ"
              className="inline-flex items-center min-h-[2.75rem] py-1 rounded-md no-underline shrink-0 transition-opacity duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              <BrandLogo
                variant="full"
                theme="dark"
                decorative
                className="h-[2rem] sm:h-[2.35rem] md:h-[2.5rem] w-auto"
              />
            </NextLink>
          </div>

          {/* Desktop Primary Section Links */}
          <nav
            aria-label="প্রধান নেভিগেশন মেনু"
            className="hidden lg:flex flex-wrap items-center justify-center gap-1 xl:gap-1.5"
          >
            {MAIN_SECTIONS.map((item) => {
              const active = isRouteActive(item.url);
              return (
                <NextLink
                  key={item.url}
                  href={item.url}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "relative inline-flex items-center min-h-[2.5rem] px-3 py-2 rounded-md text-[clamp(0.78rem,0.74rem+0.15vw,0.85rem)] leading-5 font-bold transition-all duration-150 no-underline",
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
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <NextLink
              href="/search"
              title="অনুসন্ধান করুন"
              aria-label="অনুসন্ধান করুন"
              className={clsx(
                "inline-flex items-center justify-center gap-1.5 min-w-[2.75rem] min-h-[2.75rem] px-3 py-2 rounded-lg text-[clamp(0.75rem,0.72rem+0.15vw,0.82rem)] font-bold transition-colors no-underline",
                isRouteActive("/search")
                  ? "bg-white text-primary ring-2 ring-secondary"
                  : "bg-white/10 text-white hover:bg-secondary hover:text-primary"
              )}
            >
              <BiSearch size={18} />
              <span className="hidden sm:inline">অনুসন্ধান</span>
            </NextLink>

            <NextLink
              href="/lekha-patanur-niyomaboli"
              className="hidden sm:inline-flex items-center justify-center min-h-[2.75rem] px-3.5 py-2 rounded-lg text-[clamp(0.75rem,0.72rem+0.15vw,0.82rem)] font-bold bg-secondary text-primary hover:bg-white hover:text-primary transition-colors no-underline shadow-xs"
            >
              লেখা পাঠান
            </NextLink>

            {/* Mobile Hamburger Toggle Button (44x44px min touch target) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-panel"
              aria-label={mobileMenuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
              className="lg:hidden inline-flex items-center justify-center min-w-[2.75rem] min-h-[2.75rem] p-2 rounded-lg text-white bg-white/10 hover:bg-secondary hover:text-primary focus-visible:outline-2 focus-visible:outline-white transition-colors cursor-pointer"
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

      {/* Responsive Mobile Navigation Collapse Panel */}
      <div
        id="mobile-navigation-panel"
        className={clsx(
          "lg:hidden bg-primary border-t border-secondary/30 overflow-hidden transition-all duration-200",
          mobileMenuOpen ? "max-h-[85vh] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        )}
      >
        <div className="container-lg mx-auto px-3 sm:px-4 space-y-5 overflow-y-auto max-h-[78vh]">
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
                      "flex items-center justify-between min-h-[2.75rem] px-3.5 py-2.5 rounded-lg text-sm font-bold no-underline transition-colors",
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
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-1">
              <p className="text-xs font-bold uppercase tracking-wider text-secondary m-0">
                বিষয়ভিত্তিক বিভাগ
              </p>
              <div className="flex flex-wrap items-center gap-1 bg-black/20 p-1 rounded-lg">
                {Object.keys(CATEGORIES).map((groupKey) => (
                  <button
                    key={groupKey}
                    type="button"
                    onClick={() => setActiveCategoryGroup(groupKey)}
                    className={clsx(
                      "min-h-[2.25rem] px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer",
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
                      "flex items-center min-h-[2.75rem] px-3 py-2 rounded-md text-xs font-semibold no-underline transition-colors truncate",
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
          <div className="pt-3 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
            <NextLink
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 min-w-[8.5rem] min-h-[2.75rem] flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white/15 text-white hover:bg-white hover:text-primary text-xs font-bold no-underline transition-colors"
            >
              <BiSearch size={16} />
              <span>আর্কাইভ অনুসন্ধান</span>
            </NextLink>
            <NextLink
              href="/lekha-patanur-niyomaboli"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 min-w-[8.5rem] min-h-[2.75rem] flex items-center justify-center py-2.5 px-4 rounded-lg bg-secondary text-primary hover:bg-white text-xs font-bold no-underline transition-colors"
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
