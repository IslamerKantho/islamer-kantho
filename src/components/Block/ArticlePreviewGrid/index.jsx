import { useState, useEffect, useCallback, memo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import ArchivePostCard from "@/components/card/ArchivePostCard";

const DEFAULT_FILTER_CATEGORIES = [
  { title: "সকল বিভাগ", slug: "all" },
  { title: "তাফসীর", slug: "tafsir" },
  { title: "হাদীস", slug: "hadith" },
  { title: "সীরাত", slug: "sirath" },
  { title: "আকাঈদ", slug: "aqaidh" },
  { title: "সালাত", slug: "salath" },
  { title: "পারিবারিক জীবন", slug: "paribarik-jibon" },
  { title: "তাসাওউফ", slug: "tasauf" },
  { title: "ইসলামি অর্থনীতি", slug: "islamic-orthonithi" },
];

const ArticlePreviewGrid = ({
  className,
  title,
  subtitle,
  posts = [],
  isPaginate = false,
  initialOffset = 9,
  pageSize = 9,
  activeCategorySlug = "",
  showCategoryFilter = false,
  loading: externalLoading = false,
  onLoadMore: externalOnLoadMore,
  emptyMessage = "এই বিভাগে কোনো প্রবন্ধ পাওয়া যায়নি।",
}) => {
  const [selectedCategory, setSelectedCategory] = useState(
    activeCategorySlug || "all"
  );
  const [articles, setArticles] = useState(posts || []);
  const [canPaginate, setCanPaginate] = useState(Boolean(isPaginate));
  const [offset, setOffset] = useState(initialOffset || (posts?.length ?? 0));
  const [internalLoading, setInternalLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);

  // Sync with incoming props when initial posts or activeCategorySlug changes
  useEffect(() => {
    setArticles(posts || []);
    setCanPaginate(Boolean(isPaginate));
    setOffset(initialOffset || (posts?.length ?? 0));
  }, [posts, isPaginate, initialOffset]);

  useEffect(() => {
    if (activeCategorySlug) {
      setSelectedCategory(activeCategorySlug);
    }
  }, [activeCategorySlug]);

  /**
   * Handle Category Filter Tab Click
   */
  const handleCategoryChange = useCallback(
    (categorySlug) => {
      if (categorySlug === selectedCategory) return;
      setSelectedCategory(categorySlug);

      // If switched back to "all", restore initial posts first and fetch full list if needed
      if (categorySlug === "all") {
        setArticles(posts || []);
        setCanPaginate(Boolean(isPaginate));
        setOffset(initialOffset || (posts?.length ?? 0));
        return;
      }

      setFilterLoading(true);
      fetch(
        `/api/articles?offset=0&limit=${pageSize}&category=${encodeURIComponent(
          categorySlug
        )}`
      )
        .then((res) => res.json())
        .then((result) => {
          setArticles(result?.data || []);
          setCanPaginate(Boolean(result?.isPaginate));
          setOffset(result?.offset || (result?.data?.length ?? 0));
          setFilterLoading(false);
        })
        .catch(() => {
          // Fallback to client-side filter on initial posts
          const clientFiltered = (posts || []).filter(
            (p) =>
              p?.category?.slug === categorySlug ||
              p?.categories?.some((c) => c?.slug === categorySlug)
          );
          setArticles(clientFiltered);
          setCanPaginate(false);
          setFilterLoading(false);
        });
    },
    [selectedCategory, posts, isPaginate, initialOffset, pageSize]
  );

  /**
   * Handle Load More Pagination
   */
  const handleLoadMore = useCallback(() => {
    if (externalOnLoadMore && selectedCategory === "all") {
      externalOnLoadMore();
      return;
    }

    setInternalLoading(true);
    const categoryQuery =
      selectedCategory && selectedCategory !== "all"
        ? `&category=${encodeURIComponent(selectedCategory)}`
        : activeCategorySlug
          ? `&category=${encodeURIComponent(activeCategorySlug)}`
          : "";

    fetch(`/api/articles?offset=${offset}&limit=${pageSize}${categoryQuery}`)
      .then((res) => res.json())
      .then((result) => {
        if (result?.data) {
          setArticles((prev) => {
            const existingSlugs = new Set(prev.map((item) => item.slug));
            const uniqueNew = result.data.filter(
              (item) => !existingSlugs.has(item.slug)
            );
            return [...prev, ...uniqueNew];
          });
          setCanPaginate(Boolean(result.isPaginate));
          setOffset(result.offset);
        }
        setInternalLoading(false);
      })
      .catch(() => {
        setInternalLoading(false);
      });
  }, [
    externalOnLoadMore,
    selectedCategory,
    activeCategorySlug,
    offset,
    pageSize,
  ]);

  const isLoadingMore = externalLoading || internalLoading;

  return (
    <div className={clsx("w-full", className)}>
      {/* Optional Section Header & Category Filter Bar */}
      {(title || showCategoryFilter) && (
        <div className="mb-8 space-y-4">
          {title && (
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-slate-200">
              <div>
                <h2 className="m-0 text-xl md:text-2xl font-bold text-primary tracking-tight">
                  {title}
                </h2>
                {subtitle && (
                  <p className="m-0 mt-1 text-xs md:text-sm text-slate-500">
                    {subtitle}
                  </p>
                )}
              </div>
              <span className="text-xs font-medium text-slate-500 tabular-nums">
                মোট {articles?.length || 0} টি প্রবন্ধ প্রদর্শিত
              </span>
            </div>
          )}

          {/* Interactive Category Filter Tabs */}
          {showCategoryFilter && (
            <div
              role="tablist"
              aria-label="বিভাগ অনুযায়ী প্রবন্ধ ফিল্টার করুন"
              className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar"
            >
              {DEFAULT_FILTER_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={clsx(
                      "px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer",
                      isActive
                        ? "bg-primary text-secondary shadow-2xs"
                        : "bg-white text-slate-700 border border-slate-200 hover:border-secondary hover:text-primary"
                    )}
                  >
                    {cat.title}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Filter Loading Indicator */}
      {filterLoading ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 mb-10">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-[360px] rounded-xl bg-white border border-slate-200 p-4 animate-pulse flex flex-col justify-between"
            >
              <div className="w-full aspect-video bg-slate-200 rounded-lg" />
              <div className="space-y-2.5 my-4">
                <div className="h-3 w-24 bg-slate-200 rounded" />
                <div className="h-5 w-full bg-slate-200 rounded" />
                <div className="h-4 w-4/5 bg-slate-200 rounded" />
              </div>
              <div className="h-3 w-32 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      ) : articles && articles.length > 0 ? (
        /* Responsive 1 / 2 / 3-Column Article Preview Grid */
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {articles.map((article, idx) => (
            <ArchivePostCard
              key={article.slug || article._id || idx}
              article={article}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="w-full py-14 px-6 text-center bg-white rounded-xl border border-slate-200 max-w-xl mx-auto my-4">
          <p className="text-slate-600 text-sm font-medium mb-4">
            {emptyMessage}
          </p>
          {showCategoryFilter && selectedCategory !== "all" && (
            <button
              type="button"
              onClick={() => handleCategoryChange("all")}
              className="px-4 py-2 rounded-lg bg-primary text-secondary text-xs font-bold hover:bg-primary/90 transition-colors cursor-pointer"
            >
              সকল প্রবন্ধ দেখুন
            </button>
          )}
        </div>
      )}

      {/* Load More Pagination */}
      {canPaginate && !filterLoading && (
        <div className="w-full pt-10 flex justify-center items-center">
          <button
            type="button"
            className="h-11 px-8 py-2.5 bg-primary hover:bg-primary/90 text-secondary font-bold text-sm rounded-lg transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap shadow-xs"
            disabled={isLoadingMore}
            onClick={handleLoadMore}
          >
            {isLoadingMore ? "লোড হচ্ছে..." : "আরও প্রবন্ধ দেখুন"}
          </button>
        </div>
      )}
    </div>
  );
};

ArticlePreviewGrid.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  posts: PropTypes.array,
  isPaginate: PropTypes.bool,
  initialOffset: PropTypes.number,
  pageSize: PropTypes.number,
  activeCategorySlug: PropTypes.string,
  showCategoryFilter: PropTypes.bool,
  loading: PropTypes.bool,
  onLoadMore: PropTypes.func,
  emptyMessage: PropTypes.string,
};

export default memo(ArticlePreviewGrid);
