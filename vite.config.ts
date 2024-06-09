/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // ...
  },
  resolve: {
    alias: {
      '#': path.resolve(__dirname, './src'),
      '#components': path.resolve(__dirname, './src/components'),
      '#pages': path.resolve(__dirname, './src/pages'),
      '#hooks': path.resolve(__dirname, './src/hooks'),
      '#utils': path.resolve(__dirname, './src/utils'),
      '#@types': path.resolve(__dirname, './src/@types'),
      '#assets': path.resolve(__dirname, './src/assets'),
      '#services': path.resolve(__dirname, './src/services'),
      '#routes': path.resolve(__dirname, './src/routes'),
      '#context': path.resolve(__dirname, './src/context'),
      '#helpers': path.resolve(__dirname, './src/helpers'),
    },
  },
});
