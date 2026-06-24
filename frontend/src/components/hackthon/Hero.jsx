import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Hero() {
  return (
    <motion.section
      className="relative w-full text-center max-w-8xl mx-auto px-4 pt-32 sm:px-6 md:px-8 lg:pt-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ visible: { transition: { staggerChildren: 0.11 } } }}
    >
      {/* bg glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[360px] h-[190px] sm:w-[500px] sm:h-[260px] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-10 right-[15%] w-36 h-36 sm:w-48 sm:h-48 bg-blue-600/8 rounded-full blur-3xl" />
      </div>

      {/* heading */}
      <motion.h1
        variants={item}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-10"
      >
        <span className="bg-gradient-to-b from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
          Building the Future Through
        </span>

        <br />
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Innovation
        </span>
        <span className="text-white"> & </span>
        <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          Hackathons
        </span>
      </motion.h1>

      {/* sub */}
      <motion.p
        variants={item}
        className="text-sm sm:text-base md:text-lg text-slate-400 max-w-4xl mx-auto leading-relaxed mb-20"
      >
        Connecting innovators, creators, and developers through impactful
        <span className="text-green-300"> hackathons</span> that inspire innovation, collaboration, and real-world
        solutions. Building a <span className="text-cyan-300">community</span> where ideas turn into technology and
        passion drives the future.
      </motion.p>

      {/* cta */}
      <motion.div
        variants={item}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14"
      >
        <a
          href="/events"
          className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold shadow-lg shadow-cyan-500/20 hover:brightness-110 hover:scale-105 transition-all duration-200"
        >
          Explore Hackathons <ArrowRight className="w-4 h-4" />
        </a>
        <a
          href="#winners"
          className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white text-sm font-semibold hover:bg-white/10 hover:border-white/25 transition-all duration-200"
        >
          See Winners
        </a>
      </motion.div>
    </motion.section>
  );
}
