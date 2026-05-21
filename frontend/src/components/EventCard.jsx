import React, { useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Calendar } from "lucide-react";

const statusConfig = {
  upcoming: {
    label: "Upcoming",
    classes: "bg-yellow-400/15 text-yellow-300 border-yellow-400/40",
    glow: "group-hover:shadow-[0_0_40px_rgba(234,179,8,0.2)]",
    accent: "from-yellow-500/20 to-transparent",
    dot: "bg-yellow-400 animate-pulse",
  },
  ongoing: {
    label: "Live Now",
    classes: "bg-blue-400/15 text-blue-300 border-blue-400/40",
    glow: "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]",
    accent: "from-blue-500/20 to-transparent",
    dot: "bg-blue-400 animate-pulse",
  },
  complete: {
    label: "Completed",
    classes: "bg-emerald-400/15 text-emerald-300 border-emerald-400/40",
    glow: "group-hover:shadow-[0_0_40px_rgba(52,211,153,0.2)]",
    accent: "from-cyan-500/20 to-transparent",
    dot: "bg-emerald-400",
  },
};

const EventCard = ({ title, date, description, image, status }) => {
  const [imgError, setImgError] = useState(false);
  const key = status?.toLowerCase() || "complete";
  const cfg = statusConfig[key] || statusConfig.complete;

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`group relative bg-slate-900/60 backdrop-blur-md rounded-2xl overflow-hidden border border-white/8 hover:border-cyan-400/40 transition-all duration-500 ${cfg.glow}`}
      >
        {/* top accent line */}
        <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${cfg.accent}`} />

        {/* image */}
        <div className="relative overflow-hidden h-52">
          {!imgError ? (
            <img
              src={image}
              alt={title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
              <span className="text-4xl opacity-30" aria-hidden="true">🎯</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

          {/* status badge */}
          <div className="absolute top-3 right-3">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border backdrop-blur-sm ${cfg.classes}`}>
              <span className={`size-1.5 rounded-full ${cfg.dot}`} aria-hidden="true" />
              {cfg.label}
            </span>
          </div>
        </div>

        {/* content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300 mb-3 leading-snug">
            {title}
          </h3>

          <div className="flex items-center gap-1.5 text-cyan-400/80 text-xs font-medium mb-3">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
            <span>{date}</span>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{description}</p>
        </div>
      </m.div>
    </LazyMotion>
  );
};

export default EventCard;
