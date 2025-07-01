import { defineConfig } from "vite";
import { command } from "vite-plugin-command";

export default defineConfig({
  root: "test/example",
  build: {
    outDir: "dist",
  },
  server: {
    open: "./test/example/",
  },
  plugins: [
    command([
      {
        run: "npm run g",
        pattern: ["./src/**/*.{css,tinchi}"],
      },
    ]),
  ],
});
