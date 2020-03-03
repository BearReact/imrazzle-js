import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import jwtDecode from 'jwt-decode';

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
    memberToken: state => state[PREFIX].memberToken,
    tokenInfo: state => {
        try {
            return jwtDecode(state[PREFIX].memberToken);
        } catch(e) {
            return {};
        }
    },
};

/** -----------------------------------------
 Types and Action Creators
 /** ---------------------------------------*/
export const {Types, Creators} = createActions(
    {
        // 登入系統
        handleSetAuth: ['memberToken'],

        // 登出系統
        handleClearAuth: null,
    },
    {
        prefix: `${PREFIX}/`,
    }
);

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
