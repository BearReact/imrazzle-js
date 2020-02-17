import App from './App';
import {BrowserRouter} from 'react-router-dom';
import React, {useState} from 'react';
import { hydrate } from 'react-dom';
import {IntlProvider} from "react-intl";
import get from 'loadsh/get'
import en from './i18n/en.js';
import zh from './i18n/zh.js';
import {LocaleProvider} from './middleware/locale/LocaleContext';
import {preloadLocale, preloadState} from './types';
import {Provider} from 'react-redux';
import configureStore from './library/redux/configureStore';
import { ConnectedRouter } from 'connected-react-router';
import history from './library/react-router/history';


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

const store = configureStore(get(window, preloadState));


const Root = () => {

    const [locale, setLocale] = useState(get(window, preloadLocale));

    let messages;

    console.log('locale', locale);

    if (locale === 'en') {
        messages = en;
    } else {
        messages = zh;
    }



    return (
        <Provider store={store}>
            <LocaleProvider
                locale={locale}
                setLocale={setLocale}
            >
                <IntlProvider
                    locale={locale}
                    key={locale}
                    defaultLocale="en"
                    messages={messages}
                >
                    <ConnectedRouter history={history}>
                        {/*<BrowserRouter basename="/ap-main">*/}
                            <App setLocale={setLocale}/>
                        {/*</BrowserRouter>*/}
                    </ConnectedRouter>
                </IntlProvider>
            </LocaleProvider>
        </Provider>
    );

};

hydrate(
    <Root />,
    document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
