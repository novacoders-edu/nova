import React, { Suspense } from "react";
import HeroSection from "../components/HeroSection";
import useScrollRestoration from "../hooks/useScrollRestoration";
import SEO from "../components/SEO";

// Above-fold: HeroSection loads eagerly (already imported above)
// Below-fold: lazy load everything else — they only need to render when scrolled to
const AboutSection      = React.lazy(() => import("../components/AboutSection"));
const MissionVision     = React.lazy(() => import("../components/MissionVision"));
const ServicesSection   = React.lazy(() => import("../components/ServiceSection"));
const Highlight         = React.lazy(() => import("../components/Highlight"));
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
        description="Welcome to Nova Coders, your hub for innovative coding solutions, hackathons, and tech community engagement."
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
        <Highlight />
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
