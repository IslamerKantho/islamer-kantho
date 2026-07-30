import localFont from "next/font/local";

export const hnt = localFont({
  src: [
    {
      path: "../../public/fonts/HNT/HNT-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/HNT/HNT-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/HNT/HNT-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/HNT/HNT-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/HNT/HNT-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-hnt",
  display: "swap",
});
