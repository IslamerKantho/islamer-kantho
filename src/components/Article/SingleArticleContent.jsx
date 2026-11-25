import { useMemo } from "react";
import PropTypes from "prop-types";
import markdownStyles from "../../styles/markdownStyles.module.css";
import BlockContent from "@sanity/block-content-to-react";
import dynamic from "next/dynamic";
import { sanityConfig } from "../../lib/sanity";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

// Prevent React 18.3+ function component defaultProps deprecation warning from @sanity/block-content-to-react
if (BlockContent && BlockContent.defaultProps) {
  delete BlockContent.defaultProps;
}

const SCALE_CLASS_MAP = {
  sm: markdownStyles.scaleSm,
  base: markdownStyles.scaleBase,
  lg: markdownStyles.scaleLg,
  xl: markdownStyles.scaleXl,
};

export default function SingleArticleContent({
  content,
  fontScale = "base",
  activeBlockKey = null,
  isReadingMode = false,
}) {
  // Ensure every block has a deterministic _key matching buildArticleReadingData
  const normalizedBlocks = useMemo(() => {
    if (!Array.isArray(content)) return [];
    return content.map((block, idx) => ({
      ...block,
      _key: block?._key || `block-${idx}`,
    }));
  }, [content]);

  const serializers = useMemo(
    () => ({
      marks: {
        left: ({ children }) => (
          <span className="block text-left w-full">{children}</span>
        ),
        center: ({ children }) => (
          <span className="block text-center w-full">{children}</span>
        ),
        right: ({ children }) => (
          <span className="block text-right w-full">{children}</span>
        ),
        justify: ({ children }) => (
          <span className="block text-justify w-full">{children}</span>
        ),
      },
      types: {
        block: (props) => {
          const { node, children } = props;
          const style = node?.style || "normal";
          const blockKey = node?._key;
          const anchorId = blockKey ? `article-block-${blockKey}` : undefined;
          const isActive = Boolean(blockKey && activeBlockKey === blockKey);

          const activeHighlightClass = isActive
            ? "bg-[#D1BB9E]/25 ring-1 ring-[#044f4f]/30 rounded-lg px-3 py-2 transition-all duration-300"
            : "transition-colors duration-200";

          if (style === "h1") {
            return (
              <h1 id={anchorId} className={`scroll-mt-24 ${activeHighlightClass}`}>
                {children}
              </h1>
            );
          }
          if (style === "h2") {
            return (
              <h2 id={anchorId} className={`scroll-mt-24 ${activeHighlightClass}`}>
                {children}
              </h2>
            );
          }
          if (style === "h3") {
            return (
              <h3 id={anchorId} className={`scroll-mt-24 ${activeHighlightClass}`}>
                {children}
              </h3>
            );
          }
          if (style === "h4") {
            return (
              <h4 id={anchorId} className={`scroll-mt-24 ${activeHighlightClass}`}>
                {children}
              </h4>
            );
          }
          if (style === "blockquote") {
            return (
              <blockquote
                id={anchorId}
                className={`scroll-mt-24 ${activeHighlightClass}`}
              >
                {children}
              </blockquote>
            );
          }

          return (
            <p id={anchorId} className={`scroll-mt-24 ${activeHighlightClass}`}>
              {children}
            </p>
          );
        },
        quranVerse: ({ node }) => {
          const blockKey = node?._key;
          const anchorId = blockKey ? `article-block-${blockKey}` : undefined;
          const isActive = Boolean(blockKey && activeBlockKey === blockKey);

          return (
            <div
              id={anchorId}
              className={`hadith my-10 relative px-4 md:px-0 scroll-mt-24 transition-all duration-300 ${
                isReadingMode ? "max-w-[580px] mx-auto" : ""
              } ${isActive ? "ring-2 ring-[#044f4f] rounded-xl" : ""}`}
            >
              {node.arabicText && (
                <p
                  className="text-right text-xl leading-[2.2]! mb-3 font-bold!"
                  lang="ar"
                  dir="rtl"
                >
                  {node.arabicText}
                </p>
              )}
              {node.translation && (
                <p className="mb-0! text-[15px]! leading-relaxed font-bold! italic">
                  &ldquo;{node.translation}&rdquo;
                </p>
              )}
              {node.source && (
                <p className="text-xs! font-semibold opacity-80 mt-3">
                  — {node.source}
                </p>
              )}
            </div>
          );
        },
        callout: ({ node }) => {
          const blockKey = node?._key;
          const anchorId = blockKey ? `article-block-${blockKey}` : undefined;
          const isActive = Boolean(blockKey && activeBlockKey === blockKey);

          const typeStyles = {
            info: "bg-blue-50/90 border-blue-200 text-blue-950",
            warning: "bg-amber-50/90 border-amber-200 text-amber-950",
            tip: "bg-emerald-50/90 border-emerald-200 text-emerald-950",
            note: "bg-slate-50 border-slate-200 text-slate-900",
          };
          return (
            <div
              id={anchorId}
              className={`my-6 p-5 md:p-6 rounded-xl border shadow-sm scroll-mt-24 transition-all duration-300 ${
                isReadingMode ? "max-w-[580px] mx-auto" : ""
              } ${typeStyles[node.type] || typeStyles.info} ${
                isActive ? "ring-2 ring-[#044f4f]" : ""
              }`}
            >
              {node.title && (
                <h4 className="font-bold text-lg mb-2">{node.title}</h4>
              )}
              <p className="text-sm md:text-base leading-relaxed">
                {node.content}
              </p>
            </div>
          );
        },
        youtube: ({ node }) => {
          if (!node?.url) return null;
          return (
            <figure className={`my-8 ${isReadingMode ? "max-w-[580px] mx-auto" : ""}`}>
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-lg border border-gray-200">
                <div className="absolute inset-0 w-full h-full">
                  <ReactPlayer
                    url={node.url}
                    width="100%"
                    height="100%"
                    controls={true}
                    light={true}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {node.caption && (
                <figcaption className="text-center text-xs md:text-sm text-gray-500 mt-2.5 font-medium">
                  {node.caption}
                </figcaption>
              )}
            </figure>
          );
        },
        audioBlock: ({ node }) => (
          <div
            className={`my-8 p-5 md:p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/40 border border-slate-200 shadow-md ${
              isReadingMode ? "max-w-[580px] mx-auto" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-base md:text-lg text-slate-900">
                {node.title || "Audio Player"}
              </h4>
              {node.reciter && (
                <span className="text-xs font-semibold text-emerald-800">
                  কারী: {node.reciter}
                </span>
              )}
            </div>
            {node.url && (
              <audio controls className="w-full mt-2 rounded-lg" src={node.url} />
            )}
          </div>
        ),
        ctaButton: ({ node }) => (
          <div className="my-8 text-center">
            <a
              href={node.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              {node.text}
            </a>
          </div>
        ),
      },
    }),
    [activeBlockKey, isReadingMode]
  );

  const style = {
    content: {
      marginBottom: 24,
    },
  };

  const scaleClass = SCALE_CLASS_MAP[fontScale] || SCALE_CLASS_MAP.base;
  const readingModeClass = isReadingMode ? markdownStyles.readingMode : "";

  return (
    <BlockContent
      className={`${markdownStyles.markdown} ${scaleClass} ${readingModeClass}`}
      style={style.content}
      blocks={normalizedBlocks}
      serializers={serializers}
      projectId={sanityConfig.projectId}
      dataset={sanityConfig.dataset}
      ignoreUnknownTypes={true}
      renderContainerOnSingleChild={false}
      imageOptions={{}}
    />
  );
}

SingleArticleContent.propTypes = {
  content: PropTypes.array,
  fontScale: PropTypes.string,
  activeBlockKey: PropTypes.string,
  isReadingMode: PropTypes.bool,
};

