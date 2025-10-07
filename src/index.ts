import { map, type MethodName } from "./cli/methods/map";

function main(argv: string[]) {
  const [method, ...args] = argv;
  const func = map[method ?? ""] || map.help;

  func && func(args);
}

main(process.argv.slice(2));
