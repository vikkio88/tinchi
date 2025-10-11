const MAIN_CSS = [
  "./css/main.css",
  "./css/components.css",
  "./css/animations.css",
  "./css/debug.css",
];
const OUTPUT_CLASSES = "docs.classes.json";
const ASSETS_FOLDER = "./assets";
const fs = MAIN_CSS.map((f) => Bun.file(f));

type CssClass = {
  name: string;
  isClass: boolean;
  section: string;
  description: string;
  values: string[];
};

async function generateDoc(stylesBody: string) {
  const SECTION_REGEXP = /\/\*+\s*Section:\s*([^*]+?)\s*\*+\//gi;
  const UNIFIED_BLOCK_REGEXP =
    /(?:\/\*\s*([\s\S]*?)\s*\*\/\s*)?([.#]?[^\s,{]+)\s*{([^}]+)}/g;

  const matches = [...stylesBody.matchAll(SECTION_REGEXP)];
  const sections = matches.map((m) => m[1]!.trim());
  const parts = stylesBody.split(SECTION_REGEXP);
  const bodies = parts
    .slice(1)
    .filter((_, i) => i % 2 === 1)
    .map((s) => s.trim());

  if (sections.length !== bodies.length) {
    console.error(`Section mismatch: ${sections.length} vs ${bodies.length}`);
    await Bun.write("debug.css", stylesBody);
    process.exit(1);
  }

  const classes: CssClass[] = [];

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const body = bodies[i];

    let match;
    while ((match = UNIFIED_BLOCK_REGEXP.exec(body!)) !== null) {
      let [, maybeDescription, selector, rawValues] = match;
      maybeDescription = maybeDescription?.trim().replace(/\s+/g, " ");
      const name = selector!.replace(/^[.#]/, "");
      const isClass = selector!.startsWith(".");
      const description = maybeDescription || `${section}: ${selector}`;
      const values = rawValues!
        .trim()
        .split(";")
        .map((v) => v.trim())
        .filter(Boolean);

      classes.push({ name, isClass, section: section!, description, values });
    }
  }

  await Bun.write(
    `${ASSETS_FOLDER}/${OUTPUT_CLASSES}`,
    JSON.stringify(classes, null, 2)
  );
  console.log("finished writing docs");
}
async function main() {
  console.log("Generating Docs");

  const styles = (await Promise.all(fs.map((f) => f.text()))).join("\n");
  await generateDoc(styles);
}

await main();
