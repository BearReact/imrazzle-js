// @flow

/**
 * PX轉VW
 * @param pixels PX值
 * @param pixelTotal 設計稿的寬度
 * @returns {string}
 */
export default function px2vw(pixels: number, pixelTotal: number = 320) {
    return `${(pixels / pixelTotal) * 100}vw`;
}
