/* eslint-disable */
/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `src/resources/lang`)
 */

import {connect} from 'react-redux';
import LanguageProvider from './LanguageProvider';


if (!Intl.PluralRules) {
    require('@formatjs/intl-pluralrules/polyfill');
    require('@formatjs/intl-pluralrules/dist/locale-data/en'); // Add locale data for de
    require('@formatjs/intl-pluralrules/dist/locale-data/zh'); // Add locale data for de
}

// @ts-ignore
if (!Intl.RelativeTimeFormat) {
    require('@formatjs/intl-relativetimeformat/polyfill');
    require('@formatjs/intl-relativetimeformat/dist/locale-data/en'); // Add locale data for de
    require('@formatjs/intl-relativetimeformat/dist/locale-data/zh'); // Add locale data for de
}

const mapDispatchToProps = {};

const mapStateToProps = (state: any) => ({
    locale: state.language.locale
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LanguageProvider);
