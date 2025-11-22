const path = require("path")
const { withContentlayer } = require("next-contentlayer")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  webpack(config) {
    config.resolve.alias["contentlayer/generated"] = path.join(
      process.cwd(),
      ".contentlayer/generated"
    )

    return config
  },
}

module.exports = withContentlayer(nextConfig)
