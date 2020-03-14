import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';
import get from 'lodash/get';
import { Provider } from 'react-redux';
import Immutable from 'seamless-immutable';
import { getConfig } from '@config/utils/getConfig';
import { PRELOAD_STATE } from '../constants';
import configureStore from '../library/redux/configureStore';
import { LanguageProvider, translationMessages } from '../library/intl';
import App from '../App';
const preloadState = Immutable(JSON.parse(get(window, PRELOAD_STATE)) || {});
const store = configureStore(preloadState);
const Root = () => {
    return (React.createElement(Provider, { store: store },
        React.createElement(LanguageProvider, { messages: translationMessages },
            React.createElement(BrowserRouter, { basename: getConfig('env.routePrefixPath') },
                React.createElement(App, null)))));
};
hydrate(React.createElement(Root, null), document.getElementById('root'));
if (module.hot) {
    module.hot.accept();
}
//# sourceMappingURL=index.js.map