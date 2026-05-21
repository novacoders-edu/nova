import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** Vite 7 turns <link rel="modulepreload" href="/src/..."> into data:text/jsx — breaks production */
function stripSrcModulepreload() {
  return {
    name: "strip-src-modulepreload",
    enforce: "pre",
    transformIndexHtml(html) {
      return html.replace(
        /<link[^>]*rel=["']modulepreload["'][^>]*href=["']\/src\/[^"']*["'][^>]*>\s*/gi,
        ""
      );
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [stripSrcModulepreload(), react()],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Three.js + postprocessing — only loaded on home page for Hyperspeed
          if (id.includes('node_modules/three') || id.includes('node_modules/postprocessing')) {
            return 'three';
          }
          // React + react-redux must share one chunk (avoids "Children" init errors)
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-redux/') ||
            id.includes('node_modules/scheduler/')
          ) {
            return 'vendor';
          }
          // Framer Motion
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion';
          }
          // Lenis smooth scroll
          if (id.includes('node_modules/lenis')) {
            return 'lenis';
          }
          // Icon libraries
          if (id.includes('node_modules/react-icons') || id.includes('node_modules/lucide-react')) {
            return 'icons';
          }
          // Redux toolkit (not react-redux — that stays in vendor)
          if (
            id.includes('node_modules/@reduxjs') ||
            id.includes('node_modules/redux/')
          ) {
            return 'redux';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    cssMinify: true,
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['framer-motion', 'react-hook-form'],
    exclude: ['three', 'postprocessing'],
  },
});
