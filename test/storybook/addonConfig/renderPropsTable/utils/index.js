// @flow
const BLACKLIST = ['null', 'undefined'];

export function isDefaultValueBlacklisted(value: string): boolean {
    return BLACKLIST.some(x => x === value);
}

export const MAX_DEFALUT_VALUE_SUMMARY_LENGTH = 50;

export function isTooLongForDefaultValueSummary(value: string): boolean {
    return value.length > MAX_DEFALUT_VALUE_SUMMARY_LENGTH;
}

export function createSummaryValue(summary: string, detail?: string) {
    return {summary, detail};
}
