import fs from "node:fs";
import path from "node:path";

import { DEFAULT_CONFIG, TINCHI_CONFIG_FILENAME } from "../../assets/config";
import { c } from "../../helpers/colours";
import { extractNonForceParams, hasForceParameter } from "../../helpers/cli";

export function init(args: string[]) {
  const force = hasForceParameter(args);
  const outputPath = extractNonForceParams(args, force).pop();
  const configPath = path.resolve(".", TINCHI_CONFIG_FILENAME);

  if (fs.existsSync(configPath) && !force) {
    console.error(
      `${c.red("⚠️  TinchiRc already initialized.")}
      ${c.i("Use --force to overwrite.")}\n${c.b("File:")} ${configPath}`
    );
    process.exit(1);
  }

  const configToWrite = {
    ...DEFAULT_CONFIG,
    outputPath: outputPath || DEFAULT_CONFIG.outputPath,
  };

  fs.writeFileSync(configPath, JSON.stringify(configToWrite, null, 2));
  console.log(`${c.green("✅ Tinchi config initialized in:")}
  ${c.b(configPath)}`);
  console.log(
    `Run ${c.b("`tinchi generate`")} ${c.i("to generate your css file.")}`
  );
}
