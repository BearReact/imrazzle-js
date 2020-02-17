import React from 'react';
import get from 'lodash/get';
import {StaticRouter} from 'react-router-dom';

import {ServerStyleSheet} from "styled-components";
import {renderToString} from "react-dom/server";
import {IntlProvider} from "react-intl";
import serialize from "serialize-javascript";

import App from '../App';
import zh from "../i18n/zh";
import en from "../i18n/en";
import {preloadLocale} from '../types';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);


export default (req, res) => {

    const context = {};

    const sheet = new ServerStyleSheet();

    require('@formatjs/intl-pluralrules/dist/locale-data/en'); // Add locale data for de
    require('@formatjs/intl-pluralrules/dist/locale-data/zh'); // Add locale data for de

    let messages;
    const locale = get(req, `universalCookies.cookies.${preloadLocale}`, 'zh-CN');

    if (locale === 'en') {
        messages = en;
    } else {
        messages = zh;
    }


    const markup = renderToString(
        sheet.collectStyles(
            <IntlProvider
                locale={locale}
                key={locale}
                defaultLocale={locale}
                messages={messages}
            >
                <StaticRouter context={context} location={req.url} basename="/ap-main">
                    <App/>
                </StaticRouter>
            </IntlProvider>
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
        
        <link rel="stylesheet" href="/bootstrap.min.css">
        <link rel="stylesheet" href="/dist.css">

        ${
            assets.client.css
                ? `<link rel="stylesheet" href="${assets.client.css}">`
                : ''
        }
        
       ${styledComponentTags}

        
        <script>
            window.${preloadLocale} = ${serialize(locale)};
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


}
