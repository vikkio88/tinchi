import { C } from "./helpers.mjs";
import version from "./version.cjs";

export const HEADER = `${C.b("Tinchi")} - tinchee (Sicilian: "to paint")
  version: ${C.cG(version)}
`;

export const HELP = `${HEADER}

${C.u("Usage:")}
  ${C.b("tinchi")} ${C.i("[method]")} ${C.i("[options]")}

${C.u("Methods:")}

  ${C.b("init")}     ${C.i("- tinchi init [output/file/path]")}
    Creates a ${C.b(".tinchirc")} configuration file.
    Optionally specify a path to set the output location.

  ${C.b("generate")} ${C.i("- tinchi generate [path/of/file] [filename]")}
    Generates CSS using the settings from ${C.b(".tinchirc")}.
    If no path or filename is provided, uses the 'output' field in ${C.b(
      ".tinchirc"
    )}.
    Reads colors from ${C.b(".tinchirc")} or falls back to defaults.

  ${C.b("search")}   ${C.i("- tinchi search [query]")}
    Finds utility classes matching your query.
    Example: ${C.cB("tinchi search flex direction column")}
`;
