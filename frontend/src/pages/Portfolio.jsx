import React, { useContext, useMemo, Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DataContext } from "../context/DataProvider";
import { FaCode, FaCalendarAlt, FaUsers, FaFilter } from "react-icons/fa";
import SEO from "../components/SEO";
import PhotoGallery from "../components/PhotoGallery";

// Lazy load components for better performance
const ProjectCard = React.lazy(() => import("../components/ProjectCard"));
const EventCard = React.lazy(() => import("../components/EventCard"));
const ContactFormSection = React.lazy(
  () => import("../components/ContactFormSection"),
);


// ─── Category filter config ───────────────────────────────────────────────────
const CATEGORIES = [
  { key: "all", label: "All Projects" },
  { key: "web", label: "Web" },
  { key: "mobile", label: "Mobile" },
  { key: "ai/ml", label: "AI / ML" },
  { key: "blockchain", label: "Blockchain" },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.9, y: -10, transition: { duration: 0.25 } },
};

// ─── Skeleton loader ──────────────────────────────────────────────────────────
const CardSkeleton = () => (
  <div className="bg-white/5 rounded-2xl overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-slate-700/60" />
    <div className="p-6 space-y-3">
      <div className="h-5 bg-slate-700/60 rounded w-3/4" />
      <div className="h-3 bg-slate-700/40 rounded w-full" />
      <div className="h-3 bg-slate-700/40 rounded w-5/6" />
      <div className="flex gap-2 pt-2">
        <div className="h-5 w-14 bg-slate-700/60 rounded-full" />
        <div className="h-5 w-14 bg-slate-700/60 rounded-full" />
      </div>
    </div>
  </div>
);

// ─── Main Portfolio page ──────────────────────────────────────────────────────
const Portfolio = () => {
  const { events, projects, images } = useContext(DataContext);
  const [activeCategory, setActiveCategory] = useState("all");

  const memoizedProjects = useMemo(() => projects || [], [projects]);

  // Derive available categories from actual data
  const availableCategories = useMemo(() => {
    const cats = new Set(
      (memoizedProjects || []).map((p) => p.category?.toLowerCase()),
    );
    return CATEGORIES.filter((c) => c.key === "all" || cats.has(c.key));
  }, [memoizedProjects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return memoizedProjects;
    return memoizedProjects.filter(
      (p) => p.category?.toLowerCase() === activeCategory,
    );
  }, [memoizedProjects, activeCategory]);

  // Featured project = first completed one (reserved for future spotlight section)
  // const featuredProject = useMemo(
  //   () => memoizedProjects.find((p) => p.status === "completed") || memoizedProjects[0],
  //   [memoizedProjects]
  // );

  return (
    <div className="min-h-screen ">
      <SEO
        title="Portfolio"
        description="Explore Nova Coders' portfolio of web, AI/ML, and blockchain projects built by our student developer community."
        canonicalUrl="https://novacoders.in/portfolio"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Nova Coders Portfolio",
          "url": "https://novacoders.in/portfolio",
          "description": "Portfolio of web, AI/ML, and blockchain projects built by Nova Coders community.",
          "publisher": {
            "@type": "Organization",
            "name": "Nova Coders",
            "url": "https://novacoders.in"
          }
        }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden w-full min-h-[65vh] mt-10">
     

        {/*left*/}
        <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-16 flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className=""
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-cyan-400 border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 rounded-full backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                developer_ecosystem/
              </span>
            </motion.div>

            {/* heading */}
            <motion.div
              className="flex items-center gap-4 mb-5"
              variants={itemVariants}
            >
              <motion.div
                className="w-14 h-14 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-2xl border border-cyan-400/30 flex items-center justify-center backdrop-blur-sm flex-shrink-0"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(34,211,238,0.25)",
                    "0 0 35px rgba(34,211,238,0.5)",
                    "0 0 20px rgba(34,211,238,0.25)",
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FaCode className="text-xl text-cyan-400" />
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight">
                Portfolio
              </h1>
            </motion.div>

            {/* subtitle */}
            <motion.div className="mb-6" variants={itemVariants}>
              <h2 className="text-xl md:text-2xl font-semibold text-cyan-400 relative inline-block">
                Showcasing Technology, Creativity & Real-World Innovation.
                <motion.div
                  className="absolute -bottom-1.5 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                />
              </h2>
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mb-10"
              variants={itemVariants}
            >
              A portfolio of powerful products, hackathons, developer
              communities, and next-generation digital solutions crafted by Nova
              Coders.
            </motion.p>
          </motion.div>

          {/*Right*/}
          <motion.div
            className="w-full lg:w-[55%] flex justify-center"
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="https://ik.imagekit.io/novacoders/Photos/ChatGPT%20Image%20May%2022,%202026,%2003_01_42%20PM.png?updatedAt=1779442801944"
              alt="Nova Coders developer community — innovative projects and hackathons"
              className=" rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 p-1"
            />
          </motion.div>
        </section>
        {/* stat cards */}
        <motion.div
          className="w-full max-w-7xl mx-auto mb-10 px-4 sm:px-6 lg:px-8"
          variants={itemVariants}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: <FaCode className="text-xl sm:text-2xl text-cyan-400" />,
                value: memoizedProjects.length,
                label: "Projects Completed",
                border: "border-cyan-400/30",
                hover: "hover:border-cyan-400/60",
              },
              {
                icon: (
                  <FaCalendarAlt className="text-xl sm:text-2xl text-blue-400" />
                ),
                value: "6+",
                label: "Events Organized",
                border: "border-blue-400/30",
                hover: "hover:border-blue-400/60",
              },
              {
                icon: <span className="text-xl sm:text-2xl">🚀</span>,
                value: "500+",
                label: "Community Members",
                border: "border-purple-400/30",
                hover: "hover:border-purple-400/60",
              },
              {
                icon: (
                  <FaUsers className="text-xl sm:text-2xl text-emerald-400" />
                ),
                value:
                  memoizedProjects.reduce((s, p) => s + (p.teamSize || 0), 0) +
                  "+",
                label: "Contributors",
                border: "border-emerald-400/30",
                hover: "hover:border-emerald-400/60",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className={`
          bg-white/5 backdrop-blur-md border
          ${stat.border} ${stat.hover}
          rounded-2xl
          p-4 sm:p-5
          flex flex-col sm:flex-row
          items-center sm:items-start
          text-center sm:text-left
          gap-3 sm:gap-4
          transition-all duration-300
          cursor-default
          min-h-[10px]
        `}
                whileHover={{
                  scale: 1.03,
                  backgroundColor: "rgba(255,255,255,0.08)",
                }}
              >
                <div className="shrink-0">{stat.icon}</div>

                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">
                    {stat.value}
                  </div>

                  <div className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Projects Grid ─────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-10 lg:px-20 relative">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-3xl" />
        </div>

        <motion.div
          className="max-w-7xl mx-auto relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* section header */}
          <motion.div className="text-center mb-10" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              All{" "}
              <span className="bg-gradient-to-r from-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
              Spanning web development, mobile apps, AI/ML solutions, and
              blockchain technology
            </p>
          </motion.div>

          {/* category filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            variants={itemVariants}
          >
            <FaFilter className="text-gray-500 self-center mr-1" />
            {availableCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-250 ${
                  activeCategory === cat.key
                    ? "bg-cyan-500 border-cyan-500 text-black"
                    : "bg-white/5 border-white/15 text-gray-300 hover:border-cyan-400/50 hover:text-cyan-300"
                }`}
              >
                {cat.label}
                {cat.key !== "all" && (
                  <span className="ml-1.5 text-xs opacity-60">
                    (
                    {
                      memoizedProjects.filter(
                        (p) => p.category?.toLowerCase() === cat.key,
                      ).length
                    }
                    )
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          {/* grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >
                  <Suspense fallback={<CardSkeleton />}>
                    <ProjectCard {...project} />
                  </Suspense>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* empty state */}
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No projects found
              </h3>
              <p className="text-gray-400">
                No projects in this category yet. Check back soon!
              </p>
              <button
                onClick={() => setActiveCategory("all")}
                className="mt-4 px-5 py-2 bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 rounded-xl text-sm hover:bg-cyan-500/30 transition-colors"
              >
                Show all projects
              </button>
            </motion.div>
          )}
        </motion.div>
      </section>

      <PhotoGallery images={images} />

      {/* ── Events ───────────────────────────────────────────────────────────── */}
      {events && events.length > 0 && (
        <section
          id="events"
          className="py-16 px-6 md:px-10 lg:px-20 bg-gradient-to-br from-gray-900/50 via-slate-800/30 to-gray-900/50 relative"
        >
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-400 to-teal-600 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full blur-3xl" />
          </div>

          <motion.div
            className="max-w-7xl mx-auto relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <h2 className="text-4xl font-bold mb-4">
                Recent{" "}
                <span className="bg-gradient-to-r from-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent">
                  Events
                </span>
              </h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Stay updated with our latest hackathons, workshops, and
                community events
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {events.slice(0, 6).map((event, index) => (
                <motion.div key={event.id || index} variants={itemVariants}>
                  <Suspense fallback={<CardSkeleton />}>
                    <EventCard {...event} />
                  </Suspense>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* ── Contact ───────────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-10 lg:px-20 bg-gradient-to-br from-indigo-900/30 via-cyan-900/20 to-blue-900/30 relative">
         <div className="absolute inset-0 pointer-events-none opacity-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/70 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/70 rounded-full blur-3xl" />
        </div>

        <motion.div
          className="max-w-6xl mx-auto relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={itemVariants}>
            <Suspense
              fallback={
                <div className="flex justify-center items-center py-10">
                  <div className="w-8 h-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
                </div>
              }
            >
              <ContactFormSection />
            </Suspense>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Portfolio;
