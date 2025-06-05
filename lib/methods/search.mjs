import fs from "node:fs";
import { C, getSrcFileFromUtils, searchClass } from "../helpers.mjs";

export function search([...termsArray]) {
  const term = termsArray.join(" ");
  if (!Boolean(term)) {
    console.log(
      `\n${C.cR("Error")}: You need to specify search term:\n\n\t${C.i(
        "tinchi search flexbox"
      )}\n`
    );
    process.exit(1);
  }
  const classesFile = getSrcFileFromUtils("docs.classes.json");
  const sectionsFile = getSrcFileFromUtils("docs.sections.json");
  if (!fs.existsSync(classesFile) || !fs.existsSync(sectionsFile)) {
    console.log(`\n${C.cR("Error")}: Docs files are missing.`);
    process.exit(1);
  }

  const results = searchClass(
    term,
    JSON.parse(fs.readFileSync(classesFile).toString())
  );
  if (results.length < 1) {
    console.log(`\nNo results for ${C.b(C.cR(`'${term}'`))}`);
    process.exit(0);
  }

  console.log(
    `\n${C.i(`Found ${results.length} results for`)}: ${C.b(
      C.cG(`'${term}'`)
    )}\n`
  );
  for (const res of results) {
    console.log(`- ${C.b(C.cG(`class:`))} ${res.name}\n
    \t${C.cG(`section:`)} ${res.section}\n
      \t${C.cG(`usage:`)} ${C.i(`class="${res.name}"`)}\n
      \t${C.cG(`description:`)} ${res.description}\n
      \t${C.cG(`css values:`)}
      \t\t${res.values.join("\n\t\t")}\n
      `);
    console.log("");
  }
}
