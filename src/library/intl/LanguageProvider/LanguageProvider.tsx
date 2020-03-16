/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `src/resources/lang`)
 */

import * as React from 'react';
import {IntlProvider} from 'react-intl';
import IntlGlobalProvider from '../global';

interface IProps {
    dangerouslySetInnerHTML: any;
    // any other props that come into the component
}

const TranslationWrapper = ({dangerouslySetInnerHTML, ...props}: IProps) => (dangerouslySetInnerHTML ? (
    <span dangerouslySetInnerHTML={dangerouslySetInnerHTML} {...props}/>
) : (
    <React.Fragment {...props}/>
));

type Props = {
    locale: string,
    messages: object,
    children: React.ReactNode
};

const LanguageProvider = (props: Props) => {
    const {locale, messages, children} = props;

    return (
        <IntlProvider
            locale={locale}
            key={locale}
            messages={messages[locale]}
            // @ts-ignore
            textComponent={TranslationWrapper}
            defaultLocale="en-US"
        >
            <IntlGlobalProvider>
                {React.Children.only(children)}
            </IntlGlobalProvider>
        </IntlProvider>
    );
};

export default LanguageProvider;
