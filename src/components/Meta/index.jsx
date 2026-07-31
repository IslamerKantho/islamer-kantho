import Head from "next/head";
import { memo } from "react";

const CONSTANT = {
  title: "ইসলামের কন্ঠ",
  brief:
    "“ইসলামের কন্ঠ” এর মাধ্যমে জনসম্মুখে ‘আহলে সুন্নাত ওয়াল জামাআত’ এর আক্বীদাহ অনুযায়ী ইসলামের সঠিক চিত্র উপস্থাপন, সেই সাথে অপব্যাখ্যা ও ভ্রান্ত ধারনা নিরসনের লক্ষ্যে কাজ করা আমাদের একমাত্র উদ্দেশ্য।",
  primaryColor: "#055547",
  url: "https://islamerkantho.org",
};

const Meta = () => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Favicons & Manifest */}
      <link rel="icon" href="/img/branding/favicon.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/img/branding/favicon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/img/branding/favicon.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/img/branding/favicon.png" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/img/branding/favicon.png" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />

      {/* App & Theme Colors */}
      <meta name="theme-color" content={CONSTANT.primaryColor} />
      <meta name="msapplication-TileColor" content={CONSTANT.primaryColor} />
      <meta name="application-name" content={CONSTANT.title} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={CONSTANT.title} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
    </Head>
  );
};

export default memo(Meta);
