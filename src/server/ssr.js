import React from 'react';
import {renderToString} from "react-dom/server";
import {StaticRouter} from 'react-router-dom';
import {ServerStyleSheet} from "styled-components";
import {DOMParser} from 'xmldom';
import serialize from "serialize-javascript";
import get from 'lodash/get';
import {isEmpty, isJSON} from '@utils/equal';


// redux
import {Provider} from 'react-redux';
import configureStore from '../library/redux/configureStore';

// intl
import LanguageProvider from '../library/intl/provider';
import {translationMessages} from '../library/intl/i18n';

// site config
import {generateConfig} from '@config/utils/getConfig';
import {PRELOAD_STATE} from '../types';

// start component
import App from '../App';


global.DOMParser = DOMParser;
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

export default (req, res) => {
    const context = {};
    const sheet = new ServerStyleSheet();

    // React-Intl Pluralrules
    require('@formatjs/intl-pluralrules/dist/locale-data/en'); // Add locale data for de
    require('@formatjs/intl-pluralrules/dist/locale-data/zh'); // Add locale data for de

    // Redux Store PreState
    const preloadState = get(req, `universalCookies.cookies.${PRELOAD_STATE}`, '{}');

    // 站台設定
    const siteCode = get(req, 'headers.sitecode');
    const globalConfig = generateConfig(siteCode);

    if (!isEmpty(globalConfig)) {
        global.__global__ = globalConfig;

        const store = configureStore(isJSON(preloadState) ? JSON.parse(preloadState) : {});

        const markup = renderToString(
            sheet.collectStyles(
                <Provider store={store}>
                    <LanguageProvider messages={translationMessages}>
                        <StaticRouter context={context} location={req.url} basename="/ap-main">
                            <App/>
                        </StaticRouter>
                    </LanguageProvider>
                </Provider>
            )
        );
        const styledComponentTags = sheet.getStyleTags();


        if (context.url) {
            res.redirect(context.url);
        } else {
            res.status(200)
                .send(`
<!doctype html>
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        
        <!-- Make the page mobile compatible -->
        <meta name="renderer" content="webkit" />
        <meta name="force-rendering" content="webkit" />
        <meta http-equiv="X-UA-Compatible" content="IE=chrome,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        
        <link rel="stylesheet" href="/static/common/css/reset.css" />
        <link rel="stylesheet" href="/static/common/css/bootstrap-base.min.css" />
        
        <link rel="stylesheet" type="text/css" href="/static/common/plugins/iconfont/iconfont.css"/>
        <script src="/static/common/plugins/iconfont/iconfont.js"></script>

        ${assets.client.css
                    ? `<link rel="stylesheet" href="${assets.client.css}">`
                    : ''
                    }
        
       ${styledComponentTags}

        
        <script>
        window.${PRELOAD_STATE} = ${serialize(preloadState)};
        window.__global__ = ${JSON.stringify(global.__global__)};
        </script>
        ${
                        process.env.NODE_ENV === 'production'
                            ? `<script src="${assets.client.js}" defer></script>`
                            : `<script src="${assets.client.js}" defer crossorigin></script>`
                    }
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
                );
        }
    } else {
        res.status(444).send(`throw Error: Site code could not find the site settings, please check SITE_CODE(${siteCode}) and src /config/site.js`);
    }
}
