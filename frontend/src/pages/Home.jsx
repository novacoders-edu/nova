import React, { useContext } from "react";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServiceSection";
import MissionVision from "../components/MissionVision";
import Partners from "../components/Partners";
import ContactFormSection from "../components/ContactFormSection";
import JoinNow from "../components/JoinNow";
import Highlight from "../components/Highlight";
import AboutSection from "../components/AboutSection";
import useScrollRestoration from "../hooks/useScrollRestoration";
import SEO from "../components/SEO";

const Home = () => {
  // Enable scroll restoration for home page
  useScrollRestoration('home');
  
  return (
    <div>
      <SEO 
        title="Home"
        description="Welcome to Nova Coders, your hub for innovative coding solutions, hackathons, and tech community engagement."
      />
      <HeroSection />
      <AboutSection />
      <MissionVision />
      <ServicesSection />
      <Highlight />
      <Partners />
      <ContactFormSection />
      <JoinNow />
    </div>
  );
};

export default Home;
