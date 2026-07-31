import useSWR from "swr";
import { memo } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());

const SecondaryNavbar = () => {
  const { data, error, isLoading } = useSWR("/api/prayer-times", fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  return (
    <div className="bg-primary text-sm text-white w-full hidden md:block">
      <div className="container-lg mx-auto flex h-[40px] items-center justify-between w-full px-6 md:px-0">

        {/* Prayer Times */}
        <div className="flex items-center gap-4 font-medium">
          {isLoading ? (
            <span className="animate-pulse bg-gray-300 h-4 w-60 rounded"></span>
          ) : error ? (
            <span>নামাজের সময়সূচি লোড করা যাচ্ছে না</span>
          ) : data?.prayers ? (
            <>
                  <span className="text-xs text-gray-   500 mr-2 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {data.location?.city}
              </span>
              <span><strong>ফজর:</strong> {data.prayers.Fajr}</span>
              <span><strong>যোহর:</strong> {data.prayers.Dhuhr}</span>
              <span><strong>আসর:</strong> {data.prayers.Asr}</span>
              <span><strong>মাগরিব:</strong> {data.prayers.Maghrib}</span>
              <span><strong>ইশা:</strong> {data.prayers.Isha}</span>
            </>
          ) : null}
        </div>

        {/* Hijri Date */}
        <div className="font-semibold flex items-center">
          {isLoading ? (
            <span className="animate-pulse bg-gray-300 h-4 w-40 rounded"></span>
          ) : error ? (
            <span>তারিখ লোড করা যাচ্ছে না</span>
          ) : data?.hijri ? (
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {data.hijri.day} {data.hijri.monthEn} {data.hijri.year} {data.hijri.designation}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default memo(SecondaryNavbar);
