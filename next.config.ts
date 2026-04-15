import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
      },
    ],
    // Serve modern formats for smaller file sizes
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  // Enable gzip/brotli compression
  compress: true,
  // Optimize production builds
  reactStrictMode: true,
  // Cache static assets aggressively in production only.
  // In dev this breaks HMR and can cause client/server bundle drift.
  async headers() {
    if (process.env.NODE_ENV !== "production") {
      return [];
    }

    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
