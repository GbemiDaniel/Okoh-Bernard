import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.credly.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tryhackme-badges.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tryhackme.com",
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;
