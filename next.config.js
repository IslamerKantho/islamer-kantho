const nextPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = nextPWA({
  images: {
    domains: ["cdn.sanity.io", "images.unsplash.com"],
  },
  compiler: {
    emotion: true,
  },
  experimental: {
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["latin"] } },
    ],
  },
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    register: true,
    skipWaiting: true,
    runtimeCaching,
  },
});
