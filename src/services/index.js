var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { create } from 'apisauce';
import get from 'lodash/get';
import { autoMapper } from '@utils/format';
import { Selectors as LanguageSelectors } from '@store/Language/Reducer';
import { Selectors as AuthSelectors } from '@store/Auth/Reducer';
import LoginActions from '@store/Login/Reducer';
import { i18n } from '@i18n';
import { replace } from 'connected-react-router';
import { getConfig } from '@config/utils/getConfig';
const apiService = create({
    baseURL: getConfig('env.apiBaseUrl'),
    headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
    },
    timeout: 20000,
});
export const initApiMiddleware = (getState, dispatch) => {
    /**
     * Request After Middleware
     */
    apiService.addRequestTransform((request) => {
        // 語系設定
        request.headers['Accept-Language'] = LanguageSelectors.selectLanguage(getState());
        request.headers['Site-ID'] = getConfig('site.siteId');
        // 登入狀態設定
        const token = AuthSelectors.memberToken(getState());
        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }
    });
    /**
     * Response After Middleware
     */
    apiService.addResponseTransform((response) => {
        const reMappingResponse = autoMapper(response, {
            data: 'body',
        });
        const { ok, headers, status, problem, originalError, config, body } = reMappingResponse;
        if (ok) {
            /** 請求成功, 額外處理區塊 */
            // if (headers.Authentication) {
            // 設定認證
            // store.dispatch(AuthAction.setToken(response.data.token));
            // }
        }
        else {
            /** 請求失敗, 額外處理區塊 */
            // - all saga call api not check res.ok, then use catch handle error
            // - in here middleware throw error
            let message = '';
            if (status) {
                message = get(body, 'message', i18n({ id: `errorHttp.${status}` }));
                switch (status) {
                    case 401:
                        dispatch(LoginActions.kickSetGuest());
                        break;
                    case 511:
                        dispatch(replace('/no-access'));
                        break;
                }
                throw new Error(message);
            }
            else if (problem) {
                message = i18n({ id: `errorHttp.${problem}`, sec: { sec: config.timeout / 1000 } });
                throw new Error(message);
            }
        }
    });
};
/**
 * format rename response
 * @param func
 * @returns {{}}
 */
const reMapping = (func) => {
    return autoMapper(func, { data: 'body' });
};
export default {
    get: (...params) => __awaiter(void 0, void 0, void 0, function* () { return reMapping(yield apiService.get(...params)); }),
    post: (...params) => __awaiter(void 0, void 0, void 0, function* () { return reMapping(yield apiService.post(...params)); }),
    put: (...params) => __awaiter(void 0, void 0, void 0, function* () { return reMapping(yield apiService.put(...params)); }),
    delete: (...params) => __awaiter(void 0, void 0, void 0, function* () { return reMapping(yield apiService.delete(...params)); }),
};
//# sourceMappingURL=index.js.map