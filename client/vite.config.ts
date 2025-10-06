import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "path";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === "production" ? "./" : "/",
  server: {
    port: 5173,
    host: "0.0.0.0",
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@shared": resolve(__dirname, "..", "shared"),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
      // ensure PostCSS receives a "from" option to avoid plugin warnings
      // some PostCSS plugins expect a source filename; Vite doesn't always provide it
      postcssOptions: {
        from: undefined,
      },
    },
    devSourcemap: false,
    preprocessorOptions: {},
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    assetsInlineLimit: 4096,
    assetsDir: "assets",
    cssCodeSplit: true,
    rollupOptions: {
      input: resolve(__dirname, "index.html"),
      output: {
        manualChunks: undefined,
      },
    },
  },
}));