import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://novacoders.in';

const SEO = ({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  structuredData,
}) => {
  const { pathname } = useLocation();

  const siteName    = 'Nova Coders';
  const defaultTitle = `${siteName} | MSME Registered Tech Community`;
  const defaultDescription =
    'Nova Coders is an MSME-registered tech community and service provider empowering developers through hackathons, workshops, and real-world projects in India.';
  const defaultImage = `${BASE_URL}/OG-image.jpeg`;

  const seoTitle       = title ? `${title} | ${siteName}` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoImage       = ogImage ? `${BASE_URL}${ogImage}` : defaultImage;
  // Auto-generate canonical from current path if not explicitly provided
  const canonical      = canonicalUrl || `${BASE_URL}${pathname}`;

  return (
    <Helmet>
      {/* Core */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      {/* No meta keywords — Google ignores it; can hurt with Bing if stuffed */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type"         content={ogType} />
      <meta property="og:title"        content={seoTitle} />
      <meta property="og:description"  content={seoDescription} />
      <meta property="og:image"        content={seoImage} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url"          content={canonical} />
      <meta property="og:site_name"    content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image"       content={seoImage} />
      <meta name="twitter:site"        content="@nova_coders_007" />

      {/* Per-page structured data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
