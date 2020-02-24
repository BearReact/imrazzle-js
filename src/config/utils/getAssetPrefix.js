// @flow
import getConfig from '@config/utils/getConfig';

/**
 * 串後端檔案上傳檔案的基礎網址
 * @param path 檔案的網址路徑
 * @returns {*}
 */
export function uploadUrl(path: string = '') {
    let fixPath = '';

    if (path) {
        fixPath = path.charAt(0) === '/' ? path.substr(1) : path;
        return `${getConfig('uploadPrefix')}/${fixPath}`;
    }
    return undefined;
}

/**
 * 串接前端的靜態資源基礎網址
 * @param path 檔案的網址路徑
 * @returns {string}
 */
export function asset(path) {
    return `${getConfig('staticPrefix')}/${path}`;
}
