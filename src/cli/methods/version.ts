import fs from "node:fs";
import { join } from "node:path";
import { c } from "../../helpers/colours";
import { isDev } from "../../helpers/env";
import { currentScriptDir } from "../../helpers/dir";

type PackageJson = {
  version: string;
};

export function getVersion(): string {
  const __dirname = currentScriptDir();
  const pathToPackageJson = isDev()
    ? join(__dirname, "..", "..", "package.json")
    : // after build it will be on dist/ and package is on .
      join(__dirname, "..", "package.json");

  try {
    const content = fs.readFileSync(pathToPackageJson, "utf8");
    const pkg = JSON.parse(content) as PackageJson;
    return pkg.version;
  } catch (err) {
    console.error(`${c.red("Failed to read package.json:")}`);
    return "unknown";
  }
}

export function version() {
  console.log(getVersion());
}
