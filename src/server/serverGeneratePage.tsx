import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {ServerStyleSheet} from 'styled-components';
import {DOMParser} from 'xmldom';
import serialize from 'serialize-javascript';
import get from 'lodash/get';
import {isEmpty, isJSON} from '@utils/equal';

// redux
import {Provider} from 'react-redux';
import {serverGenerateConfig} from '@config/utils/getConfig';
import {asset} from '@config/utils/getAssetPrefix';
import configureStore from '../library/redux/configureStore';

// intl
import {LanguageProvider, translationMessages} from '@i18n';

// site config
import {PRELOAD_STATE} from '../constants';

// start component
import App from '../App';

// @ts-ignore
global.DOMParser = DOMParser;

// React-Intl Pluralrules
require('@formatjs/intl-pluralrules/dist/locale-data/en'); // Add locale data for de
require('@formatjs/intl-pluralrules/dist/locale-data/zh'); // Add locale data for de

// @ts-ignore
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

export default (req: any, res: any) => {
    const context = {};
    const sheet = new ServerStyleSheet();

    // Redux Store PreState
    const preloadState = get(req, `universalCookies.cookies.${PRELOAD_STATE}`, '{}');

    // 站台設定
    const siteCode = get(process,'env.SITE_CODE') || get(req, 'headers.sitecode', 'default');
    const globalConfig = serverGenerateConfig(siteCode);

    if (isEmpty(globalConfig.errorMessage)) {

        const store = configureStore(isJSON(preloadState) ? JSON.parse(preloadState) : {});

        const markup = renderToString(
            sheet.collectStyles(
                <Provider store={store}>
                    <LanguageProvider messages={translationMessages}>
                        <StaticRouter context={context} location={req.url} basename={get(globalConfig, 'env.routePrefixPath')}>
                            <App/>
                        </StaticRouter>
                    </LanguageProvider>
                </Provider>
            )
        );
        const styledComponentTags = sheet.getStyleTags();

        // @ts-ignore
        if (context.url) {
            // @ts-ignore
            res.redirect(context.url);
        } else {
            res.status(200)
                .send(`
<!doctype html>
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>${get(globalConfig, 'site.meta.title', '')}</title>
        <meta name="description" content="${get(globalConfig, 'site.meta.description', '')}"/>

        <!-- Make the page mobile compatible -->
        <meta name="renderer" content="webkit" />
        <meta name="force-rendering" content="webkit" />
        <meta http-equiv="X-UA-Compatible" content="IE=chrome,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        
        <link rel="stylesheet" href="${asset('/common/css/reset.css')}" />
        <link rel="stylesheet" href="${asset('/common/css/bootstrap-base.min.css')}" />
        
        <link rel="stylesheet" type="text/css" href="${asset('/common/plugins/iconfont/iconfont.css')}"/>
        <script src="${asset('/common/plugins/iconfont/iconfont.js')}"></script>

        ${assets.client.css
                    ? `<link rel="stylesheet" href="${assets.client.css}">`
                    : ''
                    }
        
       ${styledComponentTags}

        
        <script>
        window.${PRELOAD_STATE} = ${serialize(preloadState)};
        window.__global__ = ${JSON.stringify(globalConfig)};
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
        res.status(444).send(globalConfig.errorMessage);
    }
};
