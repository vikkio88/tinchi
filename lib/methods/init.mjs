import fs from 'node:fs';

import { TINCHI_RC } from '../const.mjs';
import { defaultConfig } from '../config.mjs';
import { C } from '../helpers.mjs';

export function init([output], args) {
    if (fs.existsSync(`${TINCHI_RC}`) && (!args.force)) {
        console.log(`\n${C.cR(`${TINCHI_RC}`)} ${C.b("file exists in current folder.")}`);
        console.log(`If you want to overwrite it add "force (${C.b("-f")})" to the init command:`);
        console.log(`\n\t${C.i("tinchi init -f")}\n`);
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
    console.log(`\n${C.cG("wrote config file in: ")} ${C.b(`${TINCHI_RC}`)}\n`);
    if (args.force) {
        console.log(`\n\t${C.cR("forced overwrite.")}`);
    }
}