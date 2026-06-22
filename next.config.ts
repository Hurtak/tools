import { type NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

const nextConfig = (phase: string): NextConfig => ({
  ...(phase === PHASE_PRODUCTION_BUILD ? { basePath: "/tools" } : {}),
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    scrollRestoration: true,
  },
});

export default nextConfig;
