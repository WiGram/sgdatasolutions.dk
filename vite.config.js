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
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  }
}) 