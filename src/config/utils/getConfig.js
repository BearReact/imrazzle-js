// @flow
import get from 'lodash/get';
import sites from '@config/site';
import appConfig from '@config/app';
import {version} from '../../../package';

// env setting
const env = {
    staticPrefixUrl: get(process, 'env.STATIC_PREFIX_URL', appConfig.defaultStaticPrefixUrl),
    uploadPrefixUrl: get(process, 'env.STATIC_PREFIX_URL', appConfig.defaultUploadPrefixUrl),
    apiBaseUrl: get(process, 'env.API_BASE_URL', appConfig.defaultApiBaseUrl),
};

/**
 * Client & Server 取得站台設定
 * @param pathKey
 * @param defaultReturn
 */
export const getConfig = (pathKey, defaultReturn) => {
    if(typeof window !== 'undefined'){
        // eslint-disable-next-line no-underscore-dangle
        return get(window.__global__, pathKey, '');
    }else{
        if(get(env, pathKey, false)){
            return env[pathKey];
        }
        // eslint-disable-next-line no-underscore-dangle
        return get(global.__global__, pathKey, '');
    }
};

/**
 * Server 產生站台設定
 * @param siteCode
 * @returns {{}|(T&{uploadPrefixUrl: *, staticPrefixUrl: *, version: *})}
 */
export const serverGenerateConfig = siteCode => {
    const siteConfig = sites.find(row => row.siteCode === siteCode);

    if(siteConfig === undefined){
        return {errorMessage: `throw Error: Site code could not find the site settings, please check SITE_CODE(${siteCode}) and src config/site.js`};
    }

    const routePrefixPath = get(process,'env.ROUTE_PREFIX_PATH');
    if(routePrefixPath === '/'){
        return {errorMessage: 'throw Error: Env ROUTE_PREFIX_PATH please fix "/" to ""'};
    }

    const config = {
        version: version,
        staticPrefixUrl: env.staticPrefixUrl,
        uploadPrefixUrl: env.uploadPrefixUrl,
        routePrefixPath: routePrefixPath,
        ...siteConfig,
    };
    // eslint-disable-next-line no-underscore-dangle
    global.__global__ = config;

    return config;
};
