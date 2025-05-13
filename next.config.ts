import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "127.0.0.1"
  ],
  images: {
    domains: [
      "www.gravatar.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gravatar.com",
        port: "",
        pathname: "/**",
        search: "",
      }
    ],
  }
};

export default nextConfig;
