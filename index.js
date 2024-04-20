#!/usr/bin/env node
import { getArgs } from './utils/getArgs.mjs';
import { validate } from './utils/validate.mjs';
import { METHODS } from './utils/methods.mjs';

const { args, positionals } = getArgs(process.argv);
validate(args, positionals);

const [methodName, ...otherPositionals] = positionals;

const method = METHODS[methodName];

method ? method(otherPositionals, args) : METHODS.help({ error: true, message: `method ${methodName} not found.` })

