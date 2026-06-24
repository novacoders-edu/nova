import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHome, FaArrowLeft, FaBriefcase, FaRocket } from "react-icons/fa";
import SEO from "../components/SEO";

const Careers = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030712] via-[#0c1329] to-[#232a46] flex items-center justify-center px-4 relative overflow-hidden p-20">
      <SEO 
        title="Careers - Coming Soon"
        description="Exciting career opportunities at Nova Coders are coming soon. Be part of our innovative team and shape the future of technology."
        canonicalUrl="https://novacoders.in/careers"
      />
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-2xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-2xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-green-400/20 to-teal-600/20 rounded-full blur-2xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        className="text-center max-w-4xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Coming Soon Text */}
        <motion.div variants={itemVariants} className="relative mb-8">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-600 leading-none">
            Coming Soon
          </h1>

          {/* Floating Icons around Coming Soon */}
          <motion.div
            className="absolute top-0 left-1/4 text-green-400 text-4xl"
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 360],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaBriefcase />
          </motion.div>

          <motion.div
            className="absolute top-1/4 right-1/4 text-cyan-400 text-3xl"
            animate={{
              y: [20, -20, 20],
              rotate: [360, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <FaRocket />
          </motion.div>
        </motion.div>

        {/* Message */}
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Careers at Nova Coders
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We're building something amazing and we can't wait to share exciting career opportunities with you. Stay tuned for updates!
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FaHome className="text-lg" />
              <span>Back to Home</span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 hover:border-cyan-400/50 transition-all duration-300"
            >
              <FaArrowLeft className="text-lg" />
              <span>Go Back</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Helpful internal links */}
        <motion.div variants={itemVariants} className="mt-10">
          <p className="text-sm text-gray-500 mb-4">In the meantime, explore:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { to: "/portfolio", label: "Portfolio" },
              { to: "/about", label: "About Us" },
              { to: "/services", label: "Services" },
              { to: "/contact", label: "Contact Us" },
              { to: "/events", label: "Events" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="px-4 py-2 text-sm text-cyan-400 border border-cyan-400/30 rounded-full hover:bg-cyan-400/10 hover:border-cyan-400/60 transition-all duration-200"
              >
                {label}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Animated Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Careers;
