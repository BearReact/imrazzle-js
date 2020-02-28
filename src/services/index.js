// @flow

import {create} from 'apisauce';
import get from 'lodash/get';

import {isEmpty} from '@utils/equal';
import {autoMapper} from '@utils/format';
// import {i18n} from '@library/i18next/configureI18Next';
// import {Selectors as AuthSelectors} from '@library/redux/store/Auth/Reducer';
// import LoginActions from '@library/redux/store/Login/Reducer';
import store from '@library/redux/configureStore';
import {i18n} from '@library/intl/global';
import {replace} from 'connected-react-router';

const apiService = create({
    baseURL: get(process,'env.API_BASE_URL', '/api'),
    headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        // 'Accept-Language': __global__.defaultLang,
        // 'Site-ID': __global__.siteId,
    },
    timeout: 20000,
});

/**
 * Request After Middleware
 */
apiService.addRequestTransform(request => {

    // 語系設定
    // request.headers['Accept-Language'] = i18n.language;
    //
    // const token = AuthSelectors.token(store.getState());
    // if (token) {
    //     request.headers.Authorization = `Bearer ${token}`;
    // }
});

/**
 * Response After Middleware
 */
apiService.addResponseTransform(response => {
    const reMappingResponse = autoMapper(response, {
        data: 'body',
    });

    const {ok, headers, status, problem, originalError, config, body} = reMappingResponse;

    if (ok) {
        /** 請求成功, 額外處理區塊 */
        // if (headers.Authentication) {
        // 設定認證
        // store.dispatch(AuthAction.setToken(response.data.token));
        // }

    } else {
        /** 請求失敗, 額外處理區塊 */
        // - all saga call api not check res.ok, then use catch handle error
        // - in here middleware throw error

        let message = '';
        if (status) {
            message = get(body, 'message', i18n({id: `errorHttp.${status}`}));

            switch (status) {
                case 401:
                    // store.dispatch(LoginActions.kickSetGuest());
                    break;
                case 511:
                    store.dispatch(replace('/no-access'));
                    break;
            }
            throw new Error(message);

        } else if (problem) {
            message = i18n({id: `errorHttp.${problem}`, sec: {sec: config.timeout / 1000}});
            throw new Error(message);

        }
    }
});

/**
 * format rename response
 * @param func
 * @returns {{}}
 */
const reMapping = func => {
    return autoMapper(func, {data: 'body'});
};

export default {
    get: async (...params) => reMapping(await apiService.get(...params)),
    post: async (...params) => reMapping(await apiService.post(...params)),
    put: async (...params) => reMapping(await apiService.put(...params)),
    delete: async (...params) => reMapping(await apiService.delete(...params)),
};
