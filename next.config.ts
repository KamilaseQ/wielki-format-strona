import type { NextConfig } from "next";

const canonicalUrl = "https://wielkiformat.pl";
const canonicalPath = (path: string) => `${canonicalUrl}${path}`;

const legacyRedirects = [
  { source: "/reklamy-outdoorowe", destination: canonicalPath("/wynajem") },
  { source: "/reklamy-wolnostojace", destination: canonicalPath("/wynajem") },
  { source: "/reklamy-kierunkowe", destination: canonicalPath("/obsluga-kampanii") },
  { source: "/reklamy-na-budynkach", destination: canonicalPath("/druk-i-montaz-reklamy") },
  { source: "/reklamy-wewnetrzne", destination: canonicalPath("/obsluga-kampanii") },
  { source: "/reklamy-wyborcze", destination: canonicalPath("/obsluga-kampanii") },
  { source: "/obsluga-nosnikow", destination: canonicalPath("/obsluga-kampanii") },
  { source: "/katalog-cen", destination: canonicalPath("/cennik") },
  { source: "/wynajem-nosnikow", destination: canonicalPath("/wynajem") },
  { source: "/tablice-reklamowe", destination: canonicalPath("/wynajem") },
  { source: "/home1", destination: canonicalPath("/") },
  { source: "/pomagamy", destination: canonicalPath("/") },
  { source: "/rozwijamy-si%C4%99", destination: canonicalPath("/") },
  { source: "/dla-grafik%C3%B3w", destination: canonicalPath("/dla-grafikow") },
  { source: "/z%C4%85bki", destination: canonicalPath("/zabki") },
  { source: "/wo%C5%82omin", destination: canonicalPath("/wolomin") },
  { source: "/mi%C5%84sk-mazowiecki", destination: canonicalPath("/minsk-mazowiecki") },
  { source: "/pruszk%C3%B3w", destination: canonicalPath("/pruszkow") },
];

const nextConfig: NextConfig = {
  serverExternalPackages: ["nodemailer"],
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
  devIndicators: false,
  // Enable gzip/brotli compression
  compress: true,
  // Optimize production builds
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.wielkiformat.pl" }],
        destination: `${canonicalUrl}/:path*`,
        statusCode: 301,
      },
      ...legacyRedirects.map((redirect) => ({
        ...redirect,
        statusCode: 301,
      })),
    ];
  },
  // Cache static assets aggressively in production only.
  // In dev this breaks HMR and can cause client/server bundle drift.
  async headers() {
    const securityHeaders = [
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
    ];

    if (process.env.NODE_ENV !== "production") {
      return [];
    }

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|mp4|webm|woff|woff2)",
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
