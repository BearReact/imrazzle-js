// @flow
import React from 'react';
import doctrine, {Annotation} from 'doctrine';
import {isForwardRef, isMemo} from 'react-is';
import get from 'lodash/get';
import {renderToString} from 'react-dom/server';
import {createFlowPropDef} from './flow/createPropDef';

function hasDocgen(component) {
    // eslint-disable-next-line no-underscore-dangle
    return !!component.__docgenInfo;
}

function getDocgenSection(component, section: string): any {
    // eslint-disable-next-line no-underscore-dangle
    return hasDocgen(component) ? component.__docgenInfo[section] : null;
}

function isValidDocgenSection(docgenSection: any) {
    return docgenSection != null && Object.keys(docgenSection).length > 0;
}

function containsJsDoc(value?: string): boolean {
    return value != null && value.includes('@');
}

function parse(content: string, tags: string[]): Annotation {
    let ast;

    try {
        ast = doctrine.parse(content, {
            tags,
            sloppy: true,
        });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);

        throw new Error('Cannot parse JSDoc tags.');
    }

    return ast;
}

function extractTypeName(type){
    if (type.type === 'NameExpression') {
        return type.name;
    }

    if (type.type === 'RecordType') {
        const recordFields = type.fields.map((field: doctrine.type.FieldType) => {
            if (field.value != null) {
                const valueTypeName = extractTypeName(field.value);

                return `${field.key}: ${valueTypeName}`;
            }

            return field.key;
        });

        return `({${recordFields.join(', ')}})`;
    }

    if (type.type === 'UnionType') {
        const unionElements = type.elements.map(extractTypeName);

        return `(${unionElements.join('|')})`;
    }

    // Only support untyped array: []. Might add more support later if required.
    if (type.type === 'ArrayType') {
        return '[]';
    }

    if (type.type === 'TypeApplication') {
        if (type.expression != null) {
            if ((type.expression).name === 'Array') {
                const arrayType = extractTypeName(type.applications[0]);

                return `${arrayType}[]`;
            }
        }
    }

    if (
        type.type === 'NullableType' ||
        type.type === 'NonNullableType' ||
        type.type === 'OptionalType'
    ) {
        return extractTypeName(type.expression);
    }

    if (type.type === 'AllLiteral') {
        return 'any';
    }

    return null;
}

function extractReturns(tag) {
    if (tag.type != null) {
        return {
            type: tag.type,
            description: tag.description,
            getTypeName: () => {
                return extractTypeName(tag.type);
            },
        };
    }

    return null;
}

function extractParam(tag) {
    const paramName = tag.name;

    // When the @param doesn't have a name but have a type and a description, "null-null" is returned.
    if (paramName != null && paramName !== 'null-null') {
        return {
            name: tag.name,
            type: tag.type,
            description: tag.description,
            getPrettyName: () => {
                if (paramName.includes('null')) {
                    // There is a few cases in which the returned param name contains "null".
                    // - @param {SyntheticEvent} event- Original SyntheticEvent
                    // - @param {SyntheticEvent} event.\n@returns {string}
                    return paramName.replace('-null', '').replace('.null', '');
                }

                return tag.name;
            },
            getTypeName: () => {
                return tag.type != null ? extractTypeName(tag.type) : null;
            },
        };
    }

    return null;
}

function extractJsDocTags(ast) {
    const extractedTags = {
        params: null,
        returns: null,
        ignore: false,
    };

    for (let i = 0; i < ast.tags.length; i += 1) {
        const tag = ast.tags[i];

        if (tag.title === 'ignore') {
            extractedTags.ignore = true;
            // Once we reach an @ignore tag, there is no point in parsing the other tags since we will not render the prop.
            break;
        } else {
            switch (tag.title) {
                // arg & argument are aliases for param.
                case 'param':
                case 'arg':
                case 'argument': {
                    const paramTag = extractParam(tag);
                    if (paramTag != null) {
                        if (extractedTags.params == null) {
                            extractedTags.params = [];
                        }
                        extractedTags.params.push(paramTag);
                    }
                    break;
                }
                case 'returns': {
                    const returnsTag = extractReturns(tag);
                    if (returnsTag != null) {
                        extractedTags.returns = returnsTag;
                    }
                    break;
                }
                default:
                    break;
            }
        }
    }

    return extractedTags;
}

const parseJsDoc = (
    value?: string,
    options
) => {
    if (!containsJsDoc(value)) {
        return {
            includesJsDoc: false,
            ignore: false,
        };
    }

    const jsDocAst = parse(value, options.tags);
    const extractedTags = extractJsDocTags(jsDocAst);

    if (extractedTags.ignore) {
        // There is no point in doing other stuff since this prop will not be rendered.
        return {
            includesJsDoc: true,
            ignore: true,
        };
    }

    return {
        includesJsDoc: true,
        ignore: false,
        // Always use the parsed description to ensure JSDoc is removed from the description.
        description: jsDocAst.description,
        extractedTags,
    };
};

function extractProp(
    propName: string,
    docgenInfo,
    typeSystem,
    createPropDef
) {
    const jsDocParsingResult = parseJsDoc(docgenInfo.description);
    const isIgnored = jsDocParsingResult.includesJsDoc && jsDocParsingResult.ignore;

    if (!isIgnored) {
        const propDef = createPropDef(propName, docgenInfo, jsDocParsingResult);

        return {
            propDef,
            jsDocTags: jsDocParsingResult.extractedTags,
            docgenInfo,
            typeSystem,
        };
    }

    return null;
}

function applyJsDocResult(propDef: PropDef, jsDocParsingResult: JsDocParsingResult): PropDef {
    if (jsDocParsingResult.includesJsDoc) {
        const {description, extractedTags} = jsDocParsingResult;

        if (description != null) {
            // eslint-disable-next-line no-param-reassign
            propDef.description = jsDocParsingResult.description;
        }

        const hasParams = extractedTags.params != null;
        const hasReturns = extractedTags.returns != null && extractedTags.returns.type != null;

        if (hasParams || hasReturns) {
            // eslint-disable-next-line no-param-reassign
            propDef.jsDocTags = {
                params:
                    hasParams &&
                    extractedTags.params.map(x => ({name: x.getPrettyName(), description: x.description})),
                returns: hasReturns && {description: extractedTags.returns.description},
            };
        }
    }

    return propDef;
}

const flowFactory = (propName, docgenInfo, jsDocParsingResult) => {
    const propDef = createFlowPropDef(propName, docgenInfo);

    return applyJsDocResult(propDef, jsDocParsingResult);
};

export const extractComponentSectionObject = (docgenSection: any) => {
    const docgenPropsKeys = Object.keys(docgenSection);

    if (!get(docgenSection[docgenPropsKeys[0]],'flowType', false)) {
        throw Error('please type use Flow');
    }
    const typeSystem = 'Flow';

    return docgenPropsKeys
        .map(propName => {
            const docgenInfo = docgenSection[propName];

            return docgenInfo != null
                ? extractProp(propName, docgenInfo, typeSystem, flowFactory)
                : null;
        })
        .filter(Boolean);
};

const extractComponentProps = (component, section) => {
    const docgenSection = getDocgenSection(component, section);
    if (!isValidDocgenSection(docgenSection)) {
        return [];
    }

    return extractComponentSectionObject(docgenSection);
};

function getPropDefs(component, section) {
    let processedComponent = component;

    // eslint-disable-next-line react/forbid-foreign-prop-types
    if (!hasDocgen(component) && !component.propTypes) {
        if (isForwardRef(component) || component.render) {
            processedComponent = component.render().type;
        }
        if (isMemo(component)) {
            processedComponent = component.type().type;
        }
    }

    const extractedProps = extractComponentProps(processedComponent, section);

    if (extractedProps.length === 0) {
        return [];
    }

    return extractedProps.map(x => x.propDef);
}

export const extractProps = component => ({
    rows: getPropDefs(component, 'props'),
});

const PropsTableError = {
    NO_COMPONENT: 'No component found',
    PROPS_UNSUPPORTED: 'Props unsupported. See Props documentation for your framework.',
};

const filterRows = (rows, exclude) =>
    rows && rows.filter(row => !exclude.includes(row.name));

export const CURRENT_SELECTION = '.';

export const getComponent = props => {
    const {of} = props;
    return of;
    // const {parameters = {}} = context;
    // const {component} = parameters;
    //
    // const target = of === CURRENT_SELECTION ? component : of;
    // if (!target) {
    //     if (of === CURRENT_SELECTION) {
    //         return null;
    //     }
    //     throw new Error(PropsTableError.NO_COMPONENT);
    // }
    // return target;
};

export const getComponentProps = component => {
    if (!component) {
        return null;
    }
    try {
        const params = {};
        const {framework = null} = params;

        // const {extractProps = extractProps(framework)} = params.docs || {};
        // if (!extractProps) {
        //     throw new Error(PropsTableError.PROPS_UNSUPPORTED);
        // }
        let props = extractProps(component);

        return props;
    } catch (err) {
        return {error: err.message};
    }
};

const titleCase = (str: string): string =>
    str
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');

export const getComponentName = (component): string => {
    if (!component) {
        return undefined;
    }

    if (typeof component === 'string') {
        if (component.includes('-')) {
            return titleCase(component);
        }
        return component;
    }
    // eslint-disable-next-line no-underscore-dangle
    if (component.__docgenInfo && component.__docgenInfo.displayName) {
        // eslint-disable-next-line no-underscore-dangle
        return component.__docgenInfo.displayName;
    }

    return component.name;
};

const renderPropsTable = component => {
    const rows = get(getComponentProps(component), 'rows', []);
    return renderToString(
        <>
            {"\r\n"}
            <div style={{marginTop: 20}}>

                <h2 style={{borderBottom: 'none'}}>Props</h2>

                <table style={{
                    width: '100%',
                    fontSize: 13,
                }}
                >
                    <thead>
                        <tr style={{backgroundColor: 'transparent'}}>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Required</th>
                            <th>Default Value</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(row => {
                            return (
                                <tr key={get(row, 'name')} style={{backgroundColor: 'transparent'}}>
                                    <td>{get(row, 'name')}</td>
                                    <td dangerouslySetInnerHTML={{__html: get(row, 'type.summary')}}/>
                                    <td>{String(get(row, 'required'))}</td>
                                    <td dangerouslySetInnerHTML={{__html: get(row, 'defaultValue.summary')}}/>
                                    <td dangerouslySetInnerHTML={{__html: get(row, 'description')}}/>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default renderPropsTable;
