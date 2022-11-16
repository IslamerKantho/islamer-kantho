const pwa = require("next-pwa")({
  dest: "public",
});

module.exports = pwa({
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
});
