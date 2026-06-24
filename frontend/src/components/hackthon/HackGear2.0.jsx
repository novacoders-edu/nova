import React, { useContext } from "react";
import { motion } from "framer-motion";
import { DataContext } from "../../context/DataProvider";
import WinnerCart from "../ui/WinnerCart";
import { Trophy, Users, Zap, Award } from "lucide-react";

// ── constants ─────────────────────────────────────────────────────────────────
const PODIUM_ORDER = [1, 0, 2];
const PODIUM_META = [
  {
    scale: "scale-95",
    zIndex: "z-10",
    translateY: "translate-y-6",
    glowColor: "shadow-slate-400/20",
    ringColor: "ring-slate-400/30",
  },
  {
    scale: "scale-105",
    zIndex: "z-20",
    translateY: "translate-y-0",
    glowColor: "shadow-yellow-500/30",
    ringColor: "ring-yellow-400/40",
  },
  {
    scale: "scale-95",
    zIndex: "z-10",
    translateY: "translate-y-6",
    glowColor: "shadow-orange-500/20",
    ringColor: "ring-orange-400/30",
  },
];
const STATS = [
  { icon: Users, label: "Participants", value: "650+", color: "text-cyan-400" },
  {
    icon: Trophy,
    label: "Worth Prize Pool",
    value: "₹1.5 Lakh",
    color: "text-yellow-400",
  },
  {
    icon: Zap,
    label: "Projects Built",
    value: "50+",
    color: "text-emerald-400",
  },
];
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

// ── Helper: render winner card ────────────────────────────────────────────────
const renderWinnerCard = (winner, index) => (
  <WinnerCart
    key={winner.teamName ?? index}
    src={winner.src}
    imageAlt={winner.teamName}
    teamName={winner.teamName}
    projectTitle={winner.projectTitle}
    prize={winner.prize}
    tag={winner.tag}
    metrics={[{ label: "Prize", value: winner.price }]}
  />
);

// ── Helper: render podium card ─────────────────────────────────────────────────
const renderPodiumCard = (winner, podiumIdx) => {
  if (!winner) return null;
  const meta = PODIUM_META[podiumIdx];
  return (
    <motion.div
      key={winner.teamName ?? podiumIdx}
      className={`flex flex-col items-center ${meta.scale} ${meta.zIndex} ${meta.translateY} w-full max-w-[320px]`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: podiumIdx * 0.1 }}
    >
   
      <div
        className={`w-full rounded-2xl ring-1 ${meta.ringColor} shadow-2xl ${meta.glowColor}`}
      >
        {renderWinnerCard(winner, podiumIdx)}
      </div>
    
    </motion.div>
  );
};

// ── Component ─────────────────────────────────────────────────────────────────
const HackGear2 = () => {
  const { hackgear2 = [] } = useContext(DataContext);
  const podiumWinners = PODIUM_ORDER.map((i) => hackgear2[i] ?? null);

  return (
    <section
      aria-labelledby="hackgear2-heading"
      className="relative max-w-6xl mx-auto px-4 py-16 overflow-hidden"
    >
      {/* ── ambient glow blobs ─────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <motion.div
        className="text-center space-y-5 mb-14"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {/* eyebrow */}
        <motion.div variants={itemVariants}>
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-cyan-300/80 border border-cyan-400/20 bg-cyan-400/8 px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Hack Gear 2.0 — April 2026
          </span>
        </motion.div>

        {/* heading */}
        <motion.h2
          id="hackgear2-heading"
          variants={itemVariants}
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-white"
        >
          The Stage.&nbsp;
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 bg-clip-text text-transparent">
              The Champions.
            </span>
            {/* animated underline */}
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            />
          </span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mx-auto max-w-2xl text-base md:text-lg text-slate-300/80 leading-relaxed"
        >
         HackGear 2.0 brought together passionate innovators, developers, and creators to build impactful solutions, foster collaboration, and celebrate the spirit of innovation.

        </motion.p>

        {/* ── Stats bar ───────────────────────────────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 pt-2 center justify-center max-w-4xl mx-auto"
        >
          {STATS.map(({ icon: Icon, label, value, color }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 bg-white/4 border border-white/8 rounded-2xl px-5 py-3 backdrop-blur-sm w-[290px] mx-auto"
            >
              <Icon className={`w-4 h-4 ${color} shrink-0`} />
              <div className="text-left min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 leading-none mb-0.5">
                  {label}
                </p>
                <p className="text-sm font-bold text-white">{value}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Podium ───────────────────────────────────────────────────────── */}
      {hackgear2.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-12 text-center text-slate-400">
          <Trophy className="w-10 h-10 mx-auto mb-4 text-yellow-400/40" />
          <p className="text-lg font-semibold text-white">
            Winner details coming soon.
          </p>
          <p className="mt-1 text-sm">
            Stay tuned for Hack Gear 2.0 highlights.
          </p>
        </div>
      ) : (
        <>
          <div className="hidden md:flex items-end justify-center gap-4">
            {podiumWinners.map(renderPodiumCard)}
          </div>
          <motion.div
            className="md:hidden grid grid-cols-1 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {hackgear2.map((winner, index) => (
              <motion.div
                key={winner.teamName ?? index}
                variants={itemVariants}
              >
                {renderWinnerCard(winner, index)}
              </motion.div>
            ))}
          </motion.div>
        </>
      )}

      {/* ── Bottom CTA strip ─────────────────────────────────────────────── */}
      <motion.div
        className="mt-16 rounded-3xl border border-white/8 bg-gradient-to-r from-cyan-950/50 via-slate-900/60 to-blue-950/50 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-sm"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55 }}
      >
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/70 mb-1">
            What's Next
          </p>
          <h3 className="text-xl font-bold text-white">
            Hack Gear 3.0 is on the horizon.
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Stay in the loop — follow Nova Coders for the earliest updates.
          </p>
        </div>
        <a
          href="https://www.instagram.com/nova_coders_007/"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 shadow-lg shadow-cyan-900/40"
        >
          Stay Updated <Zap className="w-4 h-4" />
        </a>
      </motion.div>
    </section>
  );
};

export default HackGear2;
