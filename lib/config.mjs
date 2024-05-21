import fs from "node:fs";
import { DEFAULT_OUTPUT_NAME, DEFAULT_VARS, TINCHI_RC } from "./const.mjs";
import { getFolderAndFile } from "./helpers.mjs";

export function defaultConfig(output = null) {
    return { output: output ?? DEFAULT_OUTPUT_NAME, vars: DEFAULT_VARS, config: { animations: true } };
}

function loadConfig() {
    if (!fs.existsSync(TINCHI_RC)) {
        console.log('\n\tNo .tinchirc file in folder, using defaults.\n\n');
        return defaultConfig();
    }

    try {
        return JSON.parse(fs.readFileSync(TINCHI_RC).toString());
    } catch {
        console.log('\n\tError: Invalid .tinchirc file, using defaults.\n\n');
        return defaultConfig();
    }
}

export function loadConfigOrOverride(folderFromCli, filenameFromCli) {
    if (!folderFromCli) {
        let { output: folderFromConfig, vars, config } = loadConfig();
        let { folder, filename } = getFolderAndFile(folderFromConfig);
        return { folder, filename, vars, config };

    }

    const { vars, config } = defaultConfig();
    const { folder: folderPath, filename: file } = getFolderAndFile(folderFromCli);
    let filename = filenameFromCli ? filenameFromCli : file;
    let folder = folderPath === folderFromCli ? folderFromCli : folderPath;
    return { folder, filename, vars, config };
}
