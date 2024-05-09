import fs from 'node:fs';

const styles = fs.readFileSync('src/index.css').toString();

const stylesRegex = /(\w+)?\.([\w-]+)\:?\s*\{\s*([^}]*?)\s*\}/g;
const ruleRegex = /([\w-]+)\s*:\s*([^;]+);/g;
const parsedStyles = [];
let match;
while ((match = stylesRegex.exec(styles)) !== null) {
    const [_, element, classname, rulesText] = match;
    const rules = [];
    let ruleMatch;

    while ((ruleMatch = ruleRegex.exec(rulesText)) !== null) {
        const [__, property, value] = ruleMatch;
        rules.push({ property: property.trim(), value: value.trim() });
    }

    parsedStyles.push({
        element: element || null,
        classname: classname,
        rules: rules
    });
}

fs.writeFileSync('src/doc.json', JSON.stringify(parsedStyles, null, 2));