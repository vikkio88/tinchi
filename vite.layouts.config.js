import { defineConfig } from "vite";

import { watchAndRun } from "vite-plugin-watch-and-run";
import path from "node:path";

export default defineConfig({
  server: {
    open: "./test/layouts/",
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
