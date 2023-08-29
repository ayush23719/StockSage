import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
// change the initial route to /
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: '/',
  },
})
