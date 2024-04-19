import { Box, Typography } from "@mui/material";
import React, { memo } from "react";

const PrayerTime = () => {
  return (
    <Box
      sx={{
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
          নামাজের সময়সূচি{" "}
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
        src="https://www.islamicfinder.org/prayer-widget/1185099/shafi/5/0/18/18"
      />
    </Box>
  );
};

export default memo(PrayerTime);
