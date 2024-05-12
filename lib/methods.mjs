import fs from 'node:fs';
import path from 'node:path';

import { DEFAULT_VARS, FILES, TEMPLATED_FILES, TINCHI_RC } from './const.mjs';
import { generateFromTemplate, getCurrentFilePath, getSrcFileFromUtils, loadConfigOrOverride, searchCss } from './helpers.mjs';
import { HELP } from './help.mjs';

export function help({ error = false, message = null } = {}) {
    if (error) {
        console.log(`error: ${message || "not a valid command"}`);
    }
    console.log(HELP);
};

function generate([folderFromCli, filenameFromCli, ..._], args) {
    const { folder, filename, vars } = loadConfigOrOverride(folderFromCli, filenameFromCli);
    const shouldMerge = args.merge || Boolean(filename);

    if (!Boolean(folder)) {
        console.log("tinchi generate [path/to/folder]");
        console.log("\t folder param is necessary, either specify it or init a new config with 'tinchi init'");
        process.exit(1);
    }
    const results = [];

    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }

    const mergeOutput = path.join(folder, filename || 'style.css');
    if (shouldMerge && fs.existsSync(mergeOutput)) {
        // cleanup if merging
        fs.unlinkSync(mergeOutput);
    }

    const currentFilePath = getCurrentFilePath();

    for (const f of FILES) {
        const isTemplated = Boolean(TEMPLATED_FILES[f]);
        const srcFile = isTemplated ? TEMPLATED_FILES[f] : f;
        const filePath = path.join(currentFilePath, '..', 'src', srcFile);
        const outputPath = shouldMerge ? mergeOutput : path.join(folder, f);
        const content = isTemplated ? generateFromTemplate(filePath, vars || DEFAULT_VARS) : fs.readFileSync(filePath);

        if (shouldMerge) {
            fs.appendFileSync(outputPath, content);
        } else {
            fs.writeFileSync(outputPath, content);
        }

        results.push(outputPath);
    }


    const files = [... new Set(results)];
    //TODO:  add something like <link rel="stylesheet" href="./assets/vars.css"> and remove public replace with /
    console.log(`done!\n\nfiles generated:\n${files.join("\n")}`);
}


function init(_, args) {
    if (fs.existsSync(`${TINCHI_RC}`) && (!args.force)) {
        console.log(`\n${TINCHI_RC} file exists in current folder.`);
        console.log(`If you want to overwrite it add "force (-f)" to the init command:`);
        console.log(`\n\ttinchi init -f\n`);
        process.exit(1);
    }


    fs.writeFileSync(
        `${TINCHI_RC}`,
        JSON.stringify(
            { output: "public/style.css", vars: DEFAULT_VARS },
            null,
            2
        ),
    );
    console.log(`\nwrote config file in "${TINCHI_RC}\n`);
    if (args.force) {
        console.log(`\n\tforced overwrite.`);
    }
}

function search([term, ..._]) {
    if (!Boolean(term)) {
        console.log(`\nError - You need to specify search term:\n\n\ttinchi search flexbox\n`);
        process.exit(1);
    }
    const docFile = getSrcFileFromUtils('doc.json');
    if (!fs.existsSync(docFile)) {
        console.log(`\nError - There is no doc file.`);
        process.exit(1);
    }
    const doc = JSON.parse(fs.readFileSync(docFile));

    const results = searchCss(term, doc);
    if (results.length < 1) {
        console.log(`\nNo results for '${term}'`);
        process.exit(0);
    }

    console.log(`Results for '${term}':\n`);
    for (const res of results) {
        console.log(`\t- ${res.element ? `element: ${res.element} | ` : ''} class: ${res.classname}\n`);
        for (const rule of res.rules) {
            console.log(`\t\t ${rule.property}  : ${rule.value}`);
        }
        console.log('');
    }
}

export const METHODS = {
    generate,
    gen: generate,
    g: generate,

    init,
    i: init,

    search,
    s: search,

    help,
    h: help
};