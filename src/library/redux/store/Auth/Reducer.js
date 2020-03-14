import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';
import get from 'lodash/get';
const PREFIX = 'auth';
/** -----------------------------------------
 Initial State
 /** ---------------------------------------*/
export const INITIAL_STATE = Immutable({
    memberToken: null,
});
/** -----------------------------------------
 Selectors
 /** --------------------------------------*/
export const Selectors = {
    memberToken: (state) => state[PREFIX].memberToken,
    payload: (state) => {
        try {
            return jwtDecode(state[PREFIX].memberToken);
        }
        catch (e) {
            return {};
        }
    },
    isAuth: (state) => {
        try {
            const payload = jwtDecode(state[PREFIX].memberToken);
            const expiredTime = get(payload, 'exp', 0);
            // 比對現在時間是否超出過期時間
            return dayjs(expiredTime).diff(dayjs()) <= 0;
        }
        catch (e) {
            return false;
        }
    },
};
/** -----------------------------------------
 Types and Action Creators
 /** ---------------------------------------*/
export const { Types, Creators } = createActions({
    // 登入系統
    handleSetAuth: ['memberToken'],
    // 登出系統
    handleClearAuth: null,
}, {
    prefix: `${PREFIX}/`,
});
export default Creators;
/** -----------------------------------------
 Reducers
 /** ---------------------------------------*/
const Reducers = {
    // 設定登入資訊
    handleSetAuth(state, action) {
        return state.merge({
            memberToken: action.memberToken,
        });
    },
    // 清除登入資訊
    handleClearAuth(state, action) {
        return state.merge({
            memberToken: null,
        });
    },
};
/** ---------------------------------------------------------------
 Hookup Reducers To Types (注意更改 Types, Saga對應必須同步更改)
 /** -------------------------------------------------------------*/
export const reducer = createReducer(INITIAL_STATE, {
    [Types.HANDLE_SET_AUTH]: Reducers.handleSetAuth,
    [Types.HANDLE_CLEAR_AUTH]: Reducers.handleClearAuth,
});
//# sourceMappingURL=Reducer.js.map