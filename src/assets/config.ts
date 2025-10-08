import path from "node:path";
import {
  DEFAULT_COLOURS,
  DEFAULT_COMPONENTS,
  DEFAULT_OUTPUT_PATH,
} from "./vars";

export type TinchiConfig = {
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
  outputPath: DEFAULT_OUTPUT_PATH,
  config: {
    head: true,
    minify: false,
    colorScheme: "both",
  },
  vars: {},
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
  file: keyof typeof CSS_FILES
) {
  const f = CSS_FILES[file];
  return path.join(assetsFolders, f.isTemplate ? `${f.path}.tinchi` : f.path);
}
