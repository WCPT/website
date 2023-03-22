/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CMS_URL: process.env.CMS_URL,
  },
};

module.exports = nextConfig;
