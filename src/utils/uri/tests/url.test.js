import {serialize, parseQueryString, getMainDomain, getSubDomain} from '../index';

describe('test utils uri', () => {

    it('Obj轉QueryString', () => {
        expect(serialize({id: 12, isHidden: false})).toBe('id=12&isHidden=false');
    });

    it('解析 Search QueryString 轉成 物件', () => {
        expect(parseQueryString('id=12&isHidden=false')).toEqual(expect.objectContaining({
            id: '12',
            isHidden: 'false',
        }));
    });

    it('取得主網域(二級域名)', () => {
        expect(getMainDomain('www.google.com')).toBe('google.com');
        expect(getMainDomain('vv-5a.test22b.net')).toBe('test22b.net');
        expect(getMainDomain('vv.ibet.test-22b.net')).toBe('test-22b.net');
    });

    it('取得子網域(最後一段)', () => {
        expect(getSubDomain('www.google.com')).toBe('www');
        expect(getSubDomain('vv-5a.test22b.net')).toBe('vv-5a');
        expect(getSubDomain('vv.ibet.test22b.net')).toBe('vv');
    });
});
