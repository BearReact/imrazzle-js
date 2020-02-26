import React from 'react';
import get from 'lodash/get';
import {StaticRouter} from 'react-router-dom';

import {ServerStyleSheet} from "styled-components";
import {renderToString} from "react-dom/server";
import serialize from "serialize-javascript";
import { DOMParser } from 'xmldom';
import configureStore from '../library/redux/configureStore';
import { Provider } from 'react-redux';
import {isJSON} from '@utils/equal';
import LanguageProvider from '../library/intl/provider';
import {translationMessages} from '../library/intl/i18n';
import {version} from '../../package';
import sites from '@config/site';

import App from '../App';
import {PRELOAD_STATE} from '../types';

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


    //站台設定
    const siteCode = process.env.SITE_CODE || get(req, 'headers.sitecode', 'default');
    const siteConfig = sites.find(row => row.siteCode === siteCode);

    if(siteConfig){

        global.__global__ = {
            version: `${version}`,
            uploadPrefix: `${get(process, 'env.UPLOAD_PREFIX_URL', '/uploads')}`,
            staticPrefix: `${get(process, 'env.STATIC_PREFIX_URL', '/static')}`,
            ...siteConfig
        };

        const store = configureStore(isJSON(preloadState) ? JSON.parse(preloadState): {});

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
    }else{
        res.status(444).send('error: siteCode not found in src/config/site.js');
    }
}
