import { help } from "./methods.mjs";

export function validate(args, positionals) {
    if (positionals.length < 1) {
        help({ error: true, message: 'No method specified' });
        process.exit(1);
    }
}