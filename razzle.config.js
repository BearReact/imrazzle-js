'use strict';

const merge = require('lodash/merge');
const webpackBase = require('./webpack.config');

module.exports = {
    plugins: ['babel-ts'],
    modify(config, {target, dev}, webpack) {

        const appConfig = merge(config, webpackBase);
        // const appConfig = config;

        switch (target){
            case 'web':
                if(!dev) {
                    // Because the development mode is set through 3001port (Not use custom publicPath)
                    appConfig.output.publicPath = process.env.ROUTE_PREFIX_PATH;
                }
                break;

            case 'node':
                if(!dev){
                    // Change the name of the server output file in production
                    appConfig.output.filename = 'server.js';
                }
                break;
        }

        return appConfig;
    },
};
