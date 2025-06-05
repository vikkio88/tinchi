# Tinchi

from sicilian: _Tìnci_ (ph: tin-chee) = To Paint.

A small set of css utils classes to quickly startup your css project without having to copy paste snippets all over the place.

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

methods:

init - thinchi init [output/file/path]
  
  It will init the .tinchirc file, where you can specify configs.
  If specified as argument you can define the outputfile path.


generate - thinchi generate [path/of/file] [filename]
    
  It will generate tinchi CSS in the specified path/of/file.
  If no parameter is specified, it will use the .tinchirc file 'output' parameter.
  The generator will use color definitions from the .tinchirc file, otherwise defaults.

    m - merge: will merge into a single file (not needed if you specified the filename parameter).
        example: tinchi generate -m folder/file.css -> will generate only a file.
        

search - tinchi search flex direction column

  It will show all the classes that apply some style like "flex direction column".        
```
## Examples and colours
You can find a messy example with defaults in [here](https://tinchi-docs.surge.sh/)