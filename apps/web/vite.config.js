// apps/web/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://34.222.46.248',
        changeOrigin: true,
        secure: false // Only for development
      }
    }
  }
})