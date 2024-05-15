import { help } from "./methods/help.mjs";

export function validate(_, positionals) {
    if (positionals.length < 1) {
        help({ error: true, message: 'No method specified' });
        process.exit(1);
    }
}