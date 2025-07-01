import { defineConfig } from "vite";
import { command } from "vite-plugin-command";

export default defineConfig({
  server: {
    open: "./test/layouts/",
  },
  plugins: [
    command([
      {
        run: "npm run g && cp test/example/assets/style.css test/layouts/assets",
        pattern: ["./src/**/*.{css,tinchi}"],
      },
    ]),
  ],
});
