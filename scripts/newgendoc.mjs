import fs from "node:fs";
import { loadStyles } from "./helpers/loadStyles.mjs";

const folder = "src";
const files = ["vars.css.tinchi", "index.css", "animations.css"];

const SECTION_REGEXP = /\/\*+.?Section:(.+?).?\*+\//g;
const SECTION_REGEXP_NC = /\/\*+.?Section:.+\*+\//g;
const CLASS_BLOCK_REGEXP = /\/\*\s*([^*]+?)\s*\*\/\s*\.(\w[\w-]*)\s*{([^}]+)}/g;

async function generateDoc() {
  const stylesBody = loadStyles(folder, files);
  let sectionsMatches = [...stylesBody.matchAll(SECTION_REGEXP)];
  const sections = sectionsMatches.map((m) => m[1].trim());
  const sectionsBodies = stylesBody
    .split(SECTION_REGEXP_NC)
    .filter((m) => m !== "")
    .map((m) => m.trim());

  if (sections.length !== sectionsBodies.length) {
    console.error("Sections and Section bodies are not the length.");
    process.exit(1);
  }

  /**
   * @typedef CSSClass
   * @property {string} name
   * @property {string} section
   * @property {string} description
   * @property {string[]} values
   */

  /**
   * @type CSSClass[]
   */
  const classes = [];
  /**
   * @type {Object<string,CSSClass[]>}
   */
  const classesBySection = {};

  for (const i in sectionsBodies) {
    const section = sections[i];
    classesBySection[section] = [];
    const singleSection = sectionsBodies[i];
    let match;
    while ((match = CLASS_BLOCK_REGEXP.exec(singleSection)) !== null) {
      const [, description, name, rawValues] = match;

      const values = rawValues
        .trim()
        .split(";")
        .map((line) => line.trim())
        .filter(Boolean);

      const cssClass = {
        name,
        section,
        description: description.trim(),
        values,
      };

      classes.push(cssClass);
      classesBySection[section].push(cssClass);
    }
  }

  fs.writeFileSync("classes.json", JSON.stringify(classes, null, 2));
  fs.writeFileSync("sections.json", JSON.stringify(classesBySection, null, 2));
}

generateDoc();
