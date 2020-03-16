import type {IsNumberFn, SuffixFn} from './types';

export const isNumber: IsNumberFn = value => !Number(value) !== true;
export const suffix: SuffixFn = value => (isNumber(value) ? `-${value}` : '');
export const isEmpty = (value: any, isCheckNumber0: boolean = false) => (
    value === undefined
        || value === null
        || value === false
        || (isCheckNumber0 && value === 0)
        || (!(value instanceof Date) && typeof value === 'object' && Object.keys(value).length === 0)
        || (typeof value === 'string' && value.trim().length === 0)
);
