import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'lodash.debounce': 'lodash-es/debounce',
    },
    dedupe: ['react', 'react-dom', 'lodash', 'lodash-es'],
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'gsap',
      'lenis',
      'framer-motion',
      'clsx',
      'tailwind-merge',
      'lodash-es',
    ],
    exclude: [
      // Exclude Spline from pre-bundling - it's loaded dynamically
      '@splinetool/react-spline',
      '@splinetool/runtime',
    ],
  },
  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Split core React dependencies
            if (id.includes('react-dom') || id.includes('scheduler')) {
              return 'vendor-react-dom';
            }
            if (id.includes('react')) {
              return 'vendor-react-core';
            }
            // Spline gets its own chunk - loaded lazily
            if (id.includes('@splinetool')) {
              return 'vendor-spline';
            }
            // GSAP and animation libraries
            if (id.includes('gsap')) {
              return 'vendor-gsap';
            }
            // Lenis smooth scroll
            if (id.includes('lenis')) {
              return 'vendor-lenis';
            }
            // Framer motion
            if (id.includes('framer-motion')) {
              return 'vendor-framer';
            }
            // Utility libraries
            if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('lodash')) {
              return 'vendor-utils';
            }
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 600,
    reportCompressedSize: true,
  },
})
