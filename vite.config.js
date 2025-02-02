import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        'projects/regulatory-reporting': 'projects/regulatory-reporting/index.html',
        'projects/performance-pay': 'projects/performance-pay/index.html',
        'projects/data-platform': 'projects/data-platform/index.html',
        'blog_posts/api-audit-logging': 'blog_posts/api-audit-logging/index.html',
        'blog_posts/netlify-supabase-setup': 'blog_posts/netlify-supabase-setup/index.html'
      }
    },
    outDir: 'dist',
    assetsDir: 'assets'
  },
  preview: {
    open: true
  }
}) 