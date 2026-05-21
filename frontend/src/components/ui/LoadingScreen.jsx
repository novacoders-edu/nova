import React, { useReducer, useEffect, useMemo } from "react";
import logo from "/logo.png";

// Combine related loading state into one reducer — avoids 8 cascading setStates
const initialState = { progress: 0, loadingText: "Initializing..." };

function loadingReducer(state, action) {
  switch (action.type) {
    case "SET_PROGRESS":
      return { ...state, progress: action.payload };
    case "SET_TEXT":
      return { ...state, loadingText: action.payload };
    default:
      return state;
  }
}

// Stable particle data — computed once, not on every render
// Fixes: Math.random() in JSX (hydration mismatch) and array-index-as-key
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: ((i * 37 + 13) % 97).toFixed(1),   // deterministic pseudo-random spread
  top:  ((i * 53 + 7)  % 93).toFixed(1),
  delay: ((i * 0.31) % 5).toFixed(2),
  duration: (2 + (i * 0.17) % 3).toFixed(2),
}));

export default function LoadingScreen() {
  const [state, dispatch] = useReducer(loadingReducer, initialState);
  const { progress, loadingText } = state;

  // Preload Hyperspeed chunk after first paint (avoids competing with initial bundle)
  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      import("../Hyperspeed").catch(() => {});
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      dispatch((prev) => ({
        type: "SET_PROGRESS",
        payload: prev.progress >= 100 ? 100 : prev.progress + 2,
      }));
    }, 100);

    const textTimeouts = [
      setTimeout(() => dispatch({ type: "SET_TEXT", payload: "Booting up Nova Coders..." }), 500),
      setTimeout(() => dispatch({ type: "SET_TEXT", payload: "Connecting innovators..." }), 1500),
      setTimeout(() => dispatch({ type: "SET_TEXT", payload: "Welcome to Nova Coders!" }), 2500),
    ];

    return () => {
      clearInterval(progressInterval);
      textTimeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      <style>{`
        @keyframes spin-slow    { from { transform: rotate(0deg); }   to { transform: rotate(360deg); } }
        @keyframes spin-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes pulse-scale  { 0%,100% { transform: scale(1); }   50% { transform: scale(1.1); } }
        @keyframes glow-pulse   {
          0%,100% { box-shadow: 0 0 15px rgba(0,255,255,0.8); }
          50%     { box-shadow: 0 0 25px rgba(0,255,255,1), 0 0 35px rgba(0,255,255,0.6); }
        }
        @keyframes text-fade    { 0%,100% { opacity: 1; } 50% { opacity: 0.7; } }
        .orbit-outer  { animation: spin-slow 5s linear infinite, glow-pulse 2s ease-in-out infinite; }
        .orbit-inner  { animation: spin-reverse 5s linear infinite; }
        .logo-pulse   { animation: pulse-scale 2s ease-in-out infinite; }
        .loading-text { animation: text-fade 1.5s ease-in-out infinite; }
      `}</style>

      <div className="relative flex flex-col items-center justify-center">
        {/* Outer Orbit Ring — size-64 shorthand (Tailwind v3.4+) */}
        <div className="absolute size-64 border-4 border-transparent border-t-cyan-400 border-l-cyan-400 rounded-full orbit-outer" />

        {/* Inner Orbit Ring */}
        <div
          className="absolute size-48 border-4 border-transparent border-b-cyan-500 border-r-cyan-500 rounded-full orbit-inner"
          style={{ boxShadow: "0 0 10px rgba(0,255,255,0.6)" }}
        />

        {/* Center Logo */}
        <div className="w-40 logo-pulse flex items-center justify-center z-10">
          <img src={logo} alt="Nova Coders logo" className="max-w-full max-h-full" />
        </div>
      </div>

      {/* Progress Section */}
      <div className="mt-16 flex flex-col items-center space-y-4">
        <div className="loading-text text-cyan-400 text-lg font-medium tracking-wide">
          {loadingText}
        </div>

        <div className="w-80 h-2 bg-gray-800 rounded-full overflow-hidden border border-cyan-500/30">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          >
            <div className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          </div>
        </div>

        <div className="text-cyan-300 text-sm font-mono">{progress}%</div>
      </div>

      {/* Background Particles — stable keys + positions, no Math.random() in render */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute size-1 bg-cyan-400 rounded-full opacity-30"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDelay: `${p.delay}s`,
              animation: `pulse-scale ${p.duration}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
