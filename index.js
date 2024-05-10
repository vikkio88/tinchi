#!/usr/bin/env node
import { getArgs } from './lib/getArgs.mjs';
import { validate } from './lib/validate.mjs';
import { METHODS } from './lib/methods.mjs';

const { args, positionals } = getArgs(process.argv);
validate(args, positionals);

const [methodName, ...otherPositionals] = positionals;

const method = METHODS[methodName];

method ? method(otherPositionals, args) : METHODS.help({ error: true, message: `method ${methodName} not found.` })

