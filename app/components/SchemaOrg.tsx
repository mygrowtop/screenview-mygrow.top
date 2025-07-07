import Script from 'next/script';

interface SchemaOrgProps {
  pageType?: 'HomePage' | 'AboutPage' | 'ContactPage' | 'ArticlePage';
}

export default function SchemaOrg({ pageType = 'HomePage' }: SchemaOrgProps) {
  // Basic organization information
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
    url: 'https://screenview.mygrow.top',
    author: {
      '@type': 'Person',
      name: 'ScreenView Team',
    },
  };

  // Website information
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ScreenView',
    url: 'https://screenview.mygrow.top',
    description: 'Preview and test websites on different devices and screen sizes',
    potentialAction: {
      '@type': 'SearchAction',
      'target': 'https://screenview.mygrow.top/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  // Page specific information
  let pageSchema = {};
  
  switch (pageType) {
    case 'AboutPage':
      pageSchema = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About ScreenView',
        description: 'Learn about the ScreenView tool\'s features, development team, and how it helps developers create responsive websites across all devices.',
        url: 'https://screenview.mygrow.top/about',
        isPartOf: { '@id': 'https://screenview.mygrow.top/#website' },
      };
      break;
      
    case 'ContactPage':
      pageSchema = {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact ScreenView',
        description: 'Contact the ScreenView team for questions, technical support, or to provide feedback.',
        url: 'https://screenview.mygrow.top/contact',
        isPartOf: { '@id': 'https://screenview.mygrow.top/#website' },
      };
      break;
      
    case 'ArticlePage':
      pageSchema = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: 'How to Use ScreenView',
        description: 'Step-by-step tutorials and instructions for using ScreenView to test and preview your websites across multiple devices and screen sizes.',
        url: 'https://screenview.mygrow.top/guide',
        author: {
          '@type': 'Person',
          name: 'ScreenView Team',
        },
        publisher: {
          '@type': 'Organization',
          name: 'ScreenView',
          logo: {
            '@type': 'ImageObject',
            url: 'https://screenview.mygrow.top/file.svg',
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
        url: 'https://screenview.mygrow.top',
        isPartOf: { '@id': 'https://screenview.mygrow.top/#website' },
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