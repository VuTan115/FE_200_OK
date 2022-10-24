/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: false,
  poweredByHeader: false,
  distDir: 'dist',
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['storage.googleapis.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: { images: { layoutRaw: true } },
};
