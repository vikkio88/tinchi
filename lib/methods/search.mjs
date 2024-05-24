import fs from 'node:fs';
import { C, getSrcFileFromUtils, searchCss } from '../helpers.mjs';

export function search([term, ..._]) {
    if (!Boolean(term)) {
        console.log(`\n${C.cR("Error")}: You need to specify search term:\n\n\t${C.i("tinchi search flexbox")}\n`);
        process.exit(1);
    }
    const docFile = getSrcFileFromUtils('doc.json');
    if (!fs.existsSync(docFile)) {
        console.log(`\n${C.cR("Error")}: Doc file is missing.`);
        process.exit(1);
    }
    const doc = JSON.parse(fs.readFileSync(docFile).toString());

    const results = searchCss(term, doc);
    if (results.length < 1) {
        console.log(`\nNo results for ${C.b(C.cR(`'${term}'`))}`);
        process.exit(0);
    }

    console.log(`\n${C.i("Results for")}: ${C.b(C.cG(`'${term}'`))}\n`);
    for (const res of results) {
        console.log(`\t- ${res.element ? C.b(C.cB(`element: ${res.element} | `)) : ''} ${C.b(C.cP(`class: ${res.classname}`))}\n`);
        for (const rule of res.rules) {
            console.log(`\t\t ${C.b(C.cG(rule.property))}  : ${C.b(rule.value)}`);
        }
        console.log('');
    }
}