import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  // Served from the apex custom domain (latticepq.com) — assets resolve
  // from the domain root. The router's stripBase/withBase helpers
  // no-op when the base is "/".
  base: "/",
  plugins: [react(), tailwindcss()],
});
