// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   allowedDevOrigins: ["http://localhost:3000", "http://[IP_ADDRESS]/3000"],
// };

// export default nextConfig;


/* eslint-disable @typescript-eslint/no-explicit-any */

const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_API_URL;
let allowLocalIp = false;
const remotePatterns = [
  {
    protocol: "http",
    hostname: "localhost",
    port: "5000",
    pathname: "/**",
  },
  {
    protocol: "http",
    hostname: "127.0.0.1",
    port: "5000",
    pathname: "/**",
  },
  {
    protocol: "https",
    hostname: "vault-vogue-server.vercel.app",
    pathname: "/**",
  },
];

if (apiUrl) {
  try {
    const { protocol, hostname, port } = new URL(apiUrl);

    remotePatterns.push({
      protocol: protocol.replace(":", ""),
      hostname,
      port,
      pathname: "/**",
    });

    allowLocalIp =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "::1";
  } catch {
    console.warn("Invalid NEXT_PUBLIC_API_URL for next/image remotePatterns");
  }
}

/** @type {import('next').NextConfig} */
const nextDevtoolsShim = "./src/shims/next-devtools.ts";

const nextConfig = {
  images: {
    remotePatterns,
    dangerouslyAllowLocalIP: allowLocalIp,
  },
  webpack(config: any) {
    config.resolve ??= {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "next/dist/compiled/next-devtools": nextDevtoolsShim,
    };

    return config;
  },
  allowedDevOrigins: ["192.168.6.167"],
  turbopack: {
    resolveAlias: {
      "next/dist/compiled/next-devtools": nextDevtoolsShim,
    },
  },
};

export default nextConfig;
