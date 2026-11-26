import { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { toBengaliNumber } from "../../utils/articleContent.utils";

const FONT_SCALES = [
  { key: "sm", label: "ছোট" },
  { key: "base", label: "স্বাভাবিক" },
  { key: "lg", label: "বড়" },
  { key: "xl", label: "অতি বড়" },
];

const PLAYBACK_SPEEDS = [
  { value: 0.75, label: "০.৭৫x" },
  { value: 1, label: "১x" },
  { value: 1.25, label: "১.২৫x" },
  { value: 1.5, label: "১.৫x" },
];

const SAVED_ARTICLES_STORAGE_KEY = "ik_saved_articles";

export default function ArticleReadingToolbar({
  post,
  ttsSegments = [],
  fontScale = "base",
  onChangeFontScale,
  activeBlockKey = null,
  onActiveBlockChange,
  requestedPlayRequest = null,
}) {
  // Speech synthesis state
  const [ttsStatus, setTtsStatus] = useState("idle"); // 'idle' | 'playing' | 'paused'
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [selectedVoice, setSelectedVoice] = useState(null);

  // Bookmark & Saved List state
  const [savedArticles, setSavedArticles] = useState([]);
  const [showSavedDrawer, setShowSavedDrawer] = useState(false);
  const [citationCopied, setCitationCopied] = useState(false);

  // Refs to prevent stale closures inside utterance callbacks
  const statusRef = useRef("idle");
  const indexRef = useRef(0);
  const rateRef = useRef(1);
  const segmentsRef = useRef(ttsSegments);
  const voiceRef = useRef(null);

  useEffect(() => {
    segmentsRef.current = ttsSegments;
  }, [ttsSegments]);

  useEffect(() => {
    rateRef.current = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    voiceRef.current = selectedVoice;
  }, [selectedVoice]);

  // Detect Web Speech API and Bengali Voice
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSpeechSupported(false);
      return;
    }

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices() || [];
      const bnBd = voices.find((v) =>
        v.lang?.toLowerCase().startsWith("bn-bd")
      );
      const bnAny = voices.find((v) => v.lang?.toLowerCase().startsWith("bn"));
      const hiOrDefault = voices.find((v) => v.default) || voices[0] || null;
      setSelectedVoice(bnBd || bnAny || hiOrDefault);
    };

    pickVoice();
    window.speechSynthesis.onvoiceschanged = pickVoice;

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Load saved articles from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(SAVED_ARTICLES_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setSavedArticles(parsed);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, [post?.slug]);

  // Stop speech when switching to a different article slug
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    statusRef.current = "idle";
    indexRef.current = 0;
    setTtsStatus("idle");
    setCurrentSegmentIndex(0);
    if (onActiveBlockChange) {
      onActiveBlockChange(null);
    }
  }, [post?.slug, onActiveBlockChange]);

  const speakSegmentAt = useCallback(
    (targetIdx, customRate) => {
      if (
        typeof window === "undefined" ||
        !("speechSynthesis" in window) ||
        !segmentsRef.current.length
      ) {
        return;
      }

      const segments = segmentsRef.current;
      if (targetIdx < 0 || targetIdx >= segments.length) {
        window.speechSynthesis.cancel();
        statusRef.current = "idle";
        indexRef.current = 0;
        setTtsStatus("idle");
        setCurrentSegmentIndex(0);
        if (onActiveBlockChange) {
          onActiveBlockChange(null);
        }
        return;
      }

      window.speechSynthesis.cancel();

      const segment = segments[targetIdx];
      const utterance = new window.SpeechSynthesisUtterance(segment.text);
      utterance.lang = voiceRef.current?.lang?.startsWith("bn")
        ? voiceRef.current.lang
        : "bn-BD";
      if (voiceRef.current) {
        utterance.voice = voiceRef.current;
      }
      utterance.rate = customRate || rateRef.current || 1;

      indexRef.current = targetIdx;
      statusRef.current = "playing";
      setCurrentSegmentIndex(targetIdx);
      setTtsStatus("playing");

      if (onActiveBlockChange) {
        onActiveBlockChange(segment.blockKey);
      }

      utterance.onend = () => {
        if (statusRef.current !== "playing") return;
        const nextIdx = indexRef.current + 1;
        if (nextIdx < segmentsRef.current.length) {
          speakSegmentAt(nextIdx);
        } else {
          statusRef.current = "idle";
          indexRef.current = 0;
          setTtsStatus("idle");
          setCurrentSegmentIndex(0);
          if (onActiveBlockChange) {
            onActiveBlockChange(null);
          }
        }
      };

      utterance.onerror = () => {
        // Ignore intentional cancel events
        if (statusRef.current !== "playing") return;
      };

      window.speechSynthesis.speak(utterance);
    },
    [onActiveBlockChange]
  );

  // Handle external request to start reading from a specific block (e.g., from ToC or paragraph click)
  useEffect(() => {
    if (!requestedPlayRequest?.blockKey || !ttsSegments.length) return;
    const matchIndex = ttsSegments.findIndex(
      (s) => s.blockKey === requestedPlayRequest.blockKey
    );
    if (matchIndex !== -1) {
      speakSegmentAt(matchIndex);
    }
  }, [requestedPlayRequest, ttsSegments, speakSegmentAt]);

  const handlePlayPause = () => {
    if (!speechSupported || !ttsSegments.length) return;

    if (ttsStatus === "idle") {
      speakSegmentAt(currentSegmentIndex || 0);
    } else if (ttsStatus === "playing") {
      window.speechSynthesis.pause();
      statusRef.current = "paused";
      setTtsStatus("paused");
    } else if (ttsStatus === "paused") {
      window.speechSynthesis.resume();
      statusRef.current = "playing";
      setTtsStatus("playing");
    }
  };

  const handleStop = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    statusRef.current = "idle";
    indexRef.current = 0;
    setTtsStatus("idle");
    setCurrentSegmentIndex(0);
    if (onActiveBlockChange) {
      onActiveBlockChange(null);
    }
  };

  const handlePrevSegment = () => {
    const prevIdx = Math.max(0, currentSegmentIndex - 1);
    speakSegmentAt(prevIdx);
  };

  const handleNextSegment = () => {
    const nextIdx = Math.min(ttsSegments.length - 1, currentSegmentIndex + 1);
    speakSegmentAt(nextIdx);
  };

  const handleChangeSpeed = (newSpeed) => {
    setPlaybackRate(newSpeed);
    rateRef.current = newSpeed;
    if (ttsStatus === "playing") {
      speakSegmentAt(currentSegmentIndex, newSpeed);
    }
  };

  // Font Scale Controls
  const currentFontScaleIndex = Math.max(
    0,
    FONT_SCALES.findIndex((s) => s.key === fontScale)
  );

  const handleDecreaseFont = () => {
    if (currentFontScaleIndex > 0 && onChangeFontScale) {
      onChangeFontScale(FONT_SCALES[currentFontScaleIndex - 1].key);
    }
  };

  const handleIncreaseFont = () => {
    if (
      currentFontScaleIndex < FONT_SCALES.length - 1 &&
      onChangeFontScale
    ) {
      onChangeFontScale(FONT_SCALES[currentFontScaleIndex + 1].key);
    }
  };

  const handleResetFont = () => {
    if (onChangeFontScale) {
      onChangeFontScale("base");
    }
  };

  // Local Bookmark Toggle
  const isCurrentBookmarked = savedArticles.some(
    (item) => item.slug === post?.slug
  );

  const handleToggleBookmark = () => {
    if (!post?.slug) return;
    let updated = [];
    if (isCurrentBookmarked) {
      updated = savedArticles.filter((item) => item.slug !== post.slug);
    } else {
      const categoryObj = Array.isArray(post.categories)
        ? post.categories[0]
        : post.categories || post.category;
      const newEntry = {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || "",
        categoryTitle: categoryObj?.title || "প্রবন্ধ",
        authorName: post.author?.name || "ইসলামের কন্ঠ",
        savedAt: new Date().toISOString(),
      };
      updated = [newEntry, ...savedArticles];
    }
    setSavedArticles(updated);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(
          SAVED_ARTICLES_STORAGE_KEY,
          JSON.stringify(updated)
        );
      } catch {
        // Ignore storage errors
      }
    }
  };

  const handleRemoveSavedArticle = (slugToRemove) => {
    const updated = savedArticles.filter((item) => item.slug !== slugToRemove);
    setSavedArticles(updated);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(
          SAVED_ARTICLES_STORAGE_KEY,
          JSON.stringify(updated)
        );
      } catch {
        // Ignore storage errors
      }
    }
  };

  // Copy Scholarly Citation
  const handleCopyCitation = async () => {
    if (!post || typeof window === "undefined") return;
    const authorName = post.author?.name || "ইসলামের কন্ঠ সম্পাদনা পরিষদ";
    const url = window.location.href;
    const citationText = `“${post.title}” — ${authorName}, ইসলামের কন্ঠ। সূত্র: ${url}`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(citationText);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = citationText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCitationCopied(true);
      setTimeout(() => setCitationCopied(false), 2600);
    } catch {
      // Fallback
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const activeSegment = ttsSegments[currentSegmentIndex] || ttsSegments[0];
  const totalSegments = ttsSegments.length;
  const segmentProgressPercent =
    totalSegments > 0
      ? Math.round(((currentSegmentIndex + 1) / totalSegments) * 100)
      : 0;

  return (
    <div className="my-6 rounded-xl border border-[#E2D9C8] bg-white shadow-sm overflow-hidden print:hidden">
      {/* Primary Row: Read Out Loud Player & Reading Comfort Controls */}
      <div className="p-4 md:px-5 md:py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gradient-to-r from-[#044f4f]/[0.05] via-[#FAF8F5] to-[#D1BB9E]/[0.12]">
        {/* Left: Read Out Loud (Text-to-Speech) Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {speechSupported ? (
            <>
              <button
                type="button"
                onClick={handlePlayPause}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all cursor-pointer shadow-sm ${
                  ttsStatus === "playing"
                    ? "bg-[#D1BB9E] text-[#044f4f] hover:bg-[#c5ab89]"
                    : "bg-[#044f4f] text-white hover:bg-[#033b3b]"
                }`}
              >
                {ttsStatus === "playing" ? (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>পাঠ বিরতি</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      {ttsStatus === "paused"
                        ? "পাঠ চালিয়ে যান"
                        : "প্রবন্ধটি শুনুন"}
                    </span>
                  </>
                )}
              </button>

              {ttsStatus !== "idle" && (
                <div className="inline-flex items-center gap-1 bg-white border border-[#E2D9C8] rounded-lg p-1">
                  <button
                    type="button"
                    onClick={handlePrevSegment}
                    disabled={currentSegmentIndex <= 0}
                    title="পূর্ববর্তী অনুচ্ছেদ"
                    aria-label="পূর্ববর্তী অনুচ্ছেদ"
                    className="p-1.5 rounded hover:bg-slate-100 text-slate-700 disabled:opacity-40 cursor-pointer"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={handleStop}
                    title="পাঠ বন্ধ করুন"
                    aria-label="পাঠ বন্ধ করুন"
                    className="p-1.5 rounded hover:bg-red-50 text-red-600 cursor-pointer"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <rect x="5" y="5" width="10" height="10" rx="1.5" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextSegment}
                    disabled={currentSegmentIndex >= totalSegments - 1}
                    title="পরবর্তী অনুচ্ছেদ"
                    aria-label="পরবর্তী অনুচ্ছেদ"
                    className="p-1.5 rounded hover:bg-slate-100 text-slate-700 disabled:opacity-40 cursor-pointer"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              )}

              {/* Playback Speed Selector */}
              <div
                className="inline-flex items-center bg-white border border-[#E2D9C8] rounded-lg p-0.5"
                aria-label="পাঠের গতি"
              >
                <span className="text-[11px] font-medium text-slate-500 px-2">
                  গতি:
                </span>
                {PLAYBACK_SPEEDS.map((spd) => (
                  <button
                    key={spd.value}
                    type="button"
                    onClick={() => handleChangeSpeed(spd.value)}
                    className={`px-2 py-1 text-[11px] font-bold rounded-md transition-colors cursor-pointer ${
                      playbackRate === spd.value
                        ? "bg-[#044f4f] text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {spd.label}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <span className="text-xs text-slate-500">
              আপনার ব্রাউজারে অডিও পাঠ সুবিধা সমর্থিত নয়
            </span>
          )}
        </div>

        {/* Right: Font Size & Editorial Actions (Bookmark, Citation, Print) */}
        <div className="flex flex-wrap items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#E2D9C8]/70">
          {/* Font Size Controls (A- / A+) */}
          <div className="inline-flex items-center bg-white border border-[#E2D9C8] rounded-lg p-0.5">
            <button
              type="button"
              onClick={handleDecreaseFont}
              disabled={currentFontScaleIndex === 0}
              title="অক্ষরের আকার ছোট করুন"
              aria-label="অক্ষরের আকার ছোট করুন"
              className="px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 rounded cursor-pointer"
            >
              অ-
            </button>
            <button
              type="button"
              onClick={handleResetFont}
              title="স্বাভাবিক আকারে ফিরুন"
              className="px-2 py-1 text-[11px] font-semibold text-[#044f4f] border-x border-[#E2D9C8]/60 hover:bg-slate-50 cursor-pointer"
            >
              {FONT_SCALES[currentFontScaleIndex]?.label || "স্বাভাবিক"}
            </button>
            <button
              type="button"
              onClick={handleIncreaseFont}
              disabled={currentFontScaleIndex === FONT_SCALES.length - 1}
              title="অক্ষরের আকার বড় করুন"
              aria-label="অক্ষরের আকার বড় করুন"
              className="px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 rounded cursor-pointer"
            >
              অ+
            </button>
          </div>

          {/* Bookmark Current Article */}
          <button
            type="button"
            onClick={handleToggleBookmark}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              isCurrentBookmarked
                ? "bg-[#044f4f] text-white border-[#044f4f]"
                : "bg-white text-slate-800 border-[#E2D9C8] hover:border-[#044f4f]"
            }`}
          >
            <svg
              className="w-3.5 h-3.5"
              fill={isCurrentBookmarked ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <span>{isCurrentBookmarked ? "সংরক্ষিত" : "সংরক্ষণ"}</span>
          </button>

          {/* Saved Reading List Toggle */}
          {savedArticles.length > 0 && (
            <button
              type="button"
              onClick={() => setShowSavedDrawer((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#FAF8F5] text-[#044f4f] border border-[#D1BB9E] hover:bg-[#D1BB9E]/25 transition-colors cursor-pointer"
            >
              <span>পাঠতালিকা ({toBengaliNumber(savedArticles.length)})</span>
            </button>
          )}

          {/* Copy Citation */}
          <button
            type="button"
            onClick={handleCopyCitation}
            title="প্রবন্ধের উদ্ধৃতি কপি করুন"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              citationCopied
                ? "bg-emerald-700 text-white border-emerald-700"
                : "bg-white text-slate-800 border-[#E2D9C8] hover:border-[#044f4f]"
            }`}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span>{citationCopied ? "উদ্ধৃতি কপি হয়েছে!" : "উদ্ধৃতি কপি"}</span>
          </button>

          {/* Print Article */}
          <button
            type="button"
            onClick={handlePrint}
            title="প্রবন্ধটি প্রিন্ট করুন"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-800 border border-[#E2D9C8] hover:border-[#044f4f] transition-colors cursor-pointer"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            <span className="hidden sm:inline">প্রিন্ট</span>
          </button>
        </div>
      </div>

      {/* Live Read Out Loud Progress & Paragraph Tracker Bar */}
      {(ttsStatus !== "idle" || activeBlockKey) && totalSegments > 0 && (
        <div className="px-4 md:px-5 py-3 bg-[#044f4f] text-white border-t border-[#044f4f]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-[#D1BB9E]">
                {ttsStatus === "paused"
                  ? "পাঠ বিরতিতে আছে:"
                  : "এখন পাঠ করা হচ্ছে:"}
              </span>
              <span className="font-medium text-white truncate max-w-md">
                {activeSegment?.label || "অনুচ্ছেদ"}
              </span>
            </div>
            <div className="text-[11px] text-[#D1BB9E] font-semibold">
              অংশ {toBengaliNumber(currentSegmentIndex + 1)} /{" "}
              {toBengaliNumber(totalSegments)} (
              {toBengaliNumber(segmentProgressPercent)}%)
            </div>
          </div>

          {/* Segment Progress Bar */}
          <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D1BB9E] transition-all duration-300"
              style={{ width: `${segmentProgressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Saved Reading List Drawer */}
      {showSavedDrawer && (
        <div className="p-4 md:px-5 bg-[#FAF8F5] border-t border-[#E2D9C8]">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-[#044f4f] uppercase tracking-wider">
              আপনার সংরক্ষিত পাঠতালিকা ({toBengaliNumber(savedArticles.length)}
              )
            </h4>
            <button
              type="button"
              onClick={() => setShowSavedDrawer(false)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              বন্ধ করুন ✕
            </button>
          </div>

          {savedArticles.length === 0 ? (
            <p className="text-xs text-slate-600">
              কোনো প্রবন্ধ সংরক্ষিত নেই।
            </p>
          ) : (
            <ul className="divide-y divide-[#E2D9C8]/70 max-h-60 overflow-y-auto">
              {savedArticles.map((item) => (
                <li
                  key={item.slug}
                  className="py-2.5 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/article/${item.slug}`}
                      onClick={() => setShowSavedDrawer(false)}
                      className="text-xs md:text-sm font-bold text-slate-900 hover:text-[#044f4f] block truncate"
                    >
                      {item.title}
                    </Link>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {item.categoryTitle} · {item.authorName}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveSavedArticle(item.slug)}
                    title="তালিকা থেকে সরান"
                    className="text-xs text-red-600 hover:underline shrink-0 cursor-pointer"
                  >
                    সরান
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

ArticleReadingToolbar.propTypes = {
  post: PropTypes.object,
  ttsSegments: PropTypes.array,
  fontScale: PropTypes.string,
  onChangeFontScale: PropTypes.func,
  activeBlockKey: PropTypes.string,
  onActiveBlockChange: PropTypes.func,
  requestedPlayRequest: PropTypes.object,
};
