import markdownStyles from "../../styles/markdownStyles.module.css";
import BlockContent from "@sanity/block-content-to-react";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const serializers = {
  marks: {
    left: ({ children }) => <span className="block text-left w-full">{children}</span>,
    center: ({ children }) => <span className="block text-center w-full">{children}</span>,
    right: ({ children }) => <span className="block text-right w-full">{children}</span>,
    justify: ({ children }) => <span className="block text-justify w-full">{children}</span>,
  },
  types: {
    quranVerse: ( { node } ) => (
      <div className="hadith my-10 relative px-4 md:px-0">
        { node.arabicText && (
          <p
            className="text-right text-xl leading-[2.2]! mb-3 font-bold!"
            lang="ar"
            dir="rtl"
          >
            { node.arabicText }
          </p>
        ) }
        { node.translation && (
          <p className="mb-0! text-[15px]! leading-relaxed font-bold! italic">
            "{ node.translation }"
          </p>
        ) }
        { node.source && (
          <p className="text-xs! font-semibold opacity-80 mt-3">
            — { node.source }
          </p>
        ) }
      </div>
    ),
    callout: ( { node } ) => {
      const typeStyles = {
        info: "bg-blue-50/90 dark:bg-blue-950/40 border-blue-600 text-blue-950 dark:text-blue-100",
        warning: "bg-amber-50/90 dark:bg-amber-950/40 border-amber-600 text-amber-950 dark:text-amber-100",
        tip: "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-600 text-emerald-950 dark:text-emerald-100",
        note: "bg-slate-50 dark:bg-slate-800/60 border-slate-500 text-slate-900 dark:text-slate-100",
      };
      return (
        <div className={ `my-6 p-5 md:p-6 rounded-xl border-l-4 shadow-sm ${typeStyles[node.type] || typeStyles.info}` }>
          { node.title && <h4 className="font-bold text-lg mb-2">{ node.title }</h4> }
          <p className="text-sm md:text-base leading-relaxed">{ node.content }</p>
        </div>
      );
    },
    youtube: ( { node } ) => {
      if ( !node?.url ) return null;
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-lg border border-gray-200 dark:border-gray-800">
            <div className="absolute inset-0 w-full h-full">
              <ReactPlayer
                url={node.url}
                width="100%"
                height="100%"
                controls={true}
                light={true} // Lazy load and show thumbnail first
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          { node.caption && <figcaption className="text-center text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2.5 font-medium">{ node.caption }</figcaption> }
        </figure>
      );
    },
    audioBlock: ( { node } ) => (
      <div className="my-8 p-5 md:p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/40 dark:from-slate-800 dark:to-emerald-950/30 border border-slate-200 dark:border-slate-700 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-base md:text-lg text-slate-900 dark:text-slate-100">{ node.title || "Audio Player" }</h4>
          { node.reciter && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/80 dark:text-emerald-200">
              Reciter: { node.reciter }
            </span>
          ) }
        </div>
        { node.url && <audio controls className="w-full mt-2 rounded-lg" src={ node.url } /> }
      </div>
    ),
    ctaButton: ( { node } ) => (
      <div className="my-8 text-center">
        <a
          href={ node.url }
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
        >
          { node.text }
        </a>
      </div>
    ),
  },
};

export default function SingleArticleContent({ content }) {
  const style = {
    content: {
      marginBottom: 80,
    },
  };
  return (
    <>
      <BlockContent
        className={markdownStyles.markdown}
        style={style.content}
        blocks={content}
        serializers={ serializers }
        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
      />
    </>
  );
}
