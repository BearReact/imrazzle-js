/* eslint-disable */
/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `src/resources/lang`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl';
import IntlGlobalProvider from './global';


if (!Intl.PluralRules) {
    require('@formatjs/intl-pluralrules/polyfill');
    require('@formatjs/intl-pluralrules/dist/locale-data/en'); // Add locale data for de
    require('@formatjs/intl-pluralrules/dist/locale-data/zh'); // Add locale data for de
}

if (!Intl.RelativeTimeFormat) {
    require('@formatjs/intl-relativetimeformat/polyfill');
    require('@formatjs/intl-relativetimeformat/dist/locale-data/en'); // Add locale data for de
    require('@formatjs/intl-relativetimeformat/dist/locale-data/zh'); // Add locale data for de
}


const TranslationWrapper = ({ dangerouslySetInnerHTML, ...props }) =>
    dangerouslySetInnerHTML ? (
        <span dangerouslySetInnerHTML={dangerouslySetInnerHTML} {...props} />
    ) : (
        <React.Fragment {...props} />
    );

export class LanguageProvider extends React.PureComponent {
    // eslint-disable-line react/prefer-stateless-function
    render() {

        return (
            <IntlProvider
                locale={this.props.locale}
                key={this.props.locale}
                messages={this.props.messages[this.props.locale]}
                textComponent={TranslationWrapper}
                defaultLocale="en-US"
            >
                <IntlGlobalProvider>
                    {React.Children.only(this.props.children)}
                </IntlGlobalProvider>
            </IntlProvider>
        );
    }
}

LanguageProvider.propTypes = {
    locale: PropTypes.string,
    messages: PropTypes.object,
    children: PropTypes.element.isRequired
};

const mapDispatchToProps = {};

const mapStateToProps = state => ({
    locale: state.language.locale
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LanguageProvider);
