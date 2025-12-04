import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    authInterrupts: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fe5ml3gf4p.ufs.sh',
      },
    ],
  },
};

export default nextConfig;
