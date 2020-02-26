const {createProxyMiddleware} = require('http-proxy-middleware');

const proxyMiddlewareApiBaseUrl = process.env.PROXY_MIDDLEWARE_API_BASE_URL;

/**
 * 開發時需要的 ReProxy, 避免Cors問題
 * doc: https://github.com/chimurai/http-proxy-middleware
 * ex:
 const apiProxy = createProxyMiddleware('/api', { target: 'http://www.example.org', pathRewrite: {}, changeOrigin: true });
                                        \____/   \_____________________________/
                                          |                    |
                                        context             options

 */

const devProxy = [
    createProxyMiddleware('/api', {target: proxyMiddlewareApiBaseUrl, changeOrigin: true}),
];

export default devProxy;
