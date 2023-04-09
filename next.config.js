const runtimeCaching = require("next-pwa/cache");
const nextPWA = require("next-pwa")({
  disable: process.env.NODE_ENV === "development",
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
});

module.exports = nextPWA({
  reactStrictMode: false,
  images: {
    domains: ["cdn.sanity.io", "images.unsplash.com"],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 604800,
  },
  compiler: {
    emotion: true,
  },
});
