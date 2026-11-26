import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { toBengaliNumber } from "../../utils/articleContent.utils";

export default function ReadingProgressBar({ targetId = "article-reading-container" }) {
  const [progress, setProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const calculateProgress = useCallback(() => {
    if (typeof window === "undefined") return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    setShowScrollTop(scrollTop > 180);

    const windowHeight = window.innerHeight;
    const maxDocScroll = Math.max(
      1,
      document.documentElement.scrollHeight - windowHeight
    );

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      const elementTop = rect.top + scrollTop;
      const elementBottom = elementTop + targetEl.offsetHeight;

      // Finish (100%) right when the bottom of the article + references (just above the share buttons)
      // reaches the reader's lower viewport reading line.
      const finishScrollPoint = elementBottom - windowHeight * 0.85;
      const effectiveEndScroll =
        finishScrollPoint > 0
          ? Math.min(finishScrollPoint, maxDocScroll)
          : Math.min(elementBottom * 0.5, maxDocScroll);

      if (scrollTop <= 0) {
        setProgress(0);
        return;
      }

      const rawPercentage =
        (scrollTop / Math.max(1, effectiveEndScroll)) * 100;
      const clamped = Math.min(100, Math.max(0, rawPercentage));
      setProgress(clamped);
    } else {
      const clamped = Math.min(
        100,
        Math.max(0, (scrollTop / maxDocScroll) * 100)
      );
      setProgress(clamped);
    }
  }, [targetId]);

  useEffect(() => {
    let rafId = null;

    const handleScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        calculateProgress();
        rafId = null;
      });
    };

    calculateProgress();
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [calculateProgress]);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const roundedProgress = Math.round(progress);
  const circleRadius = 18;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset =
    circleCircumference - (progress / 100) * circleCircumference;

  return (
    <>
      {/* Top Fixed Scroll-Based Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-[#044f4f]/15 pointer-events-none print:hidden"
        role="progressbar"
        aria-valuenow={roundedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="প্রবন্ধ পাঠের অগ্রগতি"
      >
        <div
          className="h-full bg-gradient-to-r from-[#044f4f] via-[#066868] to-[#D1BB9E] transition-[width] duration-150 ease-out shadow-[0_0_10px_rgba(209,187,158,0.75)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Floating Scroll-to-Top Button with Live Reading Progress Ring */}
      <div
        className={`fixed bottom-6 right-5 md:right-8 z-40 transition-all duration-300 print:hidden ${
          showScrollTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <button
          type="button"
          onClick={scrollToTop}
          title={`উপরে যান (${toBengaliNumber(roundedProgress)}% পড়া হয়েছে)`}
          aria-label="পৃষ্ঠার উপরে ফিরে যান"
          className="group relative flex items-center gap-2.5 bg-[#044f4f] hover:bg-[#033d3d] text-white pl-2.5 pr-3.5 py-2 rounded-full shadow-lg border border-[#D1BB9E]/40 transition-all duration-200 cursor-pointer"
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg className="w-10 h-10 -rotate-90" viewBox="0 0 44 44">
              <circle
                cx="22"
                cy="22"
                r={circleRadius}
                fill="none"
                stroke="rgba(209, 187, 158, 0.22)"
                strokeWidth="2.75"
              />
              <circle
                cx="22"
                cy="22"
                r={circleRadius}
                fill="none"
                stroke="#D1BB9E"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeDasharray={circleCircumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-150 ease-out"
              />
            </svg>
            <svg
              className="w-4 h-4 text-[#D1BB9E] group-hover:-translate-y-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </div>
          <div className="text-left pr-0.5">
            <span className="block text-[10px] leading-tight text-[#D1BB9E] font-medium">
              পাঠ সম্পন্ন
            </span>
            <span className="block text-xs font-bold leading-tight text-white">
              {toBengaliNumber(roundedProgress)}%
            </span>
          </div>
        </button>
      </div>
    </>
  );
}

ReadingProgressBar.propTypes = {
  targetId: PropTypes.string,
};
