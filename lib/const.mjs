export const TINCHI_RC = ".tinchirc";
export const DEFAULT_OUTPUT_NAME = "public/style.css";

export const TEMPLATED_FILES = {
  "vars.css": "vars.css.tinchi",
};

export const OPTIONAL_FILES = {
  //  File name   ->  config.Name:bool in .tinchirc
  "animations.css": "animations",
  "components.css": "components",
};

export const FILES = ["vars.css", "index.css", "animations.css", "components.css"];

export const OPTIONAL_FILES_CONFIG = { animations: true, components: true };

export const DEFAULT_VARS = {
  // Colours
  DARK: "#000003",
  LIGHT: "#fbfcfe",
  DARK_FAINT: "#2e2e2e",
  LIGHT_FAINT: "#e8e9eb",
  PRIMARY: "#94FDF8",
  PRIMARY_1: "#73C2BE",
  SECONDARY: "#D0F88B",
  SECONDARY_1: "#B5F44A",
  ACCENT: "#646cff",
  ACCENT_1: "#4b52cc",
  ACCENT_FAINT: "#b0b4ff",
  DANGER: "#db3a34",
  DANGER_1: "#a12b28",
  DANGER_FAINT: "#f4a3a0",
  WARNING: "#ed9b40",
  WARNING_1: "#b37932",
  WARNING_FAINT: "#f4cf9a",
  SUCCESS: "#3bceac",
  SUCCESS_1: "#2b997e",
  SUCCESS_FAINT: "#a3e3d4",
};
