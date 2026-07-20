import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow LAN/device testing during development (Chrome on phone/tablet).
  allowedDevOrigins: process.env.NODE_ENV === 'development'
    ? ["192.168.100.147", "192.168.8.105", "192.168.8.*", "192.168.100.176","172.19.176.1"]
    : [],
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
