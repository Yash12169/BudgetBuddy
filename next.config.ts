import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        pathname: '/**',
      },
    ],
    domains: [
      'as2.ftcdn.net',
      // add other allowed domains here
    ],
  },
};

export default nextConfig;
