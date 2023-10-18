/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: '*',
      },
    ],
  },
};

module.exports = nextConfig;
