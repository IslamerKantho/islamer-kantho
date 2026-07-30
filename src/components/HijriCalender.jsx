import React, { memo } from "react";

const HijriCalender = () => {
  return (
    <div className="mt-8 w-full">
      <div className="text-[#055547] mb-2.5">
        <h3 className="text-[#055547] text-lg font-bold">
          হিজরি ক্যালেন্ডার
        </h3>
      </div>

      <iframe
        className="w-full h-[328px] border border-primary rounded-lg overflow-hidden"
        src="https://www.islamicfinder.org/islamic-calendar/widgetGregorian?type=Hijri"
        title="Hijri Calendar"
      />
    </div>
  );
};

export default memo(HijriCalender);
