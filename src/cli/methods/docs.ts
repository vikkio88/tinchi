import fs from "node:fs";
import { getAssetsFolder } from "../../assets/config";
import { c } from "../../helpers/colours";
import path from "node:path";
import { currentScriptDir } from "../../helpers/dir";

type CssClass = {
  name: string;
  isClass: boolean;
  section: string;
  description: string;
  values: string[];
};

export function docs([...termsArray]) {
  const term = termsArray.join(" ");
  if (!Boolean(term)) {
    console.log(
      `\n${c.red("Error")}: You need to specify search term:\n\n\t${c.i(
        "tinchi search flexbox"
      )}\n`
    );
    process.exit(1);
  }
  const classesFile = path.join(
    getAssetsFolder(currentScriptDir()),
    "docs.classes.json"
  );
  if (!fs.existsSync(classesFile)) {
    console.log(`\n${c.red("Error")}: Docs files are missing.`);
    process.exit(1);
  }

  const { type, results } = searchClass(
    term,
    JSON.parse(fs.readFileSync(classesFile).toString())
  );
  if (results.length < 1) {
    console.log(`\nNo results for ${c.b(c.red(`'${term}'`))}`);
    process.exit(0);
  }

  console.log(
    `\n${c.i(
      `Found ${results.length} ${
        type === "exact"
          ? "exact selector match result for "
          : type === "includes"
          ? "selector that cointains "
          : "results for"
      }`
    )}: ${c.b(c.green(`'${term}'`))}\n`
  );
  for (const res of results) {
    console.log(`- ${c.b(c.green(res.isClass ? `class:` : `selector:`))} ${
      res.name
    }
    \t${c.green(`description:`)} ${res.description}
    \t${c.green(`section:`)} ${res.section}
    ${
      // Print usage only for actual elements or classes
      !res.name.includes(":") &&
      !res.name.includes("*") &&
      !res.name.includes("dark") &&
      !res.name.includes("light")
        ? `\t${c.green(`usage:`)} ${c.i(
            `${res.isClass ? `class="${res.name}"` : `<${res.name}>`}`
          )}\n`
        : ""
    }\t${c.green(`css values:`)}
      \t\t${res.values.join("\n\t\t")}\n
      `);
    console.log("");
  }
}

type MatchType = "exact" | "includes" | "description";

function searchClass(
  term: string,
  classes: CssClass[]
): { type: MatchType; results: CssClass[] } {
  const needle = term.toLowerCase();
  const exactMatch = classes.filter((c) => c.name.toLowerCase() === needle);
  if (exactMatch.length) return { type: "exact", results: exactMatch };
  const includes = classes.filter((c) => c.name.toLowerCase().includes(needle));
  if (includes.length) return { type: "includes", results: includes };

  return {
    type: "description",
    results: classes.filter((c) =>
      c.description.toLowerCase().includes(needle)
    ),
  };
}
