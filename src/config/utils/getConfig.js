// @flow
import get from 'lodash/get';
import sites from '@config/site';
import {version} from '../../../package';

/**
 * 取得站台設定
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
 * 產生站台設定
 * @param siteCode
 * @returns {{}|(T&{uploadPrefix: *, staticPrefix: *, version: *})}
 */
export const generateConfig = (siteCode = get(process,'env.SITE_CODE', 'default')) => {
    const siteConfig = sites.find(row => row.siteCode === siteCode);

    if(siteConfig === undefined){
        return {};
    }

    return {
        version: version,
        uploadPrefix: get(process, 'env.UPLOAD_PREFIX_URL', '/uploads'),
        staticPrefix: get(process, 'env.STATIC_PREFIX_URL', '/static'),
        ...siteConfig,
    };
};
