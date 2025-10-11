# Tinchi

From Sicilian: _Tìnci_ (pronounced: tin-chee) — “To Paint”.

A small set of CSS utility classes to quickly start your CSS project without having to copy-paste snippets all over the place.

Kind of like a lightweight, uglier Tailwind — but with less config fuss.

---

## 🛠 How to use it

Install globally:

```bash
npm i -g tinchi
```

Or use it with npx:

```bash
npx tinchi i
```

This will create a `.tinchirc` config file in your project folder.

The generated file looks like this:

```json
{
  "output": "public/assets/style.css",
  "vars": {
    "DARK": "#000003",
    "LIGHT": "#fbfcfe",
    "DARK_FAINT": "#2e2e2e",
    "LIGHT_FAINT": "#e8e9eb"
...
```

You can edit the colors and output path to control where the generated styles go.

---

## 🚀 Commands

Once your `.tinchirc` is set up, run:

```bash
tinchi generate
```

This will generate the utility CSS file ready to be used in your project.

You can include it in your HTML or import it in your bundler — and you're good to go.

Need help?

```bash
tinchi help
```

### ✅ Usage Summary

```
usage:
  tinchi [method] [options]

Methods:

  init      -  tinchi init [output/file/path]
    Creates a .tinchirc configuration file.
    Optionally specify the output file path.

  generate  -  tinchi generate [path/of/file] [filename]
    Generates CSS based on your .tinchirc settings.
    If no path is provided, uses the 'output' field from .tinchirc.
    Pulls colors from .tinchirc or falls back to defaults.

  docs    -  tinchi docs [query]
    Finds utility classes/ css selectors matching the given keywords.
    Example: tinchi docs flex direction column

  snippet   -  tinchi snippet <snippet-name> <file.css|html>
    Appends a predefined CSS|html snippet (like a media query) to the target file.
    Use: tinchi snippet list
    to view all available snippets.
```

---

## 🎨 Examples & Colours

You can find a messy example using the defaults here:

👉 [https://tinchi-docs.surge.sh/](https://tinchi-docs.surge.sh/)
