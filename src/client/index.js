import App from '../App';
import {BrowserRouter} from 'react-router-dom';
import React, {useState} from 'react';
import { hydrate } from 'react-dom';
import {IntlProvider} from "react-intl";
import get from 'loadsh/get'
// import en from '../i18n/en.js';
// import zh from '../i18n/zh.js';
import {LocaleProvider} from '../middleware/locale/LocaleContext';
import {PRELOAD_LOCALE, PRELOAD_STATE} from '../types';
import {Provider} from 'react-redux';
import configureStore from '../library/redux/configureStore';
import { ConnectedRouter } from 'connected-react-router';
import history from '../library/react-router/history';
import LanguageProvider from "../library/intl/provider";
import {translationMessages} from '../library/intl/i18n';
import Immutable from 'seamless-immutable';


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

const preloadState = Immutable(JSON.parse(get(window, PRELOAD_STATE)) || {});
const store = configureStore(preloadState);


const Root = () => {

    // const [locale, setLocale] = useState(get(window, PRELOAD_LOCALE));
    //
    // let messages;
    //
    // console.log('locale', locale);
    //
    // if (locale === 'en') {
    //     messages = en;
    // } else {
    //     messages = zh;
    // }



    return (
        <Provider store={store}>
            {/*<IntlProvider*/}
            {/*    locale={locale}*/}
            {/*    key={locale}*/}
            {/*    defaultLocale="en"*/}
            {/*    messages={messages}*/}
            {/*>*/}
                <LanguageProvider messages={translationMessages}>

                {/*<ConnectedRouter history={history}>*/}
                    <BrowserRouter basename="/ap-main">
                        <App/>
                    </BrowserRouter>
                {/*</ConnectedRouter>*/}
                </LanguageProvider>
            {/*</IntlProvider>*/}
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
