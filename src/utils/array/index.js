/**
 * 插入資料到陣列的第一筆
 * @param arrayData
 * @param pushData
 * @returns {*[]}
 */
export function insert(arrayData, pushData) {
    return [pushData].concat(arrayData.slice(0));
}
/**
 * 插入資料到陣列的結尾
 * @param arrayData
 * @param pushData
 * @returns {*[]}
 */
export function push(arrayData, pushData) {
    return arrayData.slice(0).concat(pushData);
}
//# sourceMappingURL=index.js.map