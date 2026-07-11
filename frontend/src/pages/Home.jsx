import React, { Suspense } from "react";
import HeroSection from "../components/HeroSection";
import useScrollRestoration from "../hooks/useScrollRestoration";
import SEO from "../components/SEO";

// Above-fold: HeroSection loads eagerly (already imported above)
// Below-fold: lazy load everything else — they only need to render when scrolled to
const AboutSection      = React.lazy(() => import("../components/AboutSection"));
const MissionVision     = React.lazy(() => import("../components/MissionVision"));
const ServicesSection   = React.lazy(() => import("../components/ServiceSection"));
const Partners          = React.lazy(() => import("../components/Partners"));
const ContactFormSection = React.lazy(() => import("../components/ContactFormSection"));
const JoinNow           = React.lazy(() => import("../components/JoinNow"));

// Minimal height placeholder so layout doesn't jump
const SectionFallback = () => <div className="min-h-[200px]" />;

const Home = () => {
  useScrollRestoration("home");

  return (
    <div>
      <SEO
        title="Home"
        description="Nova Coders is an MSME-registered tech community empowering developers through hackathons, workshops, and real-world projects. Join 500+ members today."
        canonicalUrl="https://novacoders.in/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Nova Coders",
          "url": "https://novacoders.in",
          "logo": "https://novacoders.in/logo.png",
          "description": "MSME-registered tech community empowering developers through hackathons and real-world projects.",
          "foundingDate": "2024",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Aligarh",
            "addressRegion": "Uttar Pradesh",
            "addressCountry": "IN"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-6397973513",
            "contactType": "customer service",
            "email": "novacoder007@gmail.com"
          },
          "sameAs": [
            "https://www.instagram.com/nova_coders_007/",
            "https://www.linkedin.com/company/novacoders007/",
            "https://github.com/novacoders-edu"
          ]
        }}
      />

      {/* Hero is critical — eager */}
      <HeroSection />

      {/* Everything below the fold is lazy */}
      <Suspense fallback={<SectionFallback />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <MissionVision />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ServicesSection />
      </Suspense>
    
      <Suspense fallback={<SectionFallback />}>
        <Partners />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ContactFormSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <JoinNow />
      </Suspense>
    </div>
  );
};

export default Home;
