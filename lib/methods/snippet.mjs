import fs from "node:fs";
import { C, getSrcFileFromUtils } from "../helpers.mjs";

const usage = `
${C.b("Usage:")}
  tinchi snippet ${C.cB("<snippet-name>")} ${C.cP("<file.css>")}

${C.b("To list available snippets:")}
  tinchi snippet ${C.cB("list")}
`;

export function snippet([rawSnippetName, filename, ..._]) {
  if (!rawSnippetName) {
    console.log(`${C.cR("✗ Missing snippet name.")}\n${usage}`);
    return;
  }

  const snippetPath = getSrcFileFromUtils("snippets.json");

  let snippets = {};
  try {
    snippets = JSON.parse(fs.readFileSync(snippetPath, "utf8"));
  } catch {
    throw new Error(`Could not load snippet file at: ${snippetPath}`);
  }

  const snippetName = rawSnippetName.toLowerCase();

  if (["list", "ls"].includes(snippetName)) {
    const entries = Object.entries(snippets).sort(([a], [b]) =>
      a.localeCompare(b)
    );
    if (entries.length === 0) {
      console.log(`${C.cR("No snippets found in snippets.json.")}`);
      return;
    }

    console.log(`${C.cG("Available snippets:")}\n`);
    for (const [key, value] of entries) {
      const desc = value.description ? ` — ${C.i(value.description)}` : "";
      console.log(`${C.cB(key)}${desc}`);
    }
    return;
  }

  if (!filename) {
    console.log(`${C.cR("✗ Missing output file.")}\n${usage}`);
    return;
  }

  const matchedKey = Object.keys(snippets).find(
    (k) => k.toLowerCase() === snippetName
  );

  if (!matchedKey) {
    console.log(
      `${C.cR("✗ Snippet not found:")} ${C.cP(rawSnippetName)}\nUse ${C.cB(
        "tinchi snippet list"
      )} to see available snippets.`
    );
    return;
  }

  const snip = snippets[matchedKey];
  const name = snip.name || matchedKey;
  const text = snip.text;

  fs.appendFileSync(filename, `\n/* ${name} */\n${text}\n`);
  console.log(`${C.cG("✓ Snippet added:")} ${C.cB(name)} → ${C.cP(filename)}`);
}
