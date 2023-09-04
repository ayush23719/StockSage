import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Add your Tiingo API token here
const tiingoApiToken = '1d7b20305873aaacd13fb46eaef129aede7cf626';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: '/',

  },
});
