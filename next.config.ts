import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["http://localhost:3000", "http://[IP_ADDRESS]/3000"],
};

export default nextConfig;
