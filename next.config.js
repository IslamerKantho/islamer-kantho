const runtimeCaching = require("next-pwa/cache");
const nextPWA = require("next-pwa")({
  disable: process.env.NODE_ENV === "development",
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
});

module.exports = nextPWA({
  images: {
    domains: ["cdn.sanity.io", "images.unsplash.com"],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 604800,
  },
  compiler: {
    emotion: true,
  },
  reactStrictMode: false,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // {
          //   key: 'Strict-Transport-Security',
          //   value: 'max-age=31536000; includeSubDomains; preload',
          // },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'same-origin',
          },
        ],
      },
    ]
  },
});
