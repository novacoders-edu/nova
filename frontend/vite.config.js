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
    // Aggressive code splitting — each chunk loads only when needed
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Three.js + postprocessing — only loaded on home page for Hyperspeed
          if (id.includes('three') || id.includes('postprocessing')) {
            return 'three';
          }
          // Framer Motion — shared animation library
          if (id.includes('framer-motion')) {
            return 'framer-motion';
          }
          // Lenis smooth scroll — only used in ScrollStack
          if (id.includes('lenis')) {
            return 'lenis';
          }
          // Icon libraries — large, tree-shake into own chunk
          if (id.includes('react-icons') || id.includes('lucide-react')) {
            return 'icons';
          }
          // Redux toolkit
          if (id.includes('@reduxjs') || id.includes('react-redux')) {
            return 'redux';
          }
          // React core
          if (id.includes('react-dom') || id.includes('react/')) {
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
    // Minify CSS
    cssMinify: true,
    // Enable source maps only in dev
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['framer-motion', 'react-hook-form'],
    // Exclude heavy 3D libs from pre-bundling — they're lazy loaded
    exclude: ['three', 'postprocessing'],
  },
});
