import Script from 'next/script';

interface SchemaOrgProps {
  pageType?: 'HomePage' | 'AboutPage' | 'ContactPage' | 'ArticlePage';
}

export default function SchemaOrg({ pageType = 'HomePage' }: SchemaOrgProps) {
  // 基础组织信息
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ScreenView',
    description: 'All-in-one responsive design testing platform for previewing websites on 200+ devices',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    url: 'https://responsive-viewer.pages.dev',
    author: {
      '@type': 'Person',
      name: 'ScreenView Team',
    },
  };

  // 网站信息
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ScreenView',
    url: 'https://responsive-viewer.pages.dev',
    description: 'Preview and test websites on different devices and screen sizes',
    potentialAction: {
      '@type': 'SearchAction',
      'target': 'https://responsive-viewer.pages.dev/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  // 页面特定信息
  let pageSchema = {};
  
  switch (pageType) {
    case 'AboutPage':
      pageSchema = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About ScreenView',
        description: 'Learn about the ScreenView tool\'s features, development team, and how it helps developers create responsive websites across all devices.',
        url: 'https://responsive-viewer.pages.dev/about',
        isPartOf: { '@id': 'https://responsive-viewer.pages.dev/#website' },
      };
      break;
      
    case 'ContactPage':
      pageSchema = {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: '联系 ScreenView',
        description: '与 ScreenView 团队联系，获取问题解答、技术支持或提供反馈。',
        url: 'https://responsive-viewer.pages.dev/contact',
        isPartOf: { '@id': 'https://responsive-viewer.pages.dev/#website' },
      };
      break;
      
    case 'ArticlePage':
      pageSchema = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: 'How to Use ScreenView',
        description: 'Step-by-step tutorials and instructions for using ScreenView to test and preview your websites across multiple devices and screen sizes.',
        url: 'https://responsive-viewer.pages.dev/guide',
        author: {
          '@type': 'Person',
          name: 'ScreenView Team',
        },
        publisher: {
          '@type': 'Organization',
          name: 'ScreenView',
          logo: {
            '@type': 'ImageObject',
            url: 'https://responsive-viewer.pages.dev/file.svg',
          }
        },
        datePublished: '2024-01-01T00:00:00Z',
        dateModified: new Date().toISOString(),
      };
      break;
      
    default: // HomePage
      pageSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'ScreenView - Preview and test websites on different devices and screen sizes',
        description: 'All-in-one responsive design testing platform that lets you preview your website on 200+ devices and quickly identify cross-device compatibility issues',
        url: 'https://responsive-viewer.pages.dev',
        isPartOf: { '@id': 'https://responsive-viewer.pages.dev/#website' },
      };
      break;
  }

  return (
    <Script
      id="schema-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([orgSchema, websiteSchema, pageSchema])
      }}
    />
  );
} 