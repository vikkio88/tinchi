import { test, expect } from "vitest";
import { parseQuery, searchCss } from "../../utils/helpers.mjs";

const styleDoc = [
    {
        element: null,
        classname: 'f',
        rules: [
            { property: 'display', value: 'flex' }
        ]
    },
    {
        element: 'span',
        classname: 'fspan',
        rules: [
            { property: 'display', value: 'flex' }
        ]
    },
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


function qr(simple, properties = [], values = []) {
    return {
        simple,
        properties,
        values,
    };
}
test("Parse Query for Css Search", () => {

    expect(parseQuery('')).toEqual(qr(''));
    expect(parseQuery('mario')).toEqual(qr('mario'));
    expect(parseQuery('p:a#v:b')).toEqual(qr('p:a#v:b', ['a'], ['b']));
    expect(parseQuery('a,b,c')).toEqual(qr('a,b,c', ['a', 'b', 'c'], ['a', 'b', 'c']));
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
    expect(searchCss('cursor,displ,point,fle', styleDoc)).toEqual([
        { ...styleDoc[0] },
        { ...styleDoc[1] },
        { ...styleDoc[2] },
        { ...styleDoc[4] }
    ]);
});
