import React from 'react';
import express from 'express';
import renderHtml from './renderHtml';

const cookiesMiddleware = require('universal-cookie-express');

const server = express();
server
    .disable('x-powered-by')
    .use(cookiesMiddleware())
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
    .get('/*', renderHtml);

export default server;
