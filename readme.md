# Tinchi

from sicilian: _Tìnci_ (ph: tin-chee) = To Paint.

A small set of css utils classes to quickly startup your css project without having to copy paste snippets all over the place.
## How to use it
```
npm i -g tinchi
```

or/then

```
npx tinchi [options] generate [folder/file]
```

or if you have initialised a '.tinchirc' file via `tinchi init`
```
tinchi generate
```

More info with
```
npx tinchi help
```
```
usage:
  tinchi [options] [method] [vars]

methods:

init - thinchi init
  
  It will init the .tinchirc file, where you can specify configs.


generate - thinchi generate [path/of/file] [filename]
    
  It will generate tinchi CSS in the specified path/of/file.
  If no parameter is specified, it will use the .tinchirc file 'output' parameter.
  The generator will use color definitions from the .tinchirc file, otherwise defaults.

    m - merge: will merge into a single file (not needed if you specified the filename parameter).
        example: tinchi generate -m folder/file.css -> will generate only a file.
        

search - tinchi search flex,column

  It will show all the classes that apply style flex and something matching columns.
  
  You can specify just properties and values like this "tinchi search p:overflow#v:auto".
  This will print all the classes that apply an overflow auto.

  you can also specify classnames like "tinchi serach c:small,big"
  This will print all the classes that are names like small or big.
        
```
## Docs
### Defaults

The defaults settings are in a `vars.css` file you can replace/override specifying a custom one afterward:

```html
<link rel="stylesheet" href="folder/vars.css" />
<link rel="stylesheet" href="./custom.css" />
<link rel="stylesheet" href="folder/index.css" />
```
### Behaviours
`h_inv` - invert colours on hover

`c-ptr` - cursor pointer on hover

`oa` - `overflow:auto`

### Box Model utils
`brd` - borders with default val and default radius (coming from vars)

`pd` - padding default (1rem)

`pd2` - padding 2rem

`m0a` - margins 0 auto

`mg_5` - margin 0.5rem

`mg` - margin 1rem

`mg2` - margins 2rem

### Flex Utils

`f` - `display: flex`

`f1` - `flex:1`

`spa` - justify space around

`spb` - justify space between

`g_5` - gap .5rem

`g` - gap 1rem

`g2` - gap 2rem

`fi` - flex items list, a set of items in a list that wrap and scale to size

`fic` - same as `fi` only on a column.

#### columns
`flex-direction: column`

`c` - just flex dir columns

`cc` - center aligned and center justified.

`cs` - center aligned and justified on flex start.

`ce` - center aligned and justified on flex end.

#### rows
`flex-direction: row`

`r` - just flex dir columns

`rc` - center aligned and center justified.

`rs` - center aligned and justified on flex start.

`re` - center aligned and justified on flex end.

### Buttons
Buttons have `bg-color` of `--accent-v1-color`

There are a few variants:

`button.big` - a wide button

`button.small` - a small button

`button.success` - a button with `bg-colour` `--success-color`

`button.warning` - a button with `bg-colour` `--warning-color`

`button.danger` - - a button with `bg-colour` `--danger-color`



### Font Styles/Effects
`tt-cpz` - `text-transform: capitalize;`

`success` - make the text colour `--success-color`

`danger` - make the text colour `--danger-color`

### Debug

`debug` - class - it will set bg colour and borders to some obvious colours.
