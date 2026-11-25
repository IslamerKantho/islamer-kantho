import { useState } from "react";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import { getAllGalleries, getSiteSettings } from "../api/api";

import dynamic from "next/dynamic";
const ReactPlayer = dynamic( () => import( "react-player" ), { ssr: false } );

export default function GalleryPage({ galleries, settings }) {
  const [lightboxData, setLightboxData] = useState(null);

  const openLightbox = (item) => {
    setLightboxData(item);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxData(null);
    document.body.style.overflow = "unset";
  };

  return (
    <Layout settings={settings}>
      <SEO
        title="গ্যালারি | ইসলামের কন্ঠ"
        description="ইসলামের কন্ঠ এর ছবি এবং ভিডিও গ্যালারি।"
        canonicalUrl="/gallery"
      />

      <div className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <header className="mb-10 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
              মিডিয়া গ্যালারি
            </h1>
            <p className="text-gray-600 text-lg">
              আমাদের সকল চিত্র এবং ভিডিও গ্যালারি সংগ্রহ।
            </p>
          </header>

          {(!galleries || galleries.length === 0) ? (
            <div className="py-16 text-center text-gray-500">
              কোনো গ্যালারি পাওয়া যায়নি।
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleries.map((item) => {
                const isVideo = item.mediaType === "video";
                let videoUrl = item.videoUrl;

                return (
                  <article
                    key={item._id}
                    className="relative aspect-video bg-black overflow-hidden rounded-xl shadow-md border border-gray-100 dark:border-gray-700 group"
                  >
                    { isVideo && videoUrl ? (
                      <div className="absolute inset-0 w-full h-full cursor-pointer" onClick={() => openLightbox(item)}>
                        <div className="pointer-events-none w-full h-full">
                          <ReactPlayer
                            url={ videoUrl }
                            width="100%"
                            height="100%"
                            light={ true } 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                           <div className="w-14 h-14 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-lg transition-transform group-hover:scale-110">
                             <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                               <path d="M4 4l12 6-12 6z" />
                             </svg>
                           </div>
                        </div>
                      </div>
                    ) : item.image ? (
                      <div className="absolute inset-0 w-full h-full cursor-pointer" onClick={() => openLightbox(item)}>
                        <img
                          src={item.image}
                          alt={item.title || "Gallery Image"}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="flex gap-3">
                            <span className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg backdrop-blur-sm transition-colors flex items-center gap-2 transform scale-95 group-hover:scale-100">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                              </svg>
                              দেখুন
                            </span>
                            <a
                              href={item.image}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg shadow-lg flex items-center gap-2 transition-colors transform scale-95 group-hover:scale-100"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                              </svg>
                              ডাউনলোড
                            </a>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-100 dark:bg-gray-800">
                        No Media Available
                      </div>
                    )}

                    <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full bg-emerald-600/90 text-white shadow-sm pointer-events-none">
                      {isVideo ? "ভিডিও" : "ছবি"}
                    </span>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxData && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8 animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-[110] transition-colors"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <div 
            className="relative w-full max-w-6xl max-h-[90vh] flex flex-col items-center justify-center animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxData.mediaType === "video" ? (
              <div className="w-full aspect-video rounded overflow-hidden shadow-2xl">
                <ReactPlayer
                  url={lightboxData.videoUrl}
                  width="100%"
                  height="100%"
                  controls={true}
                  playing={true}
                  config={{
                     youtube: { playerVars: { showinfo: 1 } },
                  }}
                />
              </div>
            ) : (
              <div className="relative flex justify-center w-full h-full max-h-[90vh]">
                <img
                  src={lightboxData.image}
                  alt={lightboxData.title || "Gallery Image"}
                  className="max-w-full max-h-[85vh] object-contain rounded shadow-2xl"
                />
              </div>
            )}
            
            {lightboxData.title && (
              <div className="mt-4 text-center">
                <h3 className="text-xl md:text-2xl text-white font-medium">{lightboxData.title}</h3>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const galleries = await getAllGalleries(preview);
  const settings = await getSiteSettings(preview);
  return {
    props: {
      galleries: galleries || [],
      settings: settings || null,
    },
    revalidate: 1,
  };
}
