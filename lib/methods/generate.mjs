import fs from 'node:fs';
import path from 'node:path';

import { DEFAULT_VARS, FILES, OPTIONAL_FILES, TEMPLATED_FILES } from '../const.mjs';
import { generateFromTemplate, getCurrentFilePath } from '../helpers.mjs';
import { loadConfigOrOverride } from '../config.mjs';

export function generate([folderFromCli, filenameFromCli, ..._], args) {
    const { folder, filename, vars, config } = loadConfigOrOverride(folderFromCli, filenameFromCli);
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

    let firstFile = true;
    for (const f of FILES) {
        if (OPTIONAL_FILES[f] && Boolean(config) && !config[OPTIONAL_FILES[f]]) {
            continue;
        }

        const isTemplated = Boolean(TEMPLATED_FILES[f]);
        const srcFile = isTemplated ? TEMPLATED_FILES[f] : f;
        const filePath = path.join(currentFilePath, '..', 'src', srcFile);
        const outputPath = shouldMerge ? mergeOutput : path.join(folder, f);
        const content = isTemplated ? generateFromTemplate(filePath, vars || DEFAULT_VARS) : fs.readFileSync(filePath);

        if (shouldMerge) {
            // adding 2 trailing new lines between files
            !firstFile ? fs.appendFileSync(outputPath, "\n\n") : firstFile = false;
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