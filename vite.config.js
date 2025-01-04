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
      name: 'html-transform',
      transform(code, id) {
        if (id.endsWith('.html?raw')) {
          return {
            code: `export default ${JSON.stringify(code)}`,
            map: null
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
