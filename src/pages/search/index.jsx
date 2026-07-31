import { useState, useEffect } from "react";
import useSWR from "swr";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import ArchivePostCard from "../../components/card/ArchivePostCard";
import BlockPageHeader from "../../components/Block/BlockPageHeader";
import { BiSearch } from "react-icons/bi";

const fetcher = (url) => fetch(url).then((res) => res.json());

const POPULAR_TAGS = [
  { name: "তাফসীর", term: "তাফসীর" },
  { name: "হাদীস", term: "হাদীস" },
  { name: "ঈমান", term: "ঈমান" },
  { name: "সীরাত", term: "সীরাত" },
  { name: "পারিবারিক জীবন", term: "পারিবারিক জীবন" },
];

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data, error, isLoading } = useSWR(
    debouncedTerm ? `/api/search?q=${encodeURIComponent(debouncedTerm)}` : null,
    fetcher
  );

  const handleTagClick = (term) => {
    setSearchTerm(term);
    setDebouncedTerm(term);
  };

  return (
    <Layout>
      <SEO
        title="অনুসন্ধান"
        description="ইসলামের কন্ঠ ওয়েবসাইটে আপনার পছন্দের প্রবন্ধ ও জিজ্ঞাসা অনুসন্ধান করুন।"
        canonicalUrl="/search"
      />

      <BlockPageHeader 
        title="আর্কাইভ অনুসন্ধান" 
        subtitle="ইসলামের কন্ঠের প্রকাশিত প্রবন্ধ, সীরাত, তাফসীর ও জিজ্ঞাসা থেকে খুঁজুন"
      />

      <section className="w-full py-10 md:py-14 bg-white min-h-[50vh]">
        <div className="container">
          
          {/* Search Box Container */}
          <div className="max-w-lg mx-auto mb-12">
            <div className="relative flex items-center bg-white border border-gray-300 rounded shadow-sm hover:border-primary focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all duration-200">
              <input
                type="text"
                placeholder="লেখার শিরোনাম বা বিষয়বস্তু..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                   if (e.key === 'Enter') setDebouncedTerm(searchTerm);
                }}
                className="w-full bg-transparent border-none pl-4 pr-3 py-3 text-base focus:outline-none focus:ring-0 text-gray-800 placeholder-gray-400"
              />
              <button 
                onClick={() => setDebouncedTerm(searchTerm)}
                className="h-full px-5 py-3.5 bg-primary hover:bg-[#033a3a] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <BiSearch size={22} />
              </button>
            </div>

            {/* Popular Tags */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center items-center">
              <span className="text-xs text-gray-400 font-semibold mr-1">জনপ্রিয় অনুসন্ধান:</span>
              {POPULAR_TAGS.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTagClick(tag.term)}
                  className="text-xs px-2.5 py-1 bg-slate-50 hover:bg-secondary/10 border border-slate-200 hover:border-secondary hover:text-primary rounded text-gray-600 transition-all cursor-pointer font-medium"
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          {/* Results Section */}
          <div className="mt-8">
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-slate-200 border-t-primary rounded-full animate-spin"></div>
              </div>
            )}

            {error && (
              <div className="text-center bg-red-50/50 text-red-600 py-6 rounded border border-red-100 max-w-lg mx-auto">
                <p className="text-sm font-medium">অনুসন্ধান করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।</p>
              </div>
            )}

            {!isLoading && !error && data?.data && (
              <div className="animate-in fade-in duration-300">
                <div className="flex items-center justify-between mb-8 border-b border-gray-150 pb-3">
                  <h2 className="text-base font-bold text-gray-800 tracking-wide uppercase border-l-2 border-primary pl-2.5">
                    অনুসন্ধান ফলাফল
                  </h2>
                  <span className="bg-secondary/15 text-primary text-xs font-bold px-2.5 py-1 rounded">
                    {data.data.length} টি লেখা পাওয়া গেছে
                  </span>
                </div>
                
                {data.data.length > 0 ? (
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mb-12">
                    {data.data.map((post) => (
                      <ArchivePostCard key={post.slug} article={post} />
                    ))}
                  </div>
                ) : (
                   <div className="text-center py-16 bg-slate-50/50 rounded-lg border border-dashed border-slate-200 max-w-2xl mx-auto">
                      <p className="text-gray-500 text-sm font-medium">
                        কোনো লেখা পাওয়া যায়নি। অন্য কিছু লিখে খুঁজুন।
                      </p>
                   </div>
                )}
              </div>
            )}

            {!searchTerm && !debouncedTerm && !data && !isLoading && (
              <div className="text-center py-16 border-t border-slate-100">
                 <p className="text-gray-400 text-sm">
                    উপরে আপনার কাঙ্খিত বিষয় লিখে অনুসন্ধান শুরু করুন।
                 </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
