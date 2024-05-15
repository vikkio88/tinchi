import { HELP } from '../help.mjs';


export function help({ error = false, message = null } = {}) {
    if (error) {
        console.log(`error: ${message || "not a valid command"}`);
    }
    console.log(HELP);
};