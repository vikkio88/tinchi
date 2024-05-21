import { parseArgs } from 'node:util';
import { help } from "./methods/help.mjs";

const options = {
    merge: {
        type: "boolean",
        short: 'm',
    },
    force: {
        type: 'boolean',
        short: 'f',
    },
};

export function getArgs(args) {
    try {
        const {
            values,
            positionals,
            // @ts-ignore
        } = parseArgs({ args, options, allowPositionals: true });
        return { args: values, positionals };
    } catch (e) {
        help({ error: true, message: 'Could not parse arguments' });
        process.exit(1);
    }
}