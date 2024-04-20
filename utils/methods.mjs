import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FILES } from './const.mjs';

export function help({ error = false, message = null } = {}) {
    if (error) {
        console.log(`error: ${message || "not a valid command"}`);
    }

    console.log("usage:\n\ttinchi [options] [method] [vars]");
    console.log("methods:");
    console.log("\t init - thinchi init");
    console.log("\t\t will init the .tinchirc file");
    console.log("\t dump - thinchi [m] dump path/of/file");
    console.log("\t\t will dump tinchi css in path/of/file specified.");
    console.log("\t\t m - merge: will merge in a single file");


};

function dump([folder, ..._], args) {
    if (!Boolean(folder)) {
        console.log("tinchi dump [path/to/folder]");
        console.log("\t folder param is necessary");
        process.exit(1);
    }
    const results = [];
    const currentFilePath = path.dirname(fileURLToPath(import.meta.url));
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }

    FILES.forEach(f => {
        const filePath = path.join(currentFilePath, '..', 'src', f);
        if (args.merge) {
            const output = path.join(folder, args.name || 'style.css');
            fs.appendFileSync(output, fs.readFileSync(filePath));
            results.push(output);
        } else {
            const output = path.join(folder, f);
            fs.copyFileSync(filePath, output);
            results.push(output);
        }
    });

    const files = [... new Set(results)];
    console.log(`done!\n\nfiles generated:\n${files.join("\n")}`);
}

export const METHODS = {
    dump: dump,
    help: help
};