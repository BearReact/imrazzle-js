'use strict';

const aliasConfig = require('./webpack.config');

module.exports = {
    modify(config, {target, dev}, webpack) {
        const appConfig = config; // stay immutable here

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

        appConfig.node = {
            fs: 'empty',
        };

        appConfig.resolve.alias = aliasConfig.resolve.alias;

        return appConfig;
    },
};
