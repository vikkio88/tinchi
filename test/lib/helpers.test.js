import { test, expect } from "vitest";
import { parseQuery, searchCss } from "../../lib/helpers.mjs";

const styleDoc = [
    // 0
    {
        element: null,
        classname: 'f',
        rules: [
            { property: 'display', value: 'flex' }
        ]
    },
    // 1
    {
        element: 'span',
        classname: 'fspan',
        rules: [
            { property: 'display', value: 'flex' }
        ]
    },
    // 2
    {
        "element": null,
        "classname": "c-ptr",
        "rules": [
            {
                "property": "cursor",
                "value": "pointer"
            }
        ]
    },
    // 3
    {
        "element": null,
        "classname": "oa",
        "rules": [
            {
                "property": "overflow",
                "value": "auto"
            }
        ]
    },
    // 4
    {
        "element": null,
        "classname": "cc",
        "rules": [
            {
                "property": "flex-direction",
                "value": "column"
            },
            {
                "property": "justify-content",
                "value": "center"
            },
            {
                "property": "align-items",
                "value": "center"
            }
        ]
    },
];


function qr(simple, properties = [], values = [], looseMatch = true) {
    return {
        simple,
        properties,
        values,
        looseMatch
    };
}
test("Parse Query for Css Search", () => {
    expect(parseQuery('')).toEqual(qr(''));
    expect(parseQuery('mario')).toEqual(qr('mario'));
    expect(parseQuery('p:a#v:b')).toEqual(qr('p:a#v:b', ['a'], ['b']));
    expect(parseQuery('a,b,c')).toEqual(qr('a,b,c', ['a', 'b', 'c'], ['a', 'b', 'c']));
    expect(parseQuery('p:display#v:fle=')).toEqual(qr('p:display#v:fle', ['display'], ['fle'], false));
});

test("Search Css with simple query", () => {
    expect(searchCss('flex', styleDoc)).toEqual([
        { ...styleDoc[0] },
        { ...styleDoc[1] },
        { ...styleDoc[4] }
    ]);
});

test("Search Css with complex queries", () => {
    expect(searchCss('p:cursor#v:pointer', styleDoc)).toEqual([
        { ...styleDoc[2] },
    ]);
    expect(searchCss('p:cursor,dospo#v:point,flong', styleDoc)).toEqual([
        { ...styleDoc[2] },
    ]);
    expect(searchCss('p:cursor,displ#v:point,fle', styleDoc)).toEqual([
        { ...styleDoc[0] },
        { ...styleDoc[1] },
        { ...styleDoc[2] },
    ]);
    expect(searchCss('cursor,displ,point,fle,center', styleDoc)).toEqual([
        { ...styleDoc[0] },
        { ...styleDoc[1] },
        { ...styleDoc[2] },
        { ...styleDoc[4] }
    ]);
});

test("Search Css with strict match complex queries", () => {
    expect(searchCss('p:display#v:fle=', styleDoc)).toEqual([
        { ...styleDoc[0] },
        { ...styleDoc[1] },
    ]);
    expect(searchCss('p:flex-dir,just#v:col,cent=', styleDoc)).toEqual([
        { ...styleDoc[4] },
    ]);
});