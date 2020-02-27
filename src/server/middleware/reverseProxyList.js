import {createProxyMiddleware} from 'http-proxy-middleware';
import get from 'lodash/get';

const proxyMiddlewareApiBaseUrl = get(process, 'env.PROXY_MIDDLEWARE_API_BASE_URL', '/api');

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
