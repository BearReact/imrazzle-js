// @flow
import get from 'lodash/get';
import sites from '@config/site';
import {version} from '../../../package';

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
        // eslint-disable-next-line no-underscore-dangle
        return get(global.__global__, pathKey, '');
    }
};

/**
 * Server 產生站台設定
 * @param siteCode
 * @returns {{}|(T&{uploadPrefixUrl: *, staticPrefixUrl: *, version: *})}
 */
export const serverGenerateConfig = (siteCode = get(process,'env.SITE_CODE', 'default')) => {
    const siteConfig = sites.find(row => row.siteCode === siteCode);

    if(siteConfig === undefined){
        return {errorMessage: `throw Error: Site code could not find the site settings, please check SITE_CODE(${siteCode}) and src config/site.js`};
    }

    const routePrefixPath = get(process,'env.ROUTE_PREFIX_PATH');
    if(routePrefixPath === '/'){
        return {errorMessage: 'throw Error: Env ROUTE_PREFIX_PATH please fix "/" to ""'};
    }

    return {
        version: version,
        uploadPrefixUrl: get(process, 'env.UPLOAD_PREFIX_URL', '/uploads'),
        staticPrefixUrl: get(process, 'env.STATIC_PREFIX_URL', '/static'),
        routePrefixPath: routePrefixPath,
        ...siteConfig,
    };
};
