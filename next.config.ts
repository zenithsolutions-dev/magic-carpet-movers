import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The one-page layout absorbed these routes; 301 them to their home-page
  // sections so old links and any indexed URLs consolidate onto "/".
  async redirects() {
    return [
      { source: "/about", destination: "/#story", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/quote", destination: "/#quote", permanent: true },
    ];
  },
};

export default nextConfig;
