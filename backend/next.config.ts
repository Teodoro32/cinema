import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  crossOrigin: 'anonymous',
  allowedDevOrigins: [ "*", "http://localhost:5173"]
  
};

export default nextConfig;
