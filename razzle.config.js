'use strict';

const aliasConfig = require('./webpack.config');

module.exports = {
    modify(config, {target, dev}, webpack) {
        const appConfig = config; // stay immutable here

        // Change the name of the server output file in production
        if (target === 'node' && !dev) {
            appConfig.output.filename = 'server.js';
        }

        // switch (target){
        //     case 'web':
        //         // if(dev) config.devServer.public = 'localhost:3000';
        //
        //         break;
        //     case 'node':
        //         if(!dev) appConfig.output.filename = '/server/index.js';
        //
        //         break;
        // }

        appConfig.resolve.alias = aliasConfig.resolve.alias;

        return appConfig;
    },
};
