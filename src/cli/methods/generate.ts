import fs from "node:fs";
import path from "node:path";

import {
  DEFAULT_CONFIG,
  TINCHI_CONFIG_FILENAME,
  type TinchiConfig,
} from "../../assets/config";
import { c } from "../../helpers/colours";

export function generate() {
  const configPath = path.resolve(".", TINCHI_CONFIG_FILENAME);
  if (!fs.existsSync(configPath)) {
    console.error(
      `❌ ${c.red(`No ${TINCHI_CONFIG_FILENAME} file found`)}.
Run ${c.i(`\`tinchi init\``)} to initialize the config file first.`
    );
    process.exit(1);
  }

  const config = loadConfig();

  console.log(
    `${c.green("✅ Tinchi css created in: ")}
    ${c.b(config.outputPath)}`
  );
}

function loadConfig(): TinchiConfig {
  return DEFAULT_CONFIG;
}
