import fs from "node:fs";
import path from "node:path";
import { c } from "../../helpers/colours";
import { templateInterpolator } from "../../helpers/files";
import { loadTinchiConfig } from "../../helpers/cli";
import { currentScriptDir } from "../../helpers/dir";
import { getAssetsFolder } from "../../assets/config";

const SNIPPET_FILE = "snippets.json";

type SnippetName = "";

type Snippet = {
  name: SnippetName;
  text: string;
  description: string;
  type: "css" | "html";
  isTemplate: boolean;
};

type Snippets = Record<SnippetName, Snippet>;

const usage = `
${c.b("Usage:")}
  tinchi snippet ${c.blue("<snippet-name>")} ${c.i("<file.css|html>")}

${c.b("To list available snippets:")}
  tinchi snippet ${c.blue("list")}
`;

export function snippet([rawSnippetName, filename, ..._]: string[]) {
  if (!rawSnippetName) {
    console.log(`${c.red("✗ Missing snippet name.")}\n${usage}`);
    return;
  }

  const snippets: Snippets = load();

  const snippetName = rawSnippetName.toLowerCase() as SnippetName;

  if (["list", "ls"].includes(snippetName)) {
    const entries = Object.entries(snippets).sort(([a], [b]) =>
      a.localeCompare(b)
    );
    if (entries.length === 0) {
      console.log(
        `${c.red(`No snippets found in \`${SNIPPET_FILE}\` snippet database.`)}`
      );
      return;
    }

    console.log(`${c.green("Available snippets:")}\n`);
    for (const [key, value] of entries) {
      const desc = value.description ? ` — ${c.i(value.description)}` : "";
      console.log(`${c.blue(key)}${desc}`);
    }
    return;
  }

  if (!filename) {
    console.log(`${c.red("✗ Missing output file.")}\n${usage}`);
    return;
  }

  const matchedKey = Object.keys(snippets).find(
    (k) => k.toLowerCase() === snippetName
  );

  if (!matchedKey) {
    console.log(
      `${c.red("✗ Snippet not found:")} ${c.green(
        rawSnippetName
      )}\nUse ${c.blue("tinchi snippet list")} to see available snippets.`
    );
    return;
  }

  const snip = snippets[snippetName];
  const name = snip.name || snippetName;
  const text = snip.text;

  let content = snip.type === "css" ? `\n/* ${name} */\n${text}\n` : text;

  if (snip.isTemplate) {
    const config = loadTinchiConfig();
    content = templateInterpolator(content, { CSS_OUTPUT: config.outputPath });
  }

  fs.appendFileSync(filename, content);
  console.log(
    `${c.green("✓ Snippet added:")} ${c.blue(name)} → ${c.blue(filename)}`
  );
}

function load(): Snippets {
  const snippetPath = path.join(
    getAssetsFolder(currentScriptDir()),
    "snippets.json"
  );
  try {
    return JSON.parse(fs.readFileSync(snippetPath, "utf8")) as Snippets;
  } catch {
    throw new Error(`Could not load snippet file at: ${snippetPath}`);
  }
}
