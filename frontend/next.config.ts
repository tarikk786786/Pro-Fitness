import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix turbopack root warning by explicitly setting it
  turbopack: {
    root: __dirname,
  },
  // Image optimization
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.svgrepo.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },
  // Redirects
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/gym", destination: "/services", permanent: true },
    ];
  },
};

export default nextConfig;
