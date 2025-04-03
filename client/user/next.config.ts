import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    SERVER_URL: 'http://localhost:5050',
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://127.0.0.1:5050/:path*' // Proxy to Backend
  //     }
  //   ]
  // }

};

export default nextConfig;
