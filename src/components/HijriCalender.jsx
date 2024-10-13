import { Box, Typography } from "@mui/material";
import React, { memo } from "react";

const HijriCalender = () => {
  return (
    <>
      <Box className="mt-8 w-full" >
        <Box className="text-[#055547] mb-2.5" >
          <Typography className="text-[#055547] text-lg font-bold" >
            হিজরি ক্যালেন্ডার
          </Typography>
        </Box>

        <Box
          className="w-full h-[328px] border border-primary rounded-lg overflow-hidden"
          component="iframe"
          src="https://www.islamicfinder.org/islamic-calendar/widgetGregorian?type=Hijri"
        />
      </Box>
    </>
  );
};

export default memo(HijriCalender);
