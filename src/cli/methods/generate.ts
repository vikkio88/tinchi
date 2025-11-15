import fs from "node:fs";
import path from "node:path";

import {
  getCssFilePath,
  TINCHI_CONFIG_FILENAME,
  type TinchiConfig,
} from "../../assets/config";
import { HEAD_VARS } from "../../assets/vars";
import { hasForceParameter, loadTinchiConfig } from "../../helpers/cli";
import { c } from "../../helpers/colours";
import { currentScriptDir } from "../../helpers/dir";
import { isDev } from "../../helpers/env";
import { templateInterpolator } from "../../helpers/files";
import { minifyCSS } from "../../helpers/minify";
import { getVersion } from "./version";

export function generate(args: string[]) {
  const force = hasForceParameter(args);
  const configPath = path.resolve(".", TINCHI_CONFIG_FILENAME);
  if (!fs.existsSync(configPath)) {
    console.error(
      `❌ ${c.red(`No ${TINCHI_CONFIG_FILENAME} file found`)}.
Run ${c.i(`\`tinchi init\``)} to initialize the config file first.`,
    );
    process.exit(1);
  }

  const tinchiRc = loadTinchiConfig();
  if (fs.existsSync(tinchiRc.outputPath) && !force) {
    console.error(
      `${c.red(`⚠️  Css output \`${tinchiRc.outputPath}\` already exists.`)}
      ${c.i("Use --force to overwrite.")}`,
    );
    process.exit(1);
  }
  //TODO: check if folder exists and in case create it?
  let cssResult = "";
  const cssBaseFolder = getCssFolder();

  if (tinchiRc.config.head) {
    cssResult += head(cssBaseFolder);
  }

  cssResult += theme(tinchiRc, cssBaseFolder);
  cssResult += colours(tinchiRc, cssBaseFolder);
  cssResult += vars(tinchiRc, cssBaseFolder);
  cssResult += overrides(tinchiRc, cssBaseFolder);
  cssResult += main(tinchiRc, cssBaseFolder);
  cssResult += components(tinchiRc, cssBaseFolder);
  cssResult += animations(tinchiRc, cssBaseFolder);
  cssResult += debug(tinchiRc, cssBaseFolder);

  if (tinchiRc.config.minify) {
    cssResult = minifyCSS(cssResult);
  }

  const outDir = path.dirname(tinchiRc.outputPath);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(tinchiRc.outputPath, cssResult);
  console.log(
    `${c.green("✅ Tinchi css created in: ")}
    ${c.b(tinchiRc.outputPath)}

  don't forget to add it to your ${c.b(".gitignore")}`,
  );
}

function getCssFolder() {
  const __dirname = currentScriptDir();
  return isDev()
    ? path.join(__dirname, "..", "..", "css")
    : // after build it will be on dist/ and package is on .
      path.join(__dirname, "..", "css");
}

function head(cssBaseFolder: string) {
  const head = f(getCssFilePath(cssBaseFolder, "head"));
  return templateInterpolator(head, { [HEAD_VARS.version]: getVersion() });
}

function theme(tinchiRc: TinchiConfig, cssBaseFolder: string) {
  const themeFile =
    tinchiRc.config.colorScheme === "both"
      ? "themeBoth"
      : tinchiRc.config.colorScheme === "dark"
        ? "themeDark"
        : "themeLight";
  const template = f(getCssFilePath(cssBaseFolder, themeFile));
  return templateInterpolator(template, tinchiRc.colors);
}

function colours(tinchiRc: TinchiConfig, cssBaseFolder: string) {
  if (!tinchiRc.components.colors) return "";
  const template = f(getCssFilePath(cssBaseFolder, "colors"));
  return templateInterpolator(template, tinchiRc.colors);
}

function vars(tinchiRc: TinchiConfig, cssBaseFolder: string) {
  const template = f(getCssFilePath(cssBaseFolder, "vars"));
  return templateInterpolator(template, tinchiRc.vars);
}

function overrides(tinchiRc: TinchiConfig, cssBaseFolder: string) {
  const template = f(getCssFilePath(cssBaseFolder, "overrides"));
  return templateInterpolator(template, tinchiRc.vars);
}

function main(tinchiRc: TinchiConfig, cssBaseFolder: string) {
  return f(getCssFilePath(cssBaseFolder, "main"));
}

function components(tinchiRc: TinchiConfig, cssBaseFolder: string) {
  if (!tinchiRc.components.components) return "";
  return f(getCssFilePath(cssBaseFolder, "components"));
}
function animations(tinchiRc: TinchiConfig, cssBaseFolder: string) {
  if (!tinchiRc.components.animations) return "";
  return f(getCssFilePath(cssBaseFolder, "animations"));
}
function debug(tinchiRc: TinchiConfig, cssBaseFolder: string) {
  if (!tinchiRc.components.debug) return "";
  return f(getCssFilePath(cssBaseFolder, "debug"));
}

function f(path: string) {
  return fs.readFileSync(path).toString();
}
