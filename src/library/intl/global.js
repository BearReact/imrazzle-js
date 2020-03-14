/* eslint-disable */
/*
 *
 * Language global use not component
 * https://github.com/yahoo/react-intl/issues/416
 */
import React from 'react';
import { injectIntl } from 'react-intl';
export let i18n = () => { };
class LanguageGlobal extends React.PureComponent {
    constructor(props) {
        super(props);
        i18n = props.intl.formatMessage;
    }
    render() {
        return React.Children.only(this.props.children);
    }
}
export default injectIntl(LanguageGlobal);
//# sourceMappingURL=global.js.map