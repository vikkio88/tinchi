export function templateInterpolator(
  template: string,
  vars: Record<string, string>,
  addTrailingReturn: boolean = true
) {
  for (const v of Object.keys(vars)) {
    const replacement = vars[v]!;
    template = template.replaceAll(`__${v}__`, replacement);
  }

  return `${template}${addTrailingReturn ? "\n" : ""}`;
}
