import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
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
        return JSON.parse(fs.readFileSync(TINCHI_RC).toString());
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

export function getCurrentFilePath() {
    return path.dirname(fileURLToPath(import.meta.url));
}

export function getSrcFileFromUtils(filename) {
    return path.join(getCurrentFilePath(), '..', 'src', filename);
}

const SEPARATOR_MARKER = '#';
const SPLIT_MARKER = ',';
const COMPLEX_QUERY_REGEX = /p:(.+?)#v:(.+)$/;
// TODO: check on how to make it with OR or Partial matches
// const OR_MARKER = '~';

/**
 * 
 * @param {string} queryString 
 * @returns 
 */
export function parseQuery(queryString) {
    // let hasOrMarker = false;
    // if (queryString.endsWith(OR_MARKER) || queryString.startsWith(OR_MARKER)) {
    //     hasOrMarker = true;
    // }
    queryString = queryString.toLowerCase();
    let properties = [];
    let values = [];

    let parts = [];
    if (queryString.includes(SEPARATOR_MARKER)
        && (COMPLEX_QUERY_REGEX.test(queryString))) {
        const matches = queryString.match(COMPLEX_QUERY_REGEX);
        parts = [matches[1], matches[2]];
    } else if ((queryString.includes(SEPARATOR_MARKER)
        && !(COMPLEX_QUERY_REGEX.test(queryString)))) {
        console.log('Invalid syntax, should be: p:display#v:flex');
        process.exit(1);
    } else {
        parts = [queryString];
    }

    if (parts.length > 1 || queryString.includes(SPLIT_MARKER)) {
        parts = parts.map(p => p.split(SPLIT_MARKER));
        if (parts.length > 1) {
            properties = parts[0];
            values = parts[1];
        } else {
            properties = values = parts[0];
        }
    }

    return {
        simple: queryString,
        properties,
        values
    };

}

export function searchCss(query, cssDoc) {
    query = parseQuery(query);

    const results = [];

    for (const block of cssDoc) {
        block:
        for (const rule of block.rules) {
            let propertyMatch = false;
            let valueMatch = false;
            if (query.properties.length < 1 && query.values.length < 1) {
                propertyMatch = rule.property.toLowerCase().includes(query.simple);
                valueMatch = rule.value.toLowerCase().includes(query.simple);
            } else {
                propertyMatch = query.properties.some(p => rule.property.toLowerCase().includes(p.toLowerCase()));
                valueMatch = query.values.some(v => rule.value.toLowerCase().includes(v.toLowerCase()));
            }

            if (propertyMatch || valueMatch) {
                results.push({
                    ...block
                });
                break block;
            }
        }
    }

    return results;
}