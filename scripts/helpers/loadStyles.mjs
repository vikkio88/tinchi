import fs from "node:fs";

export function loadStyles(folder, files) {
  let styles = "";
  for (const file of files) {
    styles += fs.readFileSync(`${folder}/${file}`).toString() + "\n";
  }

  return styles;
}
