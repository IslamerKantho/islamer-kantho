import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import { getAllGalleries } from "../api/api";

import dynamic from "next/dynamic";
const ReactPlayer = dynamic( () => import( "react-player" ), { ssr: false } );

export default function GalleryPage({ galleries }) {
  return (
    <Layout>
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
                      <div className="absolute inset-0 w-full h-full">
                        <ReactPlayer
                          url={ videoUrl }
                          width="100%"
                          height="100%"
                          controls={ true }
                          light={ true } // Lazy load and show thumbnail first
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : item.image ? (
                      <>
                        <img
                          src={item.image}
                          alt={item.title || "Gallery Image"}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <a
                            href={item.image}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pointer-events-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg shadow-lg flex items-center gap-2 transition-transform transform scale-95 group-hover:scale-100"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                            </svg>
                            ডাউনলোড
                          </a>
                        </div>
                      </>
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
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const galleries = await getAllGalleries(preview);
  return {
    props: {
      galleries: galleries || [],
    },
    revalidate: 1,
  };
}
