import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FILES } from './const.mjs';

export function help({ error = false } = {}) {
    if (error) {
        console.log("not a valid command");
    }

    console.log("tinchi [options] output/path");
};

export function exec(folder, args) {
    const results = [];
    const currentFilePath = path.dirname(fileURLToPath(import.meta.url));
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }

    FILES.forEach(f => {
        const filePath = path.join(currentFilePath, '..', 'src', f);
        if (args.merge) {
            const output = path.join(folder, args.name || 'style.css');
            fs.appendFileSync(output, fs.readFileSync(filePath));
            results.push(output);
        } else {
            const output = path.join(folder, f);
            fs.copyFileSync(filePath, output);
            results.push(output);
        }
    });

    return new Set(results);
}