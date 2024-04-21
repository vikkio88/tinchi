import fs from 'node:fs';
import { DEFAULT_VARS, TINCHI_RC } from './const.mjs';

function getFolderAndFile(filepath) {
    const res = (/(.*\/)([^\/]+\.css)$/i.exec(filepath))?.slice(1, 3);

    if (Array.isArray(res)) {
        const [folder, filename] = res;
        return { folder, filename };
    }

    return {
        folder: filepath,
        filename: null
    };
}

function toPlaceholder(name) {
    return `__${name.toUpperCase()}__`;
}

export function generateFromTemplate(filepath, vars) {
    let content = fs.readFileSync(filepath).toString();
    for (const v of Object.keys(vars)) {
        content = content.replaceAll(toPlaceholder(v), vars[v]);
    }
    return content;
}


function loadConfig() {
    if (!fs.existsSync(TINCHI_RC)) {
        return { output: null, vars: null };
    }

    try {
        JSON.parse(fs.readFileSync(TINCHI_RC).toString());
    } catch {
        console.log('\n\tError: Invalid .tinchirc file.\n\n');
        return { output: null, vars: null };
    }
}


export function loadConfigOrOverride(folderFromCli, filenameFromCli) {
    if (!folderFromCli) {
        let { output: folderFromConfig, vars } = loadConfig();
        let { folder, filename } = getFolderAndFile(folderFromConfig);
        return { folder, filename, vars };

    }

    const { folder: folderPath, filename: file } = getFolderAndFile(folderFromCli);
    let filename = filenameFromCli ? filenameFromCli : file;
    let folder = folderPath === folderFromCli ? folderFromCli : folderPath;
    return { folder, filename, vars: DEFAULT_VARS };
}