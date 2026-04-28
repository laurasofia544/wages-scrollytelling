import type { NextConfig } from "next";

// For GitHub Pages project sites, assets must be served from /<repo>.
// Set NEXT_PUBLIC_BASE_PATH in CI (e.g. "/scrolly"). Leave empty for user/org sites or local dev.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
