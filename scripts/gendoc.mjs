import fs from "node:fs";
import { loadStyles } from "./helpers/loadStyles.mjs";

const srcFolder = "src";
const outputClasses = "docs.classes.json";
const outputSections = "docs.sections.json";
const files = [
  "vars.css.tinchi",
  "index.css",
  "animations.css",
  "components.css",
];

const SECTION_REGEXP = /\/\*+.?Section:(.+?).?\*+\//g;
const SECTION_REGEXP_NC = /\/\*+.?Section:.+\*+\//g;
const UNIFIED_BLOCK_REGEXP =
  /(?:\/\*\s*([\s\S]*?)\s*\*\/\s*)?([.#]?[^\s,{]+)\s*{([^}]+)}/g;

async function generateDoc() {
  const stylesBody = loadStyles(srcFolder, files);
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
   * @property {boolean} isClass //TODO: this should be an enum, isClass,Element or pseudo selector so you can remove the usage from the doc
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
    while ((match = UNIFIED_BLOCK_REGEXP.exec(singleSection)) !== null) {
      const [, maybeDescription, selectorList, rawValues] = match;

      let description = maybeDescription?.trim().replace(/\s+/g, " ");

      const selectors = selectorList
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s && (s.includes("root") || !s.includes(":")));

      for (const sel of selectors) {
        const values = rawValues
          .trim()
          .split(";")
          .map((line) => line.trim())
          .filter(Boolean);

        let name = sel.replace(/^[.#]/, "");
        description = description || `${section}: ${sel}`;
        // can be bothered to rewrite the whole regexp so
        // I am monkey patching the wrong selector
        if (name.includes(")")) {
          name = `${name.replace(")", "")}`;
          description = `${description.replace(")", "")}`;
        }

        const cssClass = {
          name,
          section,
          description,
          values,
          isClass: sel.startsWith("."),
        };

        classes.push(cssClass);
        classesBySection[section].push(cssClass);
      }
    }
  }

  fs.writeFileSync(
    `${srcFolder}/${outputClasses}`,
    JSON.stringify(classes, null, 2)
  );
  fs.writeFileSync(
    `${srcFolder}/${outputSections}`,
    JSON.stringify(classesBySection, null, 2)
  );
}

generateDoc();
