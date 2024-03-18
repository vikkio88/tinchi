# Tinchi

from sicilian: _Tìnci_ (ph: tin-chee) = To Paint.

A small set of css utils classes to quickly startup your css project without having to copy paste snippets all over the place.
## How to use it
```
npm i tinchi
```
Either use it in js, or move it to the assets folder.

```html
<link rel="stylesheet" href="node_modules/tinchi/dist/tinchi_vars.css" />
<link rel="stylesheet" href="node_modules/tinchi/dist/tinchi.css" />

```
## Docs
### Defaults

The defaults settings are in a `vars.css` file you can replace/override specifying a custom one afterward:

```html
<link rel="stylesheet" href="../src/vars.css" />
<link rel="stylesheet" href="./custom.css" />
<link rel="stylesheet" href="../src/index.css" />
```
### Behaviours
`h_inv` - invert colours on hover

`c-ptr` - cursor pointer on hover

### Box Model utils
`brd` - borders with default val and default radius (coming from vars)

`pd` - padding default (1rem)

`pd2` - padding 2rem

`m0a` - margins 0 auto

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

### Debug

`debug` - class - it will set bg colour and borders to some obvious colours.
