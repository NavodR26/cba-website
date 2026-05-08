import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow LAN/device testing during development (Chrome on phone/tablet).
  allowedDevOrigins: ["192.168.100.147"],
};

export default nextConfig;
