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
  // Old URLs Kachi has already shared keep working after the redesign.
  async redirects() {
    return [
      { source: "/projects", destination: "/work", permanent: true },
      // Old project ids (pt-1, se-1...) have no new equivalent, so send them to the hub.
      { source: "/projects/:slug", destination: "/work", permanent: true },
      { source: "/blog", destination: "/writeups", permanent: true },
      { source: "/security-engineering", destination: "/work", permanent: true },
      { source: "/penetration-testing", destination: "/work", permanent: true },
      { source: "/ai-security", destination: "/work", permanent: true },
      { source: "/certifications", destination: "/#credentials", permanent: true },
    ];
  },
};

export default nextConfig;
