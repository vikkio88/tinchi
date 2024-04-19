#!/usr/bin/env node
import { parseArgs } from 'node:util';

import { validate } from './utils/validate.mjs';
import { exec } from './utils/methods.mjs';

const options = {
  merge: {
    type: 'boolean',
    short: 'm',
  },
  name: {
    type: 'string',
    short: 'n',
  },
};

const {
  values: args,
  positionals,
} = parseArgs({ args: process.argv.slice(2), options, allowPositionals: true });
validate(args, positionals);

console.log(exec(positionals[0], args));

