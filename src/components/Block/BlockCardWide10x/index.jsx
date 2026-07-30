import CardFullWide from "../../card/CardFullWide";
import SectionWidget from "../../SectionWidget";
import { memo } from "react";
import clsx from "clsx";

const BlockCardWide10x = ({
  className,
  title,
  posts,
  isPaginate,
  loading,
  onLoadMore,
}) => {
  return (
    <SectionWidget className={clsx(className)} title="সাম্প্রতিক লেখাসমুহ">
      {/* Post loop */}
      <div className="flex flex-col gap-6">
        {posts &&
          posts.map((post, i) => (
            <div key={post._id || i} className="w-full">
              <CardFullWide postData={post} />
            </div>
          ))}
      </div>

      {isPaginate && (
        <div className="w-full pt-10 flex justify-center items-center">
          <button
            className="h-12 w-full max-w-[320px] px-6 py-2.5 bg-[#055547] hover:bg-[#055547ee] text-white font-semibold rounded transition-colors disabled:opacity-50"
            disabled={loading}
            onClick={onLoadMore}
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </SectionWidget>
  );
};

export default memo(BlockCardWide10x);
