import { search } from "./methods/search.mjs";
import { init } from "./methods/init.mjs";
import { generate } from "./methods/generate.mjs";
import { help } from "./methods/help.mjs";
import { version } from "./methods/version.mjs";

export const METHODS = {
  generate,
  gen: generate,
  g: generate,

  init,
  i: init,

  search,
  s: search,

  help,
  h: help,

  version,
  v: version,
};
