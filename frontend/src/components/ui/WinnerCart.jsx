import { motion } from "framer-motion";
import { Trophy, ExternalLink } from "lucide-react";

const RANKS = {
  "1st": { g: "from-yellow-400 to-orange-500", b: "border-yellow-500/30" },
  "2nd": { g: "from-slate-300 to-slate-400", b: "border-slate-400/30" },
  "3rd": { g: "from-orange-400 to-amber-500", b: "border-orange-500/30" },
};
const DEFAULT_RANK = {
  g: "from-cyan-400 to-blue-500",
  b: "border-cyan-500/30",
};

const getRank = (prize = "") =>
  RANKS[["1st", "2nd", "3rd"].find((r) => prize.includes(r))] ?? DEFAULT_RANK;

export default function WinnerCart({
  src,
  imageAlt,
  teamName,
  projectTitle,
  prize,
  tag,
  metrics = [],
  button,
  className = "",
}) {
  const { g, b } = getRank(prize);

  return (
    <motion.article
      className={`${className} h-full`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45 }}
    >
      <div
        className={`group relative flex flex-col h-full rounded-2xl overflow-hidden bg-slate-900/70 backdrop-blur-md border ${b} shadow-xl hover:bg-slate-900/90 transition-colors duration-300`}
      >
        {/* rank accent line */}
        <div
          className={`absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r ${g} opacity-70`}
        />

        {/* image */}
        <div className="relative h-36 shrink-0 overflow-hidden bg-slate-950">
          {src && (
            <img
              src={src}
              alt={imageAlt || teamName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        </div>

        {/* body */}
        <div className="flex flex-col flex-grow p-4 gap-2.5">
          {/* prize + tag */}
          <div className="flex items-center justify-between gap-2">
            <span
              className={`flex items-center gap-1.5 text-xs font-semibold bg-gradient-to-r ${g} bg-clip-text text-transparent`}
            >
              <Trophy className="w-3.5 h-3.5 text-yellow-400 shrink-0" />{" "}
              {prize}
            </span>
            {tag && (
              <span className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-widest border border-white/10 bg-white/5 text-white/50">
                {tag}
              </span>
            )}
          </div>

          <h3 className="text-sm font-bold text-white line-clamp-1">
            {teamName}
          </h3>
          {projectTitle && (
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {projectTitle}
            </p>
          )}

          {/* metrics */}
          {metrics.length > 0 && (
            <div
              className={`grid gap-1.5 mt-auto ${metrics.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}
            >
              {metrics.map((m, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/8 bg-slate-950/50 px-3 py-2"
                >
                  <p className="text-[9px] uppercase tracking-widest text-slate-500">
                    {m.label}
                  </p>
                  <p className="text-xs font-bold text-white mt-0.5">
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* button */}
          {button?.label && (
            <div className="pt-2 border-t border-white/8">
              {button.href ? (
                <a
                  href={button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {button.label} <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={button.onClick}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {button.label}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
