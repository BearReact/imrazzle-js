export default (p) => process.env.NODE_ENV === 'production'
    ? undefined
    : [
        'row',
        p.noGutters ? 'no-gutter' : '',
    ]
        .filter(Boolean)
        .join(' ');
//# sourceMappingURL=getDataName.js.map