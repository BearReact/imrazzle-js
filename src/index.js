/* eslint-disable no-console */
import http from 'http';
import get from 'lodash/get';
import app from './server';

const server = http.createServer(app);
const port = get(process, 'env.PORT', 3000);
let currentApp = app;

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
            app = require('./server').default;
            server.removeListener('request', currentApp);
            server.on('request', app);
            currentApp = app;
        } catch (error) {
            console.error(error);
        }
    });
}
