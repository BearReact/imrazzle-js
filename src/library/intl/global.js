/* eslint-disable */
/*
 *
 * Language global use not component
 * https://github.com/yahoo/react-intl/issues/416
 */

import React from 'react';
import {IntlShape, injectIntl} from 'react-intl';

export let i18n: Function = null;

class LanguageGlobal extends React.PureComponent<IntlShape> {

    constructor(props: any) {
        super(props);
        // intl = this.props.intl;
        i18n = this.props.intl.formatMessage;
    }
    render() {
        return React.Children.only(this.props.children);
    }
}

export default injectIntl(LanguageGlobal);
