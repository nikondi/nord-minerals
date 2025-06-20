import { defineConfig } from 'vite'
import {resolve} from 'path';
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    legacy({
      targets: ['ie >= 11']
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'resources/js/'),
    },
  },
  build: {
    rollupOptions: {
      input: resolve(__dirname, './resources/js/app.html'),
      output: {
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({names}) => {
          if (/\.(css|s[ac]ss)$/.test(names[0] ?? '')) {
            return 'assets/css/[name]-[hash][extname]'
          }
          // Остальные ассеты (например, изображения)
          return 'assets/static/[name]-[hash][extname]'
        }
      }
    },
    outDir: resolve(__dirname, 'dist'),
  }
})