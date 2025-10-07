import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const currentScriptDir = () => dirname(fileURLToPath(import.meta.url));
