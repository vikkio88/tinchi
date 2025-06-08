# Tinchi

from sicilian: _Tìnci_ (ph: tin-chee) = To Paint.

A small set of css utils classes to quickly startup your css project without having to copy paste snippets all over the place.

Kind of like a small lightweight and ugly tailwind, but less config heavy.

## How to use it
```
npm i -g tinchi
```

or/then

```
npx tinchi i
```
To init the config file on your project folder.

The `.tinchirc` file generated will look like this:
```
{
  "output": "public/assets/style.css",
  "vars": {
    "DARK": "#000003",
    "LIGHT": "#fbfcfe",
    "DARK_FAINT": "#2e2e2e",
    "LIGHT_FAINT": "#e8e9eb",
```
Here you can edit colours and output, to specify where to dump the output style file.

Then you can:

```
tinchi generate
```
This will generate the style file ready to be used in your project.

If you then use it in your html file, or in your js bundler you are ready to go.

More info with
```
npx tinchi help
```

```
usage:
  tinchi [method] [vars]

Usage:
  tinchi [method] [options]

Methods:

  init  -  tinchi init [output/file/path]
    Creates a .tinchirc configuration file.
    You can optionally specify an output path.

  generate  -  tinchi generate [path/of/file] [filename]
    Generates CSS using the config in .tinchirc.
    If no path or filename is provided, it uses the 'output' field from .tinchirc.
    Reads colors from .tinchirc, falling back to defaults if not defined.

  search  -  tinchi search [query]
    Finds utility classes that match the given style keywords.
    Example: tinchi search flex direction column
```
## Examples and colours
You can find a messy example with defaults in [here](https://tinchi-docs.surge.sh/)