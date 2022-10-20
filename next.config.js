/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  distDir: 'dist',
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['storage.googleapis.com', '103.3.62.244', 'tiemaocuoi.xyz'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: { images: { layoutRaw: true } },
};
