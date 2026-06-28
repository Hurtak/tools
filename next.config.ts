import { type NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

const nextConfig = (phase: string): NextConfig => ({
  ...(phase === PHASE_PRODUCTION_BUILD ? { basePath: "/tools" } : {}),
  output: "export",
  reactStrictMode: true,
  transpilePackages: ["@radix-ui/themes"],
  trailingSlash: true,
  experimental: {
    scrollRestoration: true,
  },
});

export default nextConfig;
