/** @type {import('next').NextConfig} */
const withLess = require('next-with-less');
const path = require('path');
const pathToLessFileWithVariables = path.resolve(
  './src/assets/styles/layouts/antd-custom.less'
);
module.exports = withLess({
  lessLoaderOptions: {
    additionalData: (content) =>
      `${content}\n\n@import '${pathToLessFileWithVariables}';`,
  },
  reactStrictMode: false,
  swcMinify: true,
  poweredByHeader: false,
  distDir: 'dist',
  compiler: {
    styledComponents: true,
  },
  // optimizeFonts: false,
  images: {
    domains: [
      'storage.googleapis.com',
      'joeschmoe.io',
      'images.foody.vn',
      'foodish-api.herokuapp.com',
      'cookie.cdn.aqaurius6666.space',
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: { images: { layoutRaw: true }, appDir: true },
  rewrites: async () => {
    const CDN = process.env.NEXT_PUBLIC_CDN_URL;
    return [
      {
        source: '/uploads/:path*',
        destination: `${CDN}/uploads/:path*`,
      },
    ];
  },
});
