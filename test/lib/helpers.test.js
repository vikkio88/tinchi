import { test, expect, describe } from "vitest";
import { parseQuery, searchCss } from "../../lib/helpers.mjs";
import { qr, styleDoc } from "./styleMock.mjs";

test("Parse Query for Css Search", () => {
    expect(parseQuery('')).toEqual(qr(''));
    expect(parseQuery('mario')).toEqual(qr('mario'));
    expect(parseQuery('p:a#v:b')).toEqual(qr('p:a#v:b', ['a'], ['b']));
    expect(parseQuery('a,b,c')).toEqual(qr('a,b,c', ['a', 'b', 'c'], ['a', 'b', 'c']));
    expect(parseQuery('p:display#v:fle=')).toEqual(qr('p:display#v:fle', ['display'], ['fle'], [], false));

    expect(parseQuery('c:small')).toEqual(qr('c:small', [], [], ['small']));
    expect(parseQuery('c:small,maurizio')).toEqual(qr('c:small,maurizio', [], [], ['small', 'maurizio']));
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

describe("Search Css with strict match complex queries", () => {
    test('property and value with strict and loose', () => {
        expect(searchCss('p:display#v:fle=', styleDoc)).toEqual([
            { ...styleDoc[0] },
            { ...styleDoc[1] },
        ]);
        expect(searchCss('p:flex-dir,just#v:col,cent=', styleDoc)).toEqual([
            { ...styleDoc[4] },
        ]);
    });

    test('classnames search', () => {
        expect(searchCss('c:cc', styleDoc)).toEqual([
            { ...styleDoc[4] },
        ]);
        expect(searchCss('c:banana', styleDoc)).toEqual([]);
    });
});