import React from 'react';
import express from 'express';
import get from 'lodash/get';
import cookiesMiddleware from 'universal-cookie-express';
import {isEmpty} from '@utils/equal';
import ssr from './ssr';

const isDev = get(process, 'env.NODE_ENV', 'production') !== 'production';

const server = express();

server.disable('x-powered-by');
server.use(cookiesMiddleware());
server.use(express.static(process.env.RAZZLE_PUBLIC_DIR));

if(isDev){
    const reverseProxyList = require('./middleware/reverseProxyList').default;
    if(!isEmpty(reverseProxyList)){
        reverseProxyList.map(proxy => {
            server.use(proxy);
        });
    }
}

server.get('/*', ssr);

export default server;
