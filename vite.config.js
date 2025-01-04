import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/',
  
  // Configure CSS Modules
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    },
    preprocessorOptions: {
      css: {
        importPrefix: '~'
      }
    }
  },
  
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  
  plugins: [
    {
      name: 'dynamic-html',
      transform(code, id) {
        if (id.endsWith('.html?raw')) {
          return {
            // Transform @img paths in dynamically loaded HTML
            code: code.replace(
              /@img\//g, 
              // Use relative path from components to assets
              '/assets/'
            ),
            map: null
          }
        }
      }
    }
  ],
  
  optimizeDeps: {
    include: [
      'bootstrap',
      'aos',
      'typed.js',
      'glightbox',
      'isotope-layout',
      'imagesloaded',
      'swiper'
    ]
  },
  
  build: {
    target: ['es2015'],
    cssTarget: ['chrome87', 'firefox78', 'safari14', 'edge88'],
    cssCodeSplit: false,
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.source && typeof assetInfo.source === 'string') {
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.source)) {
              return `assets/img/[name]-[hash][extname]`;
            }
            if (/\.css$/i.test(assetInfo.source)) {
              return `assets/css/[name]-[hash][extname]`;
            }
          }
          return `assets/[ext]/[name]-[hash][extname]`;
        }
      }
    }
  }
}) 