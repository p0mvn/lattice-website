import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  // Project Pages site serves from https://p0mvn.github.io/lattice-website/ —
  // all built asset URLs must carry the repo prefix.
  base: "/lattice-website/",
  plugins: [react(), tailwindcss()],
});
