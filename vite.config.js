import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/',
  
  // Configure CSS Modules
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    }
  },
  
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/'),
      '@assets': resolve(__dirname, 'src/assets/'),
      '@img': resolve(__dirname, 'src/assets/img/')
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
  
  build: {
    outDir: 'dist',
    sourcemap: true,
    assetsDir: 'assets',
    cssCodeSplit: false,
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
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        manualChunks: {
          vendor: [
            'bootstrap',
            'aos',
            'typed.js',
            'glightbox',
            'isotope-layout',
            'imagesloaded',
            'swiper'
          ]
        }
      }
    }
  }
}) 