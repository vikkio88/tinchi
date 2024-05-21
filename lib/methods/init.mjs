import fs from 'node:fs';

import { TINCHI_RC } from '../const.mjs';
import { defaultConfig } from '../config.mjs';

export function init([output], args) {
    if (fs.existsSync(`${TINCHI_RC}`) && (!args.force)) {
        console.log(`\n${TINCHI_RC} file exists in current folder.`);
        console.log(`If you want to overwrite it add "force (-f)" to the init command:`);
        console.log(`\n\ttinchi init -f\n`);
        process.exit(1);
    }


    fs.writeFileSync(
        `${TINCHI_RC}`,
        JSON.stringify(
            defaultConfig(output),
            null,
            2
        ),
    );
    console.log(`\nwrote config file in "${TINCHI_RC}\n`);
    if (args.force) {
        console.log(`\n\tforced overwrite.`);
    }
}