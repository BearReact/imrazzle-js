import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import {hydrate} from 'react-dom';
import get from 'lodash/get';
import {Provider} from 'react-redux';
import Immutable from 'seamless-immutable';
import {getConfig} from '@config/utils/getConfig';
import {PRELOAD_STATE} from '../constants';
import configureStore from '../library/redux/configureStore';
import {LanguageProvider, translationMessages} from '../library/intl';
import App from '../App';

const preloadState = Immutable(JSON.parse(get(window, PRELOAD_STATE)) || {});
const store = configureStore(preloadState);

const Root = () => (
    <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
            <BrowserRouter basename={getConfig('env.routePrefixPath')}>
                <App/>
            </BrowserRouter>
        </LanguageProvider>
    </Provider>
);

hydrate(
    <Root/>,
    document.getElementById('root'),
);

if (module.hot) {
    module.hot.accept();
}
