import Head from "next/head";
import { memo } from "react";

const CONSTANT = {
  title: "ইসলামের কন্ঠ",
  brief:
    "ইসলামের কন্ঠ” এর মাধ্যমে জনসম্মুখে ‘আহলে সুন্নাত ওয়াল জামাআত এর আক্বীদাহ অনুযায়ী ইসলামের সঠিক চিত্র উপস্থাপন, সেই সাথে অপব্যাখ্যা ও ভ্রান্ত ধারনা নিরসনের লক্ষ্যে কাজ করা আমাদের একমাত্র উদ্দেশ্য।",
  primaryColor: "055547",
  url: "https://islamerkantho.com",
};

const Meta = () => {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`/img/branding/favicon.png`}
      />

      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`/img/branding/favicon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`/img/branding/favicon.png`}
      />

      <link rel="manifest" href="/site.webmanifest" />
      <link
        rel="mask-icon"
        href={`/img/branding/favicon.png`}
        color="#055547"
      />
      <link rel="shortcut icon" href={`/img/branding/favicon.png`} />

      <meta name="msapplication-TileColor" content={CONSTANT.primaryColor} />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />

      <meta name="theme-color" content={CONSTANT.primaryColor} />

      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />

      <meta name="title" content={CONSTANT.title} />
      <meta name="description" content={CONSTANT.brief} />
      <meta name="author" content={CONSTANT.url} />
      <meta name="copyright" content={CONSTANT.url} />
      <meta name="robots" content="index,follow" />

      {/* New */}
      <meta name="application-name" content={CONSTANT.title} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={CONSTANT.title} />

      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="msapplication-TileColor" content={CONSTANT.primaryColor} />
      <meta name="msapplication-tap-highlight" content="no" />

      <link rel="apple-touch-icon" href={`/img/branding/favicon.png`} />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href={`/img/branding/favicon.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`/img/branding/favicon.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="167x167"
        href={`/img/branding/favicon.png`}
      />

      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`/img/branding/favicon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`/img/branding/favicon.png`}
      />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="mask-icon"
        href={`/img/branding/favicon.png`}
        color={CONSTANT.primaryColor}
      />
      <link rel="shortcut icon" href={`/img/branding/favicon.png`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={CONSTANT.url} />
      <meta name="twitter:title" content={CONSTANT.title} />
      <meta name="twitter:description" content={CONSTANT.brief} />
      <meta name="twitter:image" content={`/img/branding/og_image.jpeg`} />
      <meta name="twitter:creator" content={"@islamer_kantho"} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={CONSTANT.title} />
      <meta property="og:description" content={CONSTANT.brief} />
      <meta property="og:site_name" content={CONSTANT.title} />
      <meta property="og:url" content={CONSTANT.url} />
      <meta property="og:image" content={`/img/branding/og_image.jpeg`} />

      {/* apple splash screen images */}
      {/* <link rel='apple-touch-startup-image' href='/images/apple_splash_2048.png' sizes='2048x2732' />
      <link rel='apple-touch-startup-image' href='/images/apple_splash_1668.png' sizes='1668x2224' />
      <link rel='apple-touch-startup-image' href='/images/apple_splash_1536.png' sizes='1536x2048' />
      <link rel='apple-touch-startup-image' href='/images/apple_splash_1125.png' sizes='1125x2436' />
      <link rel='apple-touch-startup-image' href='/images/apple_splash_1242.png' sizes='1242x2208' />
      <link rel='apple-touch-startup-image' href='/images/apple_splash_750.png' sizes='750x1334' />
      <link rel='apple-touch-startup-image' href='/images/apple_splash_640.png' sizes='640x1136' /> */}
    </Head>
  );
};

export default memo(Meta);
