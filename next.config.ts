import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Service discontinued; keep old indexed URL from 404ing.
      { source: "/auto-detailing", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
