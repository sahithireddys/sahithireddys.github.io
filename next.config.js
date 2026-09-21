/** @type {import('next').NextConfig} */
// Static export so the site can be hosted on GitHub Pages (served from the root of sahithireddys.github.io).
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  output: 'export',
  images: { unoptimized: true },
}
module.exports = nextConfig
