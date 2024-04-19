import { help } from "./methods.mjs";

export function validate(args, positionals) {
    if (positionals.length < 1) {
        help({ error: true });
        process.exit(1);
    }
}