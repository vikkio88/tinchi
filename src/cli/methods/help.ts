import { HEADER } from "../../helpers/cli";
import { c } from "../../helpers/colours";

export function help({
  error = false,
  message,
}: {
  error?: boolean;
  message?: string;
} = {}) {
  if (error) {
    console.log(`${c.red("Error")}: ${message || "not a valid command"}`);
  }
  console.log(`${HELP}`);
}

export const HELP = `${HEADER}

${c.u("Usage:")}
  ${c.b("tinchi")} ${c.i("[method]")} ${c.i("[options]")}

${c.u("Methods:")}

  ${c.b("init")}     ${c.i("- tinchi init [output/file/path]")}
    Creates a ${c.b(".tinchirc")} configuration file.
    Optionally specify a path to set the output location.

  ${c.b("generate")} ${c.i("- tinchi generate")}
    Generates CSS using the settings from ${c.b(".tinchirc")}.
     Uses the 'outputPath' field in ${c.b(".tinchirc")}.
    Reads colors and other settings from ${c.b(
      ".tinchirc"
    )} or falls back to defaults.

  ${c.b("docs")}   ${c.i("- tinchi docs [query]")}
    Finds Docs for utility classes and selectors matching your query.
    Example: ${c.blue("tinchi docs flex")}

  ${c.b("snippet")}  ${c.i("- tinchi snippet <name> <file.css|html>")}
    Appends a predefined CSS (or html) snippet (e.g. media query) to the target file.
    Use ${c.blue("tinchi snippet list")} to see available snippets.
`;
