import path from "node:path";
import { getVersion } from "../cli/methods/version";
import { isDev } from "../helpers/env";
import {
  DEFAULT_COLOURS,
  DEFAULT_COMPONENTS,
  DEFAULT_OUTPUT_PATH,
  DEFAULT_VARS,
} from "./vars";

export type TinchiConfig = {
  /** version */
  version: string;
  /** output path */
  outputPath: string;
  config: {
    /** Whether you want to include the Header with info about the tinchi version */
    head: boolean;
    /** Whether you want to minify the css */
    minify: boolean;
    /** Whether you want the css to support prefer-color-scheme */
    colorScheme: "both" | "dark" | "light";
  };

  /** config for the vars */
  vars: Record<string, string>;
  /** config for the default colours */
  colors: Record<keyof typeof DEFAULT_COLOURS, string>;
  /** Whether you want to include or exclude certain components */
  components: Record<keyof typeof DEFAULT_COMPONENTS, boolean>;
};

export const DEFAULT_CONFIG: TinchiConfig = {
  version: getVersion(),
  outputPath: DEFAULT_OUTPUT_PATH,
  config: {
    head: true,
    minify: false,
    colorScheme: "both",
  },
  vars: DEFAULT_VARS,
  colors: DEFAULT_COLOURS,
  components: DEFAULT_COMPONENTS,
};

export const TINCHI_CONFIG_FILENAME = ".tinchirc";

export const CSS_FILES = {
  head: {
    path: "head.css",
    isTemplate: true,
  },
  themeBoth: {
    path: "themeBoth.css",
    isTemplate: true,
  },
  themeDark: {
    path: "themeDark.css",
    isTemplate: true,
  },
  themeLight: {
    path: "themeLight.css",
    isTemplate: true,
  },
  colors: {
    path: "colors.css",
    isTemplate: true,
  },
  vars: {
    path: "vars.css",
    isTemplate: true,
  },
  overrides: {
    path: "overrides.css",
    isTemplate: false,
  },
  main: {
    path: "main.css",
    isTemplate: false,
  },
  components: {
    path: "components.css",
    isTemplate: false,
  },
  animations: {
    path: "animations.css",
    isTemplate: false,
  },
  debug: {
    path: "debug.css",
    isTemplate: false,
  },
};

export function getCssFilePath(
  assetsFolders: string,
  file: keyof typeof CSS_FILES,
) {
  const f = CSS_FILES[file];
  return path.join(assetsFolders, f.isTemplate ? `${f.path}.tinchi` : f.path);
}

const ASSETS_FOLDER = "assets";
export function getAssetsFolder(currentDir: string) {
  return isDev()
    ? path.join(currentDir, "..", "..", ASSETS_FOLDER)
    : // after build it will be on dist/ and package is on .
      path.join(currentDir, "..", ASSETS_FOLDER);
}
