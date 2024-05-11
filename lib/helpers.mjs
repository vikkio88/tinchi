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
const STRICT_MARKER = '=';

/**
 * 
 * @param {string} queryString 
 * @returns 
 */
export function parseQuery(queryString) {
    let looseMatch = true;
    if (queryString.endsWith(STRICT_MARKER)) {
        looseMatch = false;
        queryString = queryString.replace(STRICT_MARKER, '');
    }
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
        values,
        looseMatch
    };

}

export function searchCss(query, cssDoc) {
    query = parseQuery(query);

    const results = [];
    const queryWOPropVals = checkIfPropsVals(query);

    for (const block of cssDoc) {
        block:
        for (const rule of block.rules) {
            let propertyMatch = false;
            let valueMatch = false;
            if (queryWOPropVals) {
                propertyMatch = isLike(rule.property, query.simple);
                valueMatch = rule.value.toLowerCase().includes(query.simple);
                valueMatch = isLike(rule.value, query.simple);
            } else if (!queryWOPropVals && query.looseMatch) {
                propertyMatch = query.properties.some(p => isLike(rule.property, p));
                valueMatch = query.values.some(v => isLike(rule.value, v));
            } else if (!queryWOPropVals && !query.looseMatch) {
                propertyMatch = valueMatch = strictMatch(query.properties, query.values, block.rules);
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

function checkIfPropsVals(query) {
    return query.properties.length < 1 && query.values.length < 1;
}

function strictMatch(props, vals, rules) {
    if (props.length != vals.length) {
        return false;
    }

    for (const index in props) {
        const prop = props[index];
        const val = vals[index];

        if (rules.some(r => isLike(r.property, prop) && isLike(r.value, val))) {
            return true;
        }
    }

    return false;
}

function isLike(rule, search) {
    return rule.toLowerCase().includes(search.toLowerCase());
}
