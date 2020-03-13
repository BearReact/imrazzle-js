// @flow
import {IsNumberFn, SuffixFn} from './types';

export const isNumber: IsNumberFn = value => !Number.isNaN(parseInt(value + ''));
export const suffix: SuffixFn = value => (isNumber(value) ? `-${value}` : '');
export const isEmpty = (value, isCheckNumber0 = false) => {
    return (
        value === undefined
        || value === null
        || value === false
        || (isCheckNumber0 && value === 0)
        || (!(value instanceof Date) && typeof value === 'object' && Object.keys(value).length === 0)
        || (typeof value === 'string' && value.trim().length === 0)
    );
};
