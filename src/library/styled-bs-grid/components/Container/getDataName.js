export default (p) => process.env.NODE_ENV === 'production'
    ? undefined
    : [
        p.fluid ? 'container-fluid' : 'container',
    ]
        .filter(Boolean)
        .join(' ');
//# sourceMappingURL=getDataName.js.map