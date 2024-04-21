import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULTS, FILES, TEMPLATED_FILES, TINCHI_RC } from './const.mjs';
import { generateFromTemplate } from './helpers.mjs';

export function help({ error = false, message = null } = {}) {
    if (error) {
        console.log(`error: ${message || "not a valid command"}`);
    }

    console.log("usage:\n\ttinchi [options] [method] [vars]");
    console.log("methods:");
    console.log("\n\t init      - thinchi init");
    console.log("\t\t It will init the .tinchirc file, where you can specify configs.");
    console.log();
    console.log("\n\t generate  - thinchi generate path/of/file filename");
    console.log("\t\t It will generate tinchi css in path/of/file specified (It will use colours definition from .tinchirc otherwise defaults).");
    console.log("\t\t m - merge: will merge in a single file (not need if you specified the filename param).");
    console.log();


};

function generate([folder, filename, ..._], args) {
    //TODO: Load info from .tinchirc

    // TODO: parse folder to check whether there is file name
    const shouldMerge = args.merge || Boolean(filename);

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
    const mergeOutput = path.join(folder, filename || 'style.css');

    for (const f of FILES) {
        const isTemplated = Boolean(TEMPLATED_FILES[f]);
        const srcFile = isTemplated ? TEMPLATED_FILES[f] : f;
        const filePath = path.join(currentFilePath, '..', 'src', srcFile);
        const output = shouldMerge ? mergeOutput : path.join(folder, f);
        const content = isTemplated ? generateFromTemplate(filePath, DEFAULTS) : fs.readFileSync(filePath);

        if (shouldMerge) {
            fs.appendFileSync(output, content);
        } else {
            fs.writeFileSync(output, content);
        }

        results.push(output);
    }


    const files = [... new Set(results)];
    //TODO:  add something like <link rel="stylesheet" href="./assets/vars.css"> and remove public replace with /
    console.log(`done!\n\nfiles generated:\n${files.join("\n")}`);
}


function init() {
    //TODO: Check if tinchirc exists
    fs.writeFileSync(
        `${TINCHI_RC}`,
        JSON.stringify(
            { vars: DEFAULTS },
            null,
            2
        ),
    );
    console.log(`\nwrote config file in ${TINCHI_RC}\n`);
}

export const METHODS = {
    generate,
    init,
    help
};