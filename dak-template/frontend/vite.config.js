import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { fileURLToPath, URL } from "node:url"

export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    port: 3400,
    proxy: {
      "/api":     "http://backend:8000",
      "/healthz": "http://backend:8000",
      "/readyz":  "http://backend:8000",
    },
  },
  resolve: {
    alias: {
      "@":  fileURLToPath(new URL("./src", import.meta.url)),
      "@ds": fileURLToPath(new URL("../../../design-system", import.meta.url)),
    },
  },
})
