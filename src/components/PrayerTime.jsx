import { Box, Typography } from "@mui/material";
import React, { memo } from "react";

const PrayerTime = () => {
  return (
    <Box className="mt-1 w-full" >
      <Box className="text-[#055547] mb-2.5" >
        <Typography className="text-[#055547] text-lg font-bold" >
          নামাজের সময়সূচি{" "}
        </Typography>
      </Box>

      <Box
          className="w-full h-[328px] border border-primary rounded-lg overflow-hidden"
        component="iframe"
        scrolling="no"
        src="https://www.islamicfinder.org/prayer-widget/1185099/shafi/5/0/18/18"
      />
    </Box>
  );
};

export default memo(PrayerTime);
