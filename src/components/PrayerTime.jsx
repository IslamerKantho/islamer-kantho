import React, { memo } from "react";

const PrayerTime = () => {
  return (
    <div className="mt-1 w-full">
      <div className="text-[#055547] mb-2.5">
        <h3 className="text-[#055547] text-lg font-bold">
          নামাজের সময়সূচি
        </h3>
      </div>

      <iframe
        className="w-full h-[328px] border border-primary rounded-lg overflow-hidden"
        scrolling="no"
        src="https://www.islamicfinder.org/prayer-widget/1185099/shafi/5/0/18/18"
        title="Prayer Times"
      />
    </div>
  );
};

export default memo(PrayerTime);
