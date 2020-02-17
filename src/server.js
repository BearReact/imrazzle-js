import App from './App';
import React from 'react';
import get from 'lodash/get';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import {IntlProvider} from "react-intl";
import serialize from 'serialize-javascript'; // Safer stringify, prevents XSS attacks
// import { runtimeConfig } from './config';
import {preloadLocale} from './types';

// import cookieParser from 'cookie-parser';
const cookiesMiddleware = require('universal-cookie-express');

import zh from "./i18n/zh";
import en from "./i18n/en";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

//
// ${`<script>
//            window.__global__ = {
//                locale: '${locale}'
// };
// </script>`
// }

const server = express();
server
  .disable('x-powered-by')
  .use(cookiesMiddleware())
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const context = {};

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
        <IntlProvider
            locale={locale}
            key={locale}
            defaultLocale={locale}
            messages={messages}
        >
           <StaticRouter context={context} location={req.url} basename="/ap-main">
                <App />
           </StaticRouter>
        </IntlProvider>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200)
          .send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        
       
        
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
  });

export default server;
