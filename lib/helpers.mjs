import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import picocolors from 'picocolors';

export function getFolderAndFile(filepath) {
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

export function getCurrentFilePath() {
    return path.dirname(fileURLToPath(import.meta.url));
}

export function getSrcFileFromUtils(filename) {
    return path.join(getCurrentFilePath(), '..', 'src', filename);
}

const SEPARATOR_MARKER = '#';
const SPLIT_MARKER = ',';
const PV_QUERY_REGEX = /p:(.+?)#v:(.+)$/;
const CLASS_QUERY_REGEX = /c:(.+?)$/;
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
    let classnames = [];

    let parts = [];
    if (CLASS_QUERY_REGEX.test(queryString)) {
        const matches = queryString.match(CLASS_QUERY_REGEX);
        parts = [false, false, matches[1]];
    } else if (queryString.includes(SEPARATOR_MARKER)
        && (PV_QUERY_REGEX.test(queryString))) {
        const matches = queryString.match(PV_QUERY_REGEX);
        parts = [matches[1], matches[2]];
    } else if ((queryString.includes(SEPARATOR_MARKER)
        && !(PV_QUERY_REGEX.test(queryString)))) {
        console.log('Invalid syntax, should be: p:display#v:flex');
        process.exit(1);
    } else {
        parts = [queryString];
    }

    if (parts.length > 1 || queryString.includes(SPLIT_MARKER)) {
        // @ts-ignore
        parts = parts.map(p => p ? p.split(SPLIT_MARKER) : p);
        if (parts.length > 1) {
            properties = parts[0] ? parts[0] : [];
            values = parts[1] ? parts[1] : [];
            if (Boolean(parts[2])) {
                classnames = parts[2];
            }
        } else {
            properties = values = parts[0];
        }
    }

    return {
        simple: queryString,
        properties,
        values,
        classnames,
        looseMatch,
    };

}

export function searchCss(query, cssDoc) {
    query = parseQuery(query);

    const results = [];
    const queryWOPropVals = checkIfPropsVals(query);

    for (const block of cssDoc) {
        if (query.classnames.length > 0
            && query.classnames.some(c => isLike(block.classname, c))) {
            results.push({ ...block });
            continue;
        }

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

export const C = {
    b: picocolors.bold,
    i: picocolors.italic,
    u: picocolors.underline,
    cG: picocolors.green,
    cR: picocolors.red,
    cB: picocolors.blue,
    cP: picocolors.magenta,
};