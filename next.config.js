module.exports = {
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
};
