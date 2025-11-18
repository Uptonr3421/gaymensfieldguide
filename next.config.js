const path = require("path")
const { withContentlayer } = require("next-contentlayer")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.resolve.alias["contentlayer/generated"] = path.join(
      process.cwd(),
      ".contentlayer/generated"
    )

    return config
  },
}

module.exports = withContentlayer(nextConfig)
