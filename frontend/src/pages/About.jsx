import React, { useContext, useMemo, Suspense } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import Button from "../components/ui/Button";
import SEO from "../components/SEO";
import AboutHero from "../components/AboutHero";

// Lazy load heavy components for better performance

const MissionVision = React.lazy(() => import("../components/MissionVision"));
const TeamCard = React.lazy(() => import("../components/TeamCard"));
const RegistrationBadges = React.lazy(() =>
  import("../components/RegistrationBadges")
);

const About = () => {
  const { team, timeline } = useContext(DataContext);

  // Memoized animation variants for performance
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
        },
      },
    }),
    []
  );

  // Memoized team data to prevent unnecessary re-renders
  const memoizedTeam = useMemo(() => team, [team]);
  const memoizedTimeline = useMemo(() => timeline, [timeline]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030712] via-[#0c1329] to-[#232a46]">
      <SEO 
        title="About Us"
        description="Learn about Nova Coders — an MSME-registered tech community empowering developers through hackathons, workshops, mentorship, and real-world projects."
        canonicalUrl="https://novacoders.in/about"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Nova Coders",
          "url": "https://novacoders.in/about",
          "description": "Nova Coders is an MSME-registered tech community empowering developers through hands-on learning and community-driven mentorship.",
          "mainEntity": {
            "@type": "Organization",
            "name": "Nova Coders",
            "url": "https://novacoders.in",
            "foundingDate": "2024",
            "description": "Student-led innovation hub building the next generation of tech leaders."
          }
        }}
      />
      <AboutHero />
      {/* Mission & Vision Section */}
      <section className="py-16 px-6 md:px-10 lg:px-20">
        <Suspense
          fallback={
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            </div>
          }
        >
          <MissionVision />
        </Suspense>
      </section>

      {/* Clean Timeline Section */}
      <section className=" px-6 md:px-10 lg:px-20">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Simple Timeline Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl font-bold mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent">
                Journey
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              From a small group of passionate developers to a thriving
              community of innovators
            </p>
          </motion.div>

          {/* Modern Timeline Layout */}
          <div className="relative">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 rounded-full opacity-30"></div>

            <div className="space-y-16">
              {memoizedTimeline.map((item, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {/* Timeline Content */}
                  <div className="w-5/12">
                    <motion.div
                      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] group"
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center mb-4">
                        <span className="text-3xl mr-4 group-hover:scale-110 transition-transform duration-300">
                          {item.icon}
                        </span>
                        <span className="text-cyan-400 font-bold text-xl">
                          {item.year}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="w-2/12 flex justify-center">
                    <motion.div
                      className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full border-4 border-gray-900 shadow-[0_0_20px_rgba(34,211,238,0.6)] z-10"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                      whileHover={{ scale: 1.3 }}
                    />
                  </div>

                  {/* Empty Space for Alternating Layout */}
                  <div className="w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Optimized Team Section */}
      <section className="py-16 px-6 md:px-10 lg:px-20">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl font-bold mb-4">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent">
                Team
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              The passionate individuals behind Nova Coders, driving innovation
              and community growth
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
          >
            {memoizedTeam.map((member, index) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
              >
                <Suspense
                  fallback={
                    <div className="bg-white/5 rounded-2xl p-6 animate-pulse">
                      <div className="w-20 h-20 bg-gray-600 rounded-full mx-auto mb-4"></div>
                      <div className="h-4 bg-gray-600 rounded mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded"></div>
                    </div>
                  }
                >
                  <TeamCard {...member} />
                </Suspense>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Registration Badges Section */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
          </div>
        }
      >
        <RegistrationBadges />
      </Suspense>
    </div>
  );
};

export default About;
