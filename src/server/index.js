import React from 'react';
import express from 'express';
import {resolve} from 'path';
import get from 'lodash/get';
import cookiesMiddleware from 'universal-cookie-express';
import {isEmpty} from '@utils/equal';
import appConfig from '@config/app';
import serverGeneratePage from './serverGeneratePage';

const isDev = get(process, 'env.NODE_ENV', 'production') !== 'production';

const server = express();

server.disable('x-powered-by');
server.use(cookiesMiddleware());
server.use(express.static(process.env.RAZZLE_PUBLIC_DIR));
// const staticBaseUrl = get(process, 'env.STATIC_BASE_URL', '/static');
server.use(appConfig.defaultStaticPrefixUrl, express.static(resolve(process.cwd(), 'public/static')));

if(isDev){
    const reverseProxyList = require('./middleware/reverseProxyList').default;
    if(!isEmpty(reverseProxyList)){
        reverseProxyList.map(proxy => {
            server.use(proxy);
        });
    }
}

server.get('/*', serverGeneratePage);

export default server;
