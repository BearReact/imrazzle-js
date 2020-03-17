import React, {Suspense} from 'react';
import {IntlProvider} from 'react-intl';
// import LanguageProvider from "@i18n/provider";
import {translationMessages, DEFAULT_LOCALE} from '@i18n';


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

const TranslationWrapper = ({dangerouslySetInnerHTML, ...props}) =>
    dangerouslySetInnerHTML ? (
        <span dangerouslySetInnerHTML={dangerouslySetInnerHTML} {...props}/>
    ) : (
        <React.Fragment {...props}/>
    );

/**
 * provider
 */
function I18nProviderWrapper(props) {
    const {children, locale, messages} = props;

    return (
        <IntlProvider
            locale={locale}
            key={locale}
            messages={messages[locale]}
            textComponent={TranslationWrapper}
            defaultLocale={DEFAULT_LOCALE}
        >
            <Suspense fallback={<div>loading...</div>}>{children}</Suspense>
        </IntlProvider>
    );
}
I18nProviderWrapper.defaultProps = {
    children: null,
};

export default {
    provider: I18nProviderWrapper,
    providerProps: {messages: translationMessages},
    supportedLocales: Object.keys(translationMessages), //['en-US', 'zh-CN'],
    providerLocaleKey: 'locale',
};
