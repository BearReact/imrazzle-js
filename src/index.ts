/* eslint-disable no-console */
import http from 'http';
import get from 'lodash/get';
import app from './server';

const server = http.createServer(app);
const port = get(process, 'env.PORT', 3000);
let currentApp = app;

// Check route prefix
if (get(process, 'env.ROUTE_PREFIX_PATH') === '/') {
    throw Error('throw Error: Env ROUTE_PREFIX_PATH please fix "/" to ""');
}

// @ts-ignore
server.listen(port, error => {
    if (error) {
        console.log(error);
    }
    console.log(`🚀 Ready on http://localhost:${port}`); // eslint-disable-line no-console
});

if (module.hot) {
    console.log('✅  Server-side HMR Enabled!');

    module.hot.accept('./server', () => {
        console.log('🔁  HMR Reloading `../server`...');

        try {
            const hotApp = require('./server').default;
            server.removeListener('request', currentApp);
            server.on('request', hotApp);
            currentApp = hotApp;
        } catch (error) {
            console.error(error);
        }
    });
}
