import { Box, Typography } from "@mui/material";
import React, { memo } from "react";

const HijriCalender = () => {
  return (
    <>
      <Box
        sx={{
          marginTop: 4,
          width: "100%",
        }}
      >
        <Box
          sx={{
            color: "#055547",
            marginBottom: "10px",
          }}
        >
          <Typography
            sx={{
              color: "#055547",
              fontSize: "18px",
              lineHeight: "28px",
              fontWeight: 700,
            }}
          >
            হিজরি ক্যালেন্ডার
          </Typography>
        </Box>

        <Box
          component="iframe"
          style={{
            width: "100%",
            height: "328px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            overflow: "hidden",
          }}
          scrolling="no"
          src="https://www.islamicfinder.org/islamic-calendar/widgetGregorian?type=Hijri"
        />
      </Box>
    </>
  );
};

export default memo(HijriCalender);
