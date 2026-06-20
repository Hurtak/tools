import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/tools",
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
