import React, { useContext, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles, CalendarDays, Trophy, Zap } from "lucide-react";
import { DataContext } from "../context/DataProvider";
import EventCard from "../components/EventCard";

const FILTERS = ["All", "Upcoming", "Ongoing", "Complete"];

const stats = [
  { icon: CalendarDays, label: "Events Hosted", value: "4+" },
  { icon: Trophy, label: "Hackathons", value: "2" },
  { icon: Zap, label: "Participants", value: "500+" },
];

export default function Events() {
  const { events } = useContext(DataContext);
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return events;
    return events.filter(
      (e) => e.status?.toLowerCase() === active.toLowerCase()
    );
  }, [events, active]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* ── Hero Header ── */}
      <div className="relative overflow-hidden pt-28 pb-16 px-6">
        {/* background glow blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/25 rounded-full text-cyan-300 text-sm font-medium mb-5"
          >
            <Sparkles className="w-4 h-4" />
            Nova Coders Events
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent leading-tight mb-4"
          >
            Where Ideas Come Alive
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg max-w-xl mx-auto"
          >
            Hackathons, workshops, seminars — every event is a chance to build,
            learn, and connect with the community.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-6"
          >
            {stats.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl px-5 py-3"
              >
                <div className="p-2 bg-cyan-500/15 rounded-lg">
                  <Icon className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold text-white leading-none">{value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Filter Tabs ── */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                active === f
                  ? "bg-cyan-500/20 border-cyan-400/60 text-cyan-300"
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-white/25 hover:text-white"
              }`}
            >
              {f}
              {f === "All" && (
                <span className="ml-1.5 text-xs opacity-60">({events.length})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Event Grid ── */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No {active.toLowerCase()} events right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filtered.map((event, i) => (
              <EventCard key={i} {...event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
