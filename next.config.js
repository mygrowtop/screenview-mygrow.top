/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static exports for Cloudflare Pages
  trailingSlash: true, // Add trailing slashes to URLs
  images: {
    unoptimized: true, // Required for static export
  },
  // Configure domains for external images if needed
  // images: {
  //   domains: ['example.com'],
  // },
  
  // Security-related configuration
  // NOTE: These headers will only work in development mode or when using Next.js server
  // In static export mode (output: 'export'), you need to configure these headers
  // on your hosting platform (like Cloudflare Pages)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self'; default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self' https:; frame-src https: data:;"
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
