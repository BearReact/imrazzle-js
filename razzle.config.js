'use strict';

const aliasConfig = require('./webpack.config');


module.exports = {
    modify(config, { target, dev }, webpack) {
        const appConfig = config; // stay immutable here

        // Change the name of the server output file in production
        if (target === 'node' && !dev) {
            appConfig.output.filename = 'server.js';
        }

        appConfig.resolve.alias = aliasConfig.resolve.alias;

        return appConfig;
    },
};
