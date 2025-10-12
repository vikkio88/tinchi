const result = await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  target: "node",
  minify: true,
});

if (!result.success) {
  console.error("Build failed for tinchi:");
  for (const log of result.logs) {
    console.error(log.message);
  }
  throw new AggregateError(result.logs, "Build failed.");
}

const fs = await import("node:fs/promises");
const path = "./dist/index.js";

let code = await fs.readFile(path, "utf8");
if (!code.startsWith("#!/usr/bin/env node")) {
  code = `#!/usr/bin/env node\n${code}`;
  await fs.writeFile(path, code, "utf8");
}

console.log("tinchi build done.");
