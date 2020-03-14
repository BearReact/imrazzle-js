export const isNumber = value => !Number(value) !== true;
export const suffix = value => (isNumber(value) ? `-${value}` : '');
export const isEmpty = (value, isCheckNumber0 = false) => {
    return (value === undefined
        || value === null
        || value === false
        || (isCheckNumber0 && value === 0)
        || (!(value instanceof Date) && typeof value === 'object' && Object.keys(value).length === 0)
        || (typeof value === 'string' && value.trim().length === 0));
};
//# sourceMappingURL=index.js.map