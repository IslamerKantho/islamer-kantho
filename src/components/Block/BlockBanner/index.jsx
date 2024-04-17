import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

const BlockBanner = ({ className }) => {
  return (
    <>
      <Box
        className={className}
        sx={{
          paddingTop: "80px",
          paddingBottom: "80px",
          // background: "#055547",
        }}
      >
        <Container maxWidth={"md"}>
          <Typography
            variant="h2"
            component="blockquote"
            sx={{
              textAlign: "center",
              marginBottom: 2,
              fontSize: "18px",
              lineHeight: "170%",
              fontWeight: 600,
            }}
          >
            کُلُّ نَفۡسٍ ذَآئِقَۃُ الۡمَوۡتِ - وَاِنَّمَا تُوَفَّوۡنَ
            اُجُوۡرَکُمۡ یَوۡمَ الۡقِیٰمَۃِ - فَمَنۡ زُحۡزِحَ عَنِ النَّارِ
            وَاُدۡخِلَ الۡجَنَّۃَ فَقَدۡ فَازَ - وَمَا الۡحَیٰوۃُ الدُّنۡیَاۤ
            اِلَّا مَتَاعُ الۡغُرُوۡرِ.
          </Typography>

          <Typography
            variant="h2"
            component="blockquote"
            sx={{
              textAlign: "center",
              marginBottom: 2,
              fontSize: "18px",
              lineHeight: "170%",
              fontWeight: 600,
            }}
          >
            জীবমাত্রই মৃত্যুর স্বাদ গ্রহণ করবে। কেবলমাত্র কেয়ামতের দিনই
            তোমাদেরকে তোমাদেরকে কর্মফল পূর্ণ মাত্রায় দেয়া হবে। অতঃপর যাকে আগুন
            থেকে দূরে রাখা হবে এবং জান্নাতে প্রবেশ করানো হবে সেই সফলকাম। আর
            পার্থিব জীবন ছলনাময় ভোগ ছাড়া আর কিছু নয়।
          </Typography>

          <Typography
            variant="h2"
            component="blockquote"
            sx={{
              textAlign: "center",
              fontSize: "14px",
              lineHeight: "170%",
              fontWeight: 800,
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

export default BlockBanner;
