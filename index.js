#!/usr/bin/env node
import { getArgs } from './lib/getArgs.mjs';
import { validate } from './lib/validate.mjs';
import { METHODS } from './lib/methodMap.mjs';

const { args, positionals } = getArgs(process.argv.slice(2));
validate(args, positionals);

const [methodName, ...otherPositionals] = positionals;

const method = METHODS[methodName];

method ? method(otherPositionals, args) : METHODS.help({ error: true, message: `method ${methodName} not found.` })

