import { HELP } from '../help.mjs';
import { C } from '../helpers.mjs';


export function help({ error = false, message = null } = {}) {
    if (error) {
        console.log(`${C.cR("Error")}: ${message || "not a valid command"}`);
    }
    console.log(HELP);
};