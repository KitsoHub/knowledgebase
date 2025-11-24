/** @type {import('next').NextConfig} */
const nextConfig = {
    // Disable source maps in production builds
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  images: {
    domains: ['images.unsplash.com']
  }
};

export default nextConfig;
