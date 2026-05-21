import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
          // Redux
          if (id.includes('node_modules/@reduxjs') || id.includes('node_modules/react-redux') || id.includes('node_modules/redux')) {
            return 'redux';
          }
          // React core — must be a single chunk, match exactly
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/') || id.includes('node_modules/scheduler')) {
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 800,
    cssMinify: true,
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['framer-motion', 'react-hook-form'],
    exclude: ['three', 'postprocessing'],
  },
});
