import version from "./version.cjs";
export const HELP = `
Tinchi - tinchee (sicilian: to paint) - v: ${version}

usage:
  tinchi [options] [method] [vars]

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
        

search - tinchi search flex,column

  It will show all the classes that apply style flex and something matching columns.
  
  You can specify just properties and values like this "tinchi search p:overflow#v:auto".
  This will print all the classes that apply an overflow auto.

  you can also specify classnames like "tinchi serach c:small,big"
  This will print all the classes that are names like small or big.
        

Link to docs: https://github.com/vikkio88/tinchi?tab=readme-ov-file#docs
`;
