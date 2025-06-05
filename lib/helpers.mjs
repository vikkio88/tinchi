import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import picocolors from "picocolors";

export function getFolderAndFile(filepath) {
  const res = /(.*\/)([^\/]+\.css)$/i.exec(filepath)?.slice(1, 3);

  if (Array.isArray(res)) {
    const [folder, filename] = res;
    return { folder, filename };
  }

  return {
    folder: filepath,
    filename: null,
  };
}

function toPlaceholder(name) {
  return `__${name.toUpperCase()}__`;
}

export function generateFromTemplate(filepath, vars) {
  let content = fs.readFileSync(filepath).toString();
  for (const v of Object.keys(vars)) {
    content = content.replaceAll(toPlaceholder(v), vars[v]);
  }
  return content;
}

export function getCurrentFilePath() {
  return path.dirname(fileURLToPath(import.meta.url));
}

export function getSrcFileFromUtils(filename) {
  return path.join(getCurrentFilePath(), "..", "src", filename);
}

/**
 *
 * @param {string} queryString
 * @returns
 */
export function parseQuery(queryString) {
  return { sectionName: false, term: queryString };
}

/**
 * @typedef CSSClass
 * @property {string} name
 * @property {string} section
 * @property {string} description
 * @property {string[]} values
 */

/**
 *
 * @param {string} query
 * @param {CSSClass[]} cssDoc
 * @returns
 */
export function searchClass(query, cssDoc) {
  const parsedQuery = parseQuery(query);

  const results = cssDoc.filter((cssClass) => {
    return (
      isLike(cssClass.name, parsedQuery.term) ||
      isLike(cssClass.description, parsedQuery.term)
    );
  });

  return results;
}

function isLike(haystack, needle) {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

export const C = {
  b: picocolors.bold,
  i: picocolors.italic,
  u: picocolors.underline,
  cG: picocolors.green,
  cR: picocolors.red,
  cB: picocolors.blue,
  cP: picocolors.magenta,
};
