/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com", "github.com"],
  },
  transpilePackages: ["three"],
};

module.exports = nextConfig;
