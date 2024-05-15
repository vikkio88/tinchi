import fs from 'node:fs';

import { DEFAULT_VARS, TINCHI_RC } from '../const.mjs';

export function init(_, args) {
    if (fs.existsSync(`${TINCHI_RC}`) && (!args.force)) {
        console.log(`\n${TINCHI_RC} file exists in current folder.`);
        console.log(`If you want to overwrite it add "force (-f)" to the init command:`);
        console.log(`\n\ttinchi init -f\n`);
        process.exit(1);
    }


    fs.writeFileSync(
        `${TINCHI_RC}`,
        JSON.stringify(
            { output: "public/style.css", vars: DEFAULT_VARS },
            null,
            2
        ),
    );
    console.log(`\nwrote config file in "${TINCHI_RC}\n`);
    if (args.force) {
        console.log(`\n\tforced overwrite.`);
    }
}