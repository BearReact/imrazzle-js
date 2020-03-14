/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `src/resources/lang`)
 */
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import IntlGlobalProvider from '../global';
const TranslationWrapper = (_a) => {
    var { dangerouslySetInnerHTML } = _a, props = __rest(_a, ["dangerouslySetInnerHTML"]);
    return dangerouslySetInnerHTML ? (React.createElement("span", Object.assign({ dangerouslySetInnerHTML: dangerouslySetInnerHTML }, props))) : (React.createElement(React.Fragment, Object.assign({}, props)));
};
class LanguageProvider extends React.PureComponent {
    // eslint-disable-line react/prefer-stateless-function
    render() {
        return (React.createElement(IntlProvider, { locale: this.props.locale, key: this.props.locale, messages: this.props.messages[this.props.locale], 
            // @ts-ignore
            textComponent: TranslationWrapper, defaultLocale: "en-US" },
            React.createElement(IntlGlobalProvider, null, React.Children.only(this.props.children))));
    }
}
export default LanguageProvider;
//# sourceMappingURL=LanguageProvider.js.map