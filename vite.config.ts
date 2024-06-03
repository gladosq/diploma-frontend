import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const mode = process.env.__APP_BASE_URL__;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss"; @import "@/styles/utils.scss";`
      }
    }
  },
  define: {
    __APP_BASE_URL__: `"${process.env.APP_BASE_URL}"`,
  },
  mode: mode
});
