import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),pages()],
  base: "/chatapp/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
