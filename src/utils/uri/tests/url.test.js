import config from '@config/app';
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
        expect(getMainDomain('vv-5a.test88b.net')).toBe('test88b.net');
        expect(getMainDomain('vv.ibet.test-88b.net')).toBe('test-88b.net');
    });

    it('取得子網域(最後一段)', () => {
        expect(getSubDomain('www.google.com')).toBe('www');
        expect(getSubDomain('vv-5a.test88b.net')).toBe('vv-5a');
        expect(getSubDomain('vv.ibet.test88b.net')).toBe('vv');
    });
});
