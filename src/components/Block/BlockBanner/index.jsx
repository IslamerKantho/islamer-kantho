import { Box, Container, Typography } from "@mui/material";
import clsx from "clsx";
import Image from "next/image";
import { memo } from "react";

const BlockBanner = ({ className }) => {
  return (
    <>
      <Box
        className={clsx("py-28", className)}
        sx={{
          // padding: "100px 0",
          // background: "#055547",
        }}
      >
        <Container className="max-w-[1280px]" maxWidth={"md"}>
          <Typography
            className="text-center mb-1 text-lg font-[600]"
            variant="h2"
            component="blockquote"
          >
            کُلُّ نَفۡسٍ ذَآئِقَۃُ الۡمَوۡتِ - وَاِنَّمَا تُوَفَّوۡنَ
            اُجُوۡرَکُمۡ یَوۡمَ الۡقِیٰمَۃِ - فَمَنۡ زُحۡزِحَ عَنِ النَّارِ
            وَاُدۡخِلَ الۡجَنَّۃَ فَقَدۡ فَازَ - وَمَا الۡحَیٰوۃُ الدُّنۡیَاۤ
            اِلَّا مَتَاعُ الۡغُرُوۡرِ.
          </Typography>

          <Typography
            className="text-center mb-1 text-lg leading-8 font-[600] mt-4"
            variant="h2"
            component="blockquote"
          >
            জীবমাত্রই মৃত্যুর স্বাদ গ্রহণ করবে। কেবলমাত্র কেয়ামতের দিনই
            তোমাদেরকে তোমাদেরকে কর্মফল পূর্ণ মাত্রায় দেয়া হবে। অতঃপর যাকে আগুন
            থেকে দূরে রাখা হবে এবং জান্নাতে প্রবেশ করানো হবে সেই সফলকাম। আর
            পার্থিব জীবন ছলনাময় ভোগ ছাড়া আর কিছু নয়।
          </Typography>

          <Typography
            className="text-center mb-0.5 text-[14px] leading-[170%] font-[800] mt-4"
            variant="h2"
            component="blockquote"
            sx={{
              // textAlign: "center",
              // fontSize: "14px",
              // lineHeight: "170%",
              // fontWeight: 800,
              // textAlign: "right",
            }}
          >
            (সূরা আল-ইমরানের ১৮৫ নম্বর আয়াতে)
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default memo(BlockBanner);
