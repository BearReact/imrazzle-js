/* eslint-disable */
/*
 *
 * Language global use not component
 * https://github.com/yahoo/react-intl/issues/416
 */

import React from 'react';
import {InjectedIntl, InjectedIntlProps, injectIntl} from 'react-intl';

// export let intl: InjectedIntl = null;
export let i18n: Function = null;

class LanguageGlobal extends React.PureComponent<InjectedIntlProps> {

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
