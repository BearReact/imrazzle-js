import {BrowserRouter} from 'react-router-dom';
import React, {useState} from 'react';
import {hydrate} from 'react-dom';
import get from 'loadsh/get';
import {Provider} from 'react-redux';
import Immutable from 'seamless-immutable';
import {PRELOAD_STATE} from '../types';
import configureStore from '../library/redux/configureStore';
import LanguageProvider from '../library/intl/provider';
import {translationMessages} from '../library/intl/i18n';
import App from '../App';

const preloadState = Immutable(JSON.parse(get(window, PRELOAD_STATE)) || {});
const store = configureStore(preloadState);

const Root = () => {
    return (
        <Provider store={store}>
            <LanguageProvider messages={translationMessages}>
                <BrowserRouter basename="/ap-main">
                    <App/>
                </BrowserRouter>
            </LanguageProvider>
        </Provider>
    );

};

hydrate(
    <Root/>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
