import { memo } from "react";
import ArticlePreviewGrid from "../ArticlePreviewGrid";

const BlockCardWide10x = ({
  className,
  title = "সাম্প্রতিক লেখাসমূহ",
  subtitle = "ইসলামের কন্ঠে প্রকাশিত সর্বশেষ প্রবন্ধ, তাফসীর, হাদীস ও জীবন জিজ্ঞাসা",
  posts,
  isPaginate,
  loading,
  onLoadMore,
  showCategoryFilter = true,
}) => {
  return (
    <ArticlePreviewGrid
      className={className}
      title={title}
      subtitle={subtitle}
      posts={posts}
      isPaginate={isPaginate}
      loading={loading}
      onLoadMore={onLoadMore}
      showCategoryFilter={showCategoryFilter}
    />
  );
};

export default memo(BlockCardWide10x);
