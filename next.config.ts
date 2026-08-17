import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/learn",
        destination: "/civic-learning",
        permanent: true,
      },
      {
        source: "/civic-challenge",
        destination: "/challenges",
        permanent: true,
      },
      {
        source: "/csr",
        destination: "/organizations",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
