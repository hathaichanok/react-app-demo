import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/users': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users/, '/users'), // Optional rewrite
      },
      '/posts': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/posts/, '/posts'), // Optional rewrite
      },
    },
  },
})
