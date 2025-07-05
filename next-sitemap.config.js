/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://responsive-viewer.pages.dev',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  outDir: './public',
  priority: 0.7,
  changefreq: 'weekly',
} 