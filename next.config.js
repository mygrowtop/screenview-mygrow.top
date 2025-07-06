/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Enable static exports for Cloudflare Pages
  images: {
    unoptimized: true, // Required for static export
  },
  // Configure domains for external images if needed
  // images: {
  //   domains: ['example.com'],
  // },
};

module.exports = nextConfig;
