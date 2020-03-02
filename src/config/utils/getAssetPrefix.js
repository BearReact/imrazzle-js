// @flow
import {getConfig} from '@config/utils/getConfig';

/**
 * 串接前端的靜態資源基礎網址
 * @param path 檔案的網址路徑
 * @returns {string}
 */
export function asset(path) {
    return `${getConfig('env.staticPrefixUrl', '')}${path}`;
}

/**
 * 串後端檔案上傳檔案的基礎網址
 * @param path 檔案的網址路徑
 * @returns {*}
 */
export function uploadUrl(path: string = '') {
    return `${getConfig('env.uploadPrefixUrl', '')}${path}`;
}

/**
 * 串接前端的路由基礎網址
 * @param path 檔案的網址路徑
 * @returns {string}
 */
export function routePath(path) {
    return (`${getConfig('env.routePrefixPath', '')}/${path}`).replace('//','/');
}
