/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://screenview.mygrow.top',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*'],
      },
    ],
    additionalSitemaps: [
      'https://screenview.mygrow.top/sitemap.xml',
    ],
  },
  exclude: ['/admin', '/admin/*'],
  outDir: './public',
  priority: 0.7,
  changefreq: 'weekly',
  transform: async (config, path) => {
    // Custom priorities
    let priority = 0.7;
    
    if (path === '/') {
      priority = 1.0; // Homepage highest priority
    } else if (path === '/guide') {
      priority = 0.9; // Guide high priority
    } else if (path === '/about') {
      priority = 0.8; // About page
    } 
    
    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [],
    };
  },
} 