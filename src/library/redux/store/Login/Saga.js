import {
    call, put, takeLatest, select, take, delay,
} from 'redux-saga/effects';
import get from 'lodash/get';

import ApiService from '@services/Auth';
import Actions, {Types} from './Reducer';
import AuthActions from '../Auth/Reducer';

/**
 * 使用者登入
 * @returns {IterableIterator<*>}
 */
export function* submitLogin(payload) {

    try {
        yield put(Actions.submitLoginBegin());
        const {
            formParam: {email},
        } = payload;

        // call api
        const {body} = yield call(ApiService.submitLogin, email.trim());

        const memberToken = get(body, 'data.memberToken', '');
        yield put(AuthActions.handleSetAuth(memberToken));
        yield put(Actions.submitLoginSuccess());

    } catch (e) {
        yield put(Actions.submitLoginFail(e.message));
        window.alert(e.message);
    }
}

/**
 * 使用者登出
 * @returns {IterableIterator<*>}
 */
export function* submitLogout(payload) {

    try {
        yield put(Actions.submitLogoutBegin());

        const {body} = yield call(ApiService.submitLogout);

        // 清除權限設定
        yield put(AuthActions.handleClearAuth());
        yield put(Actions.submitLogoutSuccess());

    } catch (e) {
        yield put(Actions.submitLogoutFail(e.message));
        window.alert(e.message);
    }
}

export default [
    takeLatest(Types.SUBMIT_LOGIN, submitLogin),
    takeLatest(Types.SUBMIT_LOGOUT, submitLogout),
];
