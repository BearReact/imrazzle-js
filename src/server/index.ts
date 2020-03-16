import React from 'react';
import express from 'express';
import {resolve} from 'path';
import get from 'lodash/get';
import cookiesMiddleware from 'universal-cookie-express';
import {isEmpty} from '@utils/equal';
import appConfig from '@config/app';
import {routePath} from '@config/utils/getAssetPrefix';
import serverGeneratePage from './serverGeneratePage';

const isDev = get(process, 'env.NODE_ENV', 'production') !== 'production';

const server = express();

server.disable('x-powered-by');
server.use(cookiesMiddleware());

server.use(routePath('/static'), express.static(resolve(process.cwd(), isDev ? 'public/static' : 'build/public/static')));
if (isDev) {
    const reverseProxyList = require('./middleware/reverseProxyList').default;
    if (!isEmpty(reverseProxyList)) {
        reverseProxyList.map((proxy: any) => {
            server.use(proxy);
            return false;
        });
    }
}

server.get('/*', serverGeneratePage);

export default server;
