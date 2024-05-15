export const styleDoc = [
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


export function qr(simple, properties = [], values = [], classnames = [], looseMatch = true) {
    return {
        simple,
        properties,
        values,
        classnames,
        looseMatch
    };
}