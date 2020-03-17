/* eslint-disable */
/*
 *
 * Language global use not component
 * https://github.com/yahoo/react-intl/issues/416
 */

import React from 'react';
import {IntlShape, injectIntl} from 'react-intl';

export let i18n: Function = () => {};

class LanguageGlobal extends React.PureComponent<any> {

    constructor(props: any) {
        super(props);
        i18n = props.intl.formatMessage;
    }
    render() {
        return React.Children.only(this.props.children);
    }
}

export default injectIntl(LanguageGlobal);
