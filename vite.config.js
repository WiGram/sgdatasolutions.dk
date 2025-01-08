import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        'projects/regulatory-reporting': 'projects/regulatory-reporting/index.html'
      }
    },
    outDir: 'dist',
    assetsDir: 'assets'
  },
  preview: {
    open: true
  }
}) 