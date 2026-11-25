import localFont from "next/font/local";
import { Amiri, Scheherazade_New } from "next/font/google";

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

export const amiri = Amiri({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["arabic", "latin"],
  variable: "--font-amiri",
  display: "swap",
  preload: false,
});

export const scheherazade = Scheherazade_New({
  weight: ["400", "600", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-scheherazade",
  display: "swap",
  preload: false,
});

export const fontVariables = `${hnt.variable} ${amiri.variable} ${scheherazade.variable}`;

