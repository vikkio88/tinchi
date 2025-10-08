export function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "") // remove comments
    .replace(/\s*([{}:;,>])\s*/g, "$1") // remove spaces around symbols
    .replace(/\s+/g, " ") // collapse whitespace
    .replace(/;}/g, "}") // remove last semicolon before }
    .trim();
}
