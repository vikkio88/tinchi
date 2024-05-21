import fs from 'node:fs';
import { getSrcFileFromUtils, searchCss } from '../helpers.mjs';

export function search([term, ..._]) {
    if (!Boolean(term)) {
        console.log(`\nError - You need to specify search term:\n\n\ttinchi search flexbox\n`);
        process.exit(1);
    }
    const docFile = getSrcFileFromUtils('doc.json');
    if (!fs.existsSync(docFile)) {
        console.log(`\nError - There is no doc file.`);
        process.exit(1);
    }
    const doc = JSON.parse(fs.readFileSync(docFile).toString());

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