import { parseArgs } from 'node:util';
import { help } from "./methods.mjs";

const options = {
    merge: {
        type: 'boolean',
        short: 'm',
    },
    force: {
        type: 'boolean',
        short: 'f',
    },
};

export function getArgs(argv) {
    const args = argv.slice(2);
    try {
        const {
            values,
            positionals,
        } = parseArgs({ args, options, allowPositionals: true });
        return { args: values, positionals };
    } catch (e) {
        help({ error: true });
        process.exit(1);
    }
}