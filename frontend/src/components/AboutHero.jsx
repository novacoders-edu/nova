import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Users, Code2, Rocket, ArrowRight, Calendar } from "lucide-react";

const stats = [
  { label: "Events Organized", value: "15+" },
  { label: "Active Members", value: "2K+" },
  { label: "Projects Built", value: "25+" },
  { label: "Workshops Conducted", value: "10+" },
];

const features = [
  {
    icon: <Users className="w-5 h-5 text-cyan-400" />,
    title: "Community Driven",
    description: "A vibrant community of learners, builders and innovators.",
  },
  {
    icon: <Code2 className="w-5 h-5 text-cyan-400" />,
    title: "Practical Learning",
    description: "Hands-on workshops, mentorship and real world projects.",
  },
  {
    icon: <Rocket className="w-5 h-5 text-cyan-400" />,
    title: "Future Focused",
    description: "Preparing members for tech careers and real impact.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function AboutHero() {
  const navigate = useNavigate();

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative w-full bg-[#05091a] overflow-hidden pt-24 pb-0">
        {/* ambient radial glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-0 w-[520px] h-[520px] rounded-full bg-cyan-500/10 blur-[110px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-700/10 blur-[90px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 xl:px-20">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 pb-16">

            {/* ── LEFT CONTENT ── */}
            <motion.div
              className="flex-1 max-w-xl"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* pill badge */}
              <motion.div variants={itemVariants}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 text-sm font-medium mb-6">
                  About Nova Coders
                </span>
              </motion.div>

              {/* heading */}
              <motion.h1
                className="text-4xl sm:text-5xl font-extrabold leading-tight text-white mb-5"
                variants={itemVariants}
              >
                Building the Future,{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Together.
                </span>
              </motion.h1>

              {/* description */}
              <motion.p
                className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8"
                variants={itemVariants}
              >
                Nova Coders is a tech community focused on learning, collaboration,
                and real-world impact. We organize hackathons, workshops, and projects
                that empower students to grow and build innovative solutions.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-wrap gap-4 mb-12"
                variants={itemVariants}
              >
                <button
                  onClick={() => navigate("/contact")}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.03] transition-all duration-200"
                >
                  Start a Conversation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate("/events")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-cyan-400/30 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 hover:border-cyan-400/60 transition-all duration-200"
                >
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  See Upcoming Events
                </button>
              </motion.div>

              {/* features row */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                variants={itemVariants}
              >
                {features.map((f) => (
                  <div
                    key={f.title}
                    className="flex flex-col gap-2 p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2">
                      {f.icon}
                      <span className="text-white font-semibold text-sm">{f.title}</span>
                    </div>
                    <p className="text-gray-400 text-xs leading-snug">{f.description}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── RIGHT IMAGE + STATS CARD ── */}
            <motion.div
              className="flex-1 relative w-full max-w-2xl"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
              {/* hero image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/40 border border-white/10">
                <img
                  src="/about-hero.png"
                  alt="Nova Coders team collaborating in a hackathon war room"
                  className="w-full h-[340px] sm:h-[420px] object-cover object-center"
                />
                {/* subtle overlay gradient at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05091a]/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating stats card */}
              <motion.div
                className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 z-20 bg-[#0d1635]/90 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-5 shadow-2xl shadow-blue-900/40 min-w-[220px]"
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
              >
                {/* logo mark */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-white text-xs font-bold tracking-wide">Nova Coders</span>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <div className="text-2xl font-extrabold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent leading-tight">
                        {s.value}
                      </div>
                      <div className="text-gray-400 text-[11px] mt-0.5 leading-snug">{s.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── WAVE DIVIDER ── */}
        <div className="relative w-full overflow-hidden leading-none -mb-1 ">
          <svg
            viewBox="0 0 1440 90"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-[70px] sm:h-[90px]"
          >
            <path
              d="M0,40 C200,90 400,0 600,50 C800,100 1000,10 1200,55 C1320,75 1400,40 1440,30 L1440,90 L0,90 Z"
              fill="#0D1634"
              opacity="0.97"
            />
          </svg>
        </div>
      </section>

      {/* ── MISSION TEASER (white band) ── */}
      <section className="bg-[#0D1634] py-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-cyan-400/40 bg-cyan-50 text-cyan-600 text-xs font-semibold mb-4 tracking-wide">
            What We Do
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Empowering Learners.{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Building Innovators.
            </span>
          </h2>
          <p className="text-gray-300 max-w-4xl mx-auto text-sm sm:text-base">
          We build innovative digital solutions for businesses while empowering developers through hackathons, workshops, mentorship, real-world projects, internships, and a collaborative tech community.
          </p>
        </motion.div>
      </section>
    </>
  );
}
