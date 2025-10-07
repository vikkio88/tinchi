import { generate } from "./generate";
import { help } from "./help";
import { init } from "./init";
import { version } from "./version";

const methods = ["help", "init", "generate", "version"] as const;
export type MethodName = (typeof methods)[number];

export const map: Record<MethodName | string, (args: string[]) => void> = {
  help,
  h: help,
  "-h": help,
  init,
  i: init,
  generate,
  g: generate,
  version,
  v: version,
  "-v": version,
};
