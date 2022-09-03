import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  optimizeDeps: {
    exclude: ['data']
  },
  plugins: [react({ include: ['src'] })],
  server: {
    watch: {
      ignored: ['**/coverage/**']
    }
  }
})
