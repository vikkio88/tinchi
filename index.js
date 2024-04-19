#!/usr/bin/env node
import { getArgs } from './utils/getArgs.mjs';
import { validate } from './utils/validate.mjs';
import { exec } from './utils/methods.mjs';

const { args, positionals } = getArgs(process.argv);
validate(args, positionals);

console.log(exec(positionals[0], args));

