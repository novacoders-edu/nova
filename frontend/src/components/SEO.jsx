import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, canonicalUrl, ogImage, ogType = 'website' }) => {
  const siteName = "Nova Coders";

const defaultTitle = `${siteName} | MSME Registered Tech Community & Development Services`;

const defaultDescription = "Nova Coders is an MSME-registered tech community and service provider empowering developers through hackathons, workshops, and real-world project development. We offer web and AI solutions, coding mentorship, and industry-driven innovation programs for students and startups.";

const defaultKeywords = "Nova Coders, MSME registered tech company, web development services, AI solutions, hackathons India, coding community, student developers, tech workshops, startup tech support, software development, blockchain, cybersecurity";

  const defaultImage = "/OG image.jpeg"; 

  const seoTitle = title ? `${title} - ${siteName}` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  const seoImage = ogImage || defaultImage;

  return (
    <Helmet>
      {/* Basic HTML Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:site_name" content={siteName} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
    </Helmet>
  );
};

export default SEO;
