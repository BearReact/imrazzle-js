import get from 'lodash/get';
import dotenv from 'dotenv';
import sites from '@config/site';
import appConfig from '@config/app';
import { version } from '../../../package.json';
dotenv.config();
// env setting
const initConfig = {
    version: version,
    env: {
        siteENV: get(process, 'env.SITE_ENV', 'production'),
        staticPrefixUrl: get(process, 'env.STATIC_PREFIX_URL', appConfig.defaultStaticPrefixUrl),
        uploadPrefixUrl: get(process, 'env.UPLOAD_PREFIX_URL', appConfig.defaultUploadPrefixUrl),
        apiBaseUrl: get(process, 'env.API_BASE_URL', appConfig.defaultApiBaseUrl),
        routePrefixPath: get(process, 'env.ROUTE_PREFIX_PATH', appConfig.defaultRoutePrefixPath),
    },
    // in serverGenerateConfig set, if your only one site, you can set here!
    site: undefined,
};
/**
 * Client & Server 取得站台設定
 * @param pathKey
 * @param defaultReturn
 */
export const getConfig = (pathKey, defaultReturn) => {
    if (typeof window !== 'undefined') {
        // @ts-ignore
        return get(window.__global__, pathKey, defaultReturn);
    }
    else {
        if (get(initConfig, pathKey, false)) {
            return get(initConfig, pathKey, defaultReturn);
        }
        // @ts-ignore
        return get(global.__global__, pathKey, defaultReturn);
    }
};
/**
 * Server 產生站台設定
 * @param siteCode
 * @returns {{errorMessage: string}|*}
 */
export const serverGenerateConfig = (siteCode) => {
    const siteConfig = sites.find(row => row.siteCode === siteCode);
    if (siteConfig === undefined) {
        return { errorMessage: `throw Error: Site code could not find the site settings, please check SITE_CODE(${siteCode}) and src config/site.js` };
    }
    // @ts-ignore
    global.__global__ = Object.assign({}, initConfig, {
        site: Object.assign(Object.assign({}, siteConfig), { siteId: get(siteConfig, `siteId.${initConfig.env.siteENV}`) }),
    });
    // @ts-ignore
    return global.__global__;
};
//# sourceMappingURL=getConfig.js.map