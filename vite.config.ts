import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vercel serves from the domain root. For a GitHub Pages deploy use:
//   npm run build -- --base=/portfolio/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
