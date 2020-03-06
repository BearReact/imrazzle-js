// @flow
export const MAX_TYPE_SUMMARY_LENGTH = 90;

const FlowTypesType ={
    UNION: 'union',
    SIGNATURE: 'signature',
};

export function createSummaryValue(summary: string, detail?: string) {
    return {summary, detail};
}

export function isTooLongForTypeSummary(value: string): boolean {
    return value.length > MAX_TYPE_SUMMARY_LENGTH;
}

function generateUnion({name, raw, elements}) {
    if (raw != null) {
        return createSummaryValue(raw);
    }

    if (elements != null) {
        return createSummaryValue(elements.map(x => x.value).join(' | '));
    }

    return createSummaryValue(name);
}

function generateFuncSignature({type, raw}) {
    if (raw != null) {
        return createSummaryValue(raw);
    }

    return createSummaryValue(type);
}
//
function generateObjectSignature({type, raw}){
    if (raw != null) {
        return !isTooLongForTypeSummary(raw) ? createSummaryValue(raw) : createSummaryValue(type, raw);
    }

    return createSummaryValue(type);
}
//
function generateSignature(flowType){
    const {type} = flowType;

    return type === 'object' ? generateObjectSignature(flowType) : generateFuncSignature(flowType);
}
//
function generateDefault({name, raw}) {
    if (raw != null) {
        return !isTooLongForTypeSummary(raw) ? createSummaryValue(raw) : createSummaryValue(name, raw);
    }

    return createSummaryValue(name);
}

export function createType(type) {
    // A type could be null if a defaultProp has been provided without a type definition.
    if (type == null) {
        return null;
    }

    switch (type.name) {
        case FlowTypesType.UNION:
            return generateUnion(type);
        case FlowTypesType.SIGNATURE:
            return generateSignature(type);
        default:
            return generateDefault(type);
    }
}
