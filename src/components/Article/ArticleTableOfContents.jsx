import { useState } from "react";
import PropTypes from "prop-types";
import { toBengaliNumber } from "../../utils/articleContent.utils";

export default function ArticleTableOfContents({
  tocItems = [],
  verseItems = [],
  activeBlockKey = null,
  onJumpToBlock,
  onPlayFromBlock,
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (tocItems.length === 0 && verseItems.length === 0) {
    return null;
  }

  const handleSelectAnchor = (item) => {
    if (onJumpToBlock) {
      onJumpToBlock(item.blockKey, item.anchorId);
    } else if (typeof document !== "undefined") {
      const target = document.getElementById(item.anchorId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <div className="my-7 rounded-xl border border-[#E2D9C8] bg-[#FAF8F5] overflow-hidden print:hidden">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#044f4f]/[0.04] border-b border-[#E2D9C8]">
        <div className="flex items-center gap-2.5">
          <svg
            className="w-4 h-4 text-[#044f4f] shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h10"
            />
          </svg>
          <div>
            <h3 className="text-sm md:text-[15px] font-bold text-[#044f4f]">
              প্রবন্ধের সূচিপত্র ও মূল দলিলসমূহ
            </h3>
            <p className="text-[11px] text-slate-600 mt-0.5">
              {toBengaliNumber(tocItems.length)}টি অনুচ্ছেদ
              {verseItems.length > 0 &&
                ` · ${toBengaliNumber(verseItems.length)}টি আয়াত/হাদীস ও মূল শিক্ষা`}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#044f4f] hover:bg-[#044f4f]/10 rounded-md transition-colors cursor-pointer"
        >
          <span>{isExpanded ? "সংক্ষিপ্ত করুন" : "বিস্তারিত দেখুন"}</span>
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left / Main Column: Section & Paragraph Outline */}
          <div
            className={
              verseItems.length > 0 ? "md:col-span-7" : "md:col-span-12"
            }
          >
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 pb-1.5 border-b border-[#E2D9C8]/70">
              পাঠ্যক্রম ও অনুচ্ছেদসমূহ
            </div>
            <ol className="space-y-2">
              {tocItems.map((item) => {
                const isActive = activeBlockKey === item.blockKey;
                return (
                  <li
                    key={item.id}
                    className={`group flex items-start justify-between gap-2 p-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#044f4f]/10 text-[#044f4f]"
                        : "hover:bg-[#044f4f]/[0.05] text-slate-800"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectAnchor(item)}
                      className="flex items-start gap-2.5 text-left flex-1 cursor-pointer"
                    >
                      <span
                        className={`inline-flex items-center justify-center w-5 h-5 rounded text-[11px] font-bold shrink-0 mt-0.5 ${
                          isActive
                            ? "bg-[#044f4f] text-white"
                            : "bg-[#E2D9C8]/70 text-[#044f4f] group-hover:bg-[#044f4f] group-hover:text-white"
                        } transition-colors`}
                      >
                        {item.bnIndex}
                      </span>
                      <span
                        className={`text-[13px] leading-[21px] ${
                          item.isHeading || isActive
                            ? "font-bold text-[#044f4f]"
                            : "font-medium text-slate-800 group-hover:text-[#044f4f]"
                        }`}
                      >
                        {item.title}
                      </span>
                    </button>

                    {onPlayFromBlock && (
                      <button
                        type="button"
                        onClick={() => onPlayFromBlock(item.blockKey)}
                        title="এই অনুচ্ছেদ থেকে শুনুন"
                        aria-label="এই অনুচ্ছেদ থেকে শুনুন"
                        className={`shrink-0 px-2 py-1 rounded text-[11px] font-medium inline-flex items-center gap-1 transition-all cursor-pointer ${
                          isActive
                            ? "bg-[#044f4f] text-white opacity-100"
                            : "text-[#044f4f] bg-[#044f4f]/10 opacity-80 md:opacity-0 group-hover:opacity-100 hover:bg-[#044f4f] hover:text-white"
                        }`}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                        <span>শুনুন</span>
                      </button>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Right Column: Key Verses, Hadith & Scholarly Notes */}
          {verseItems.length > 0 && (
            <div className="md:col-span-5 md:border-l md:border-[#E2D9C8]/80 md:pl-5">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 pb-1.5 border-b border-[#E2D9C8]/70">
                উল্লেখিত আয়াত, হাদীস ও মূল শিক্ষা
              </div>
              <div className="space-y-3">
                {verseItems.map((verse) => {
                  const isActive = activeBlockKey === verse.blockKey;
                  return (
                    <div
                      key={verse.id}
                      className={`p-3 rounded-lg border transition-all ${
                        isActive
                          ? "border-[#044f4f] bg-[#044f4f]/10"
                          : "border-[#E2D9C8] bg-white hover:border-[#044f4f]/50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-bold text-[#044f4f]">
                          {verse.type === "quranVerse" ? "📖 " : "💡 "}
                          {verse.source}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {onPlayFromBlock && (
                            <button
                              type="button"
                              onClick={() => onPlayFromBlock(verse.blockKey)}
                              title="এই দলিলটি শুনুন"
                              className="text-[11px] font-semibold text-[#044f4f] hover:underline cursor-pointer"
                            >
                              শুনুন
                            </button>
                          )}
                          <span className="text-slate-300">·</span>
                          <button
                            type="button"
                            onClick={() => handleSelectAnchor(verse)}
                            className="text-[11px] font-semibold text-[#044f4f] hover:underline cursor-pointer"
                          >
                            দেখুন →
                          </button>
                        </div>
                      </div>
                      {verse.translation && (
                        <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed italic">
                          “{verse.translation}”
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

ArticleTableOfContents.propTypes = {
  tocItems: PropTypes.array,
  verseItems: PropTypes.array,
  activeBlockKey: PropTypes.string,
  onJumpToBlock: PropTypes.func,
  onPlayFromBlock: PropTypes.func,
};
