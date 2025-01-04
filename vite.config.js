import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // Set base URL for GitHub Pages
  base: '/',  // Your actual repo name

  // CSS configuration
  css: {
    modules: {
      localsConvention: 'camelCase'
    },
    preprocessorOptions: {
      css: {
        // Any global CSS configurations
        charset: false  // Avoid warnings about '@charset' being required
      }
    }
  },

  // Resolve alias configuration for simplifying imports
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },

  // Plugins for additional functionality (e.g., custom HTML transformations)
  plugins: [
    {
      name: 'dynamic-html',
      transform(code, id) {
        if (id.endsWith('.html?raw')) {
          // This plugin transforms image paths in dynamically loaded HTML
          return {
            code: code.replace(/@img\//g, '/assets/'), // Adjust the path as per your needs
            map: null,
          }
        }
      }
    }
  ],

  // Optimize dependencies for production builds
  optimizeDeps: {
    include: [
      'bootstrap',
      'aos',
      'typed.js',
      'glightbox',
      'swiper',
      // Include any other third-party libraries you're using
    ]
  },

  // Build configuration for production
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: false,
    
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js'
      }
    }
  }
})
