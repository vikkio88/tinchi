import fs from "node:fs";
import path from "node:path";
import { TINCHI_CONFIG_FILENAME, type TinchiConfig } from "../assets/config";
import { c } from "./colours";

export function hasForceParameter(args: string[]) {
  return args.includes("-f") || args.includes("--force");
}

export function extractNonForceParams(args: string[], forcing = false) {
  if (forcing || hasForceParameter(args)) {
    return args.filter((a) => a !== "-f" && a !== "--force");
  }

  return args;
}

export function loadTinchiConfig(): TinchiConfig {
  try {
    const config = JSON.parse(
      fs.readFileSync(path.join(".", TINCHI_CONFIG_FILENAME)).toString()
    ) as TinchiConfig;

    //todo: maybe add some validation to see if the content is valid or merge with default

    return config;
  } catch (err) {
    console.error(
      `${c.red("❌ Failed to parse")} ${c.b(TINCHI_CONFIG_FILENAME)} ${c.red(
        "config file."
      )}
      Check if it is a valid json.
      `
    );
    process.exit(1);
  }
}
