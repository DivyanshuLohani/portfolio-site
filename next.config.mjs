/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.dev.to",
      },
      {
        protocol: "https",
        hostname: "*.github.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "*.twimg.com",
      },
      {
        protocol: "https",
        hostname: "*.twimg.com",
      },
      {
        protocol: "https",
        hostname: "*.discordapp.net",
      },
    ],
  },
};

export default nextConfig;
