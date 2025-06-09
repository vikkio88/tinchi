#!/usr/bin/env node
import { getArgs } from "./lib/getArgs.mjs";
import { validate } from "./lib/validate.mjs";
import { METHODS } from "./lib/methodMap.mjs";

const { args, positionals } = getArgs(process.argv.slice(2));
validate(args, positionals);

const [methodName, ...otherPositionals] = positionals;

const method = METHODS[methodName];
try {
  method
    ? method(otherPositionals, args)
    : METHODS.help({ error: true, message: `method ${methodName} not found.` });
} catch (error) {
  console.error(`Error whilst running '${methodName}' method:`, error.message);
  process.exit(1);
}
