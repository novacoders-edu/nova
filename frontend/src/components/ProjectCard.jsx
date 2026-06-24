import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCode, FaUsers } from "react-icons/fa";
import LazyImage from "./ui/LazyImage";

const statusStyles = {
  "in-progress": "bg-yellow-400/20 text-yellow-300 border-yellow-400/50",
  completed: "bg-green-400/20 text-green-300 border-green-400/50",
  planning: "bg-blue-400/20 text-blue-300 border-blue-400/50",
};

const categoryStyles = {
  web: "bg-cyan-500/20 text-cyan-300",
  mobile: "bg-purple-500/20 text-purple-300",
  "ai/ml": "bg-pink-500/20 text-pink-300",
  blockchain: "bg-orange-500/20 text-orange-300",
};

const ProjectCard = memo(({
  title,
  description,
  image,
  technologies,
  githubUrl,
  liveUrl,
  category,
  teamSize,
  status = "completed",
}) => {
  const [imgError, setImgError] = useState(false);

  const statusClass =
    statusStyles[status?.toLowerCase()] ||
    "bg-gray-400/20 text-gray-300 border-gray-400/50";
  const categoryClass =
    categoryStyles[category?.toLowerCase()] || "bg-gray-500/20 text-gray-300";

  return (
    <motion.div
      className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_35px_rgba(59,130,246,0.25)] group flex flex-col h-full"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* shimmer overlay on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-400/5 via-transparent to-blue-600/5 rounded-2xl" />

      {/* ── Image ─────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden h-48 flex-shrink-0">
        {!imgError ? (
          <LazyImage
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            <FaCode className="text-4xl text-slate-600" />
          </div>
        )}

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* status + category badges */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full border backdrop-blur-sm ${statusClass}`}
          >
            {status}
          </span>
          {category && (
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm ${categoryClass}`}
            >
              {category.toUpperCase()}
            </span>
          )}
        </div>

        {/* quick-action buttons (appear on hover) */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source code"
              className="p-2 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 hover:text-cyan-400 transition-colors"
            >
              <FaGithub className="w-4 h-4" />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View live demo"
              className="p-2 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 hover:text-cyan-400 transition-colors"
            >
              <FaExternalLinkAlt className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="p-6 flex flex-col flex-1">
        {/* title + team size */}
        <div className="flex justify-between items-start mb-3 gap-2">
          <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 leading-snug flex-1">
            {title}
          </h3>
          {teamSize && (
            <div className="flex items-center gap-1 text-gray-400 text-xs flex-shrink-0 mt-0.5">
              <FaUsers className="w-3 h-3" />
              <span>{teamSize}</span>
            </div>
          )}
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
          {description}
        </p>

        {/* tech stack */}
        {technologies && technologies.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center gap-1.5 mb-2">
              <FaCode className="w-3 h-3 text-cyan-400" />
              <span className="text-xs text-gray-500 font-medium">Stack</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {technologies.slice(0, 4).map((tech, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-0.5 bg-cyan-500/15 text-cyan-300 rounded-full border border-cyan-500/25"
                >
                  {tech}
                </span>
              ))}
              {technologies.length > 4 && (
                <span className="text-xs px-2.5 py-0.5 bg-gray-500/20 text-gray-400 rounded-full border border-gray-500/25">
                  +{technologies.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* footer links */}
        <div className="flex gap-4 pt-4 border-t border-white/8 mt-auto">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <FaGithub className="w-4 h-4" />
              <span>Code</span>
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <FaExternalLinkAlt className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
          {!githubUrl && !liveUrl && (
            <span className="text-xs text-gray-600 italic">Links coming soon</span>
          )}
        </div>
      </div>
    </motion.div>
  );
});

export default ProjectCard;
