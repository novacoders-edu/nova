import React, { memo } from "react";

// Pure CSS animations — zero JS overhead, GPU-composited only
// Replaces the previous 63-element framer-motion version
const AnimatedBackground = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    {/* Static gradient orbs — animated via CSS keyframes, not JS */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-[drift1_25s_ease-in-out_infinite]" />
    <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-[drift2_20s_ease-in-out_infinite]" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl animate-[drift3_30s_linear_infinite]" />

    {/* Subtle grid overlay — pure CSS, no JS */}
    <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage:
          "linear-gradient(rgba(34,211,238,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.15) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }}
    />

    <style>{`
      @keyframes drift1 {
        0%,100% { transform: translate(0,0) scale(1); }
        33%      { transform: translate(60px,-40px) scale(1.1); }
        66%      { transform: translate(-40px,60px) scale(0.9); }
      }
      @keyframes drift2 {
        0%,100% { transform: translate(0,0) scale(1); }
        50%      { transform: translate(-60px,50px) scale(1.15); }
      }
      @keyframes drift3 {
        0%   { transform: translate(-50%,-50%) rotate(0deg) scale(1); }
        100% { transform: translate(-50%,-50%) rotate(360deg) scale(1); }
      }
    `}</style>
  </div>
));

AnimatedBackground.displayName = "AnimatedBackground";
export default AnimatedBackground;
