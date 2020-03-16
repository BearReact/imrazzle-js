/**
 * 千分位格式化
 * @param val 原數值
 * @param isDecimal2 保留小數2位
 * @returns {string}
 */
export function formatCurrency(val: number = 0, isDecimal2 = true) {
    const dec = isDecimal2 ? toDecimal2(val) : Math.floor(val);
    const parts = dec.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

/**
 * 保留小數第二位
 * @returns {string}
 * @param x
 */
export function toDecimal2(x: any) {
    let f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    f = Math.round( x * 100) / 100;
    let s = f.toString();
    let rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}

/**
 * 取得數組中的交集最小範圍
 * obj = [
 *    [1, 20],
 *    [5, 24]
 * ]
 *
 * result = {min: 5, max: 20}
 * @param obj
 */
export function intersectionMin(...obj: any){
    let min: any = 0;
    let max: any = null;

    function isEmpty(value: any, isCheckNumber0 = false) {
        return (
            value === undefined
            || value === null
            || value === false
            || (isCheckNumber0 && value === 0)
            || (!(value instanceof Date) && typeof value === 'object' && Object.keys(value).length === 0)
            || (typeof value === 'string' && value.trim().length === 0)
        );
    }

    obj.map((o: any) => {
        min = !isEmpty(o[0], true) && o[0] > min ? o[0] : min;
        max = !isEmpty(o[1], true) && (o[1] < max || max === null) ? o[1] : max;
        return true;
    });

    if(min > max){
        min = null;
        max = null;
    }
    return {min, max};
}
