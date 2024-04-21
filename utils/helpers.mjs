import fs from 'node:fs';

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