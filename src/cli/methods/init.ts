import fs from "node:fs";
import path from "node:path";

import { DEFAULT_CONFIG, TINCHI_CONFIG_FILENAME } from "../../assets/config";
import { c } from "../../helpers/colours";

export function init(args: string[]) {
  const force = args.includes("-f") || args.includes("--force");
  const configPath = path.resolve(".", TINCHI_CONFIG_FILENAME);

  if (fs.existsSync(configPath) && !force) {
    console.error(
      `${c.red("⚠️  Project already initialized.")}
      ${c.i("Use --force to overwrite.")}\n${c.b("File:")} ${configPath}`
    );
    process.exit(1);
  }

  fs.writeFileSync(configPath, JSON.stringify(DEFAULT_CONFIG, null, 2));
  console.log(`${c.green("✅ Tinchi config initialized in:")}
  ${c.b(configPath)}`);
  console.log(
    `Run ${c.b("`tinchi generate`")} ${c.i("to generate your css file.")}`
  );
}
