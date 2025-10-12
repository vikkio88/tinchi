import { docs } from "./docs";
import { generate } from "./generate";
import { help } from "./help";
import { init } from "./init";
import { snippet } from "./snippet";
import { version } from "./version";

const methods = ["help", "init", "generate", "snippets", "version"] as const;
export type MethodName = (typeof methods)[number];

export const map: Record<MethodName | string, (args: string[]) => void> = {
  help: () => help(),
  h: () => help(),
  "-h": () => help(),
  init,
  i: init,
  docs,
  d: docs,
  generate,
  g: generate,
  gen: generate,
  snippet,
  s: snippet,
  snip: snippet,
  version,
  v: version,
  "-v": version,
};
