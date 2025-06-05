import { defineConfig } from "vite";

import { watchAndRun } from "vite-plugin-watch-and-run";
import path from "node:path";

export default defineConfig({
  root: "test/example",
  build: {
    outDir: "dist",
  },
  server: {
    open: "./test/example/",
  },
  plugins: [
    watchAndRun([
      {
        name: "Generating test assets.",
        run: "npm run g && cp test/example/assets/style.css test/layouts/assets/style.css",
        watch: path.resolve("src/**/*.(css|tinchi)"),
      },
    ]),
  ],
});
