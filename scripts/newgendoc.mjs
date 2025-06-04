import { loadStyles } from "./helpers/loadStyles.mjs";

const folder = "src";
const files = ["vars.css.tinchi", "index.css", "animations.css"];

const SECTION_REGEXP = /\/\*+.?Section:(.+?).?\*+\//g;
const SECTION_REGEXP_NC = /\/\*+.?Section:.+\*+\//g;

async function generateDoc() {
  const stylesBody = loadStyles(folder, files);
  let sectionsMatches = [...stylesBody.matchAll(SECTION_REGEXP)];
  const sections = sectionsMatches.map((m) => m[1].trim());
  const sectionsBodies = stylesBody
    .split(SECTION_REGEXP_NC)
    .filter((m) => m !== "")
    .map((m) => m.trim());

  if (sections.length !== sectionsBodies.length) {
    console.error("Sections and bodies are not the same");
  // TODO: on tinchi vars there is no comments?
    process.exit(1);
  }

  console.log("they are the same");
}

generateDoc();
