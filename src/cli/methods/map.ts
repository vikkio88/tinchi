import { generate } from "./generate";
import { help } from "./help";
import { init } from "./init";
import { snippets } from "./snippets";
import { version } from "./version";

const methods = ["help", "init", "generate", "snippets", "version"] as const;
export type MethodName = (typeof methods)[number];

export const map: Record<MethodName | string, (args: string[]) => void> = {
  help,
  h: help,
  "-h": help,
  init,
  i: init,
  generate,
  g: generate,
  snippets,
  s: snippets,
  snip: snippets,
  version,
  v: version,
  "-v": version,
};
