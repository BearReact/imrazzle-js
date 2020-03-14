import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const PREFIX = 'profile';

/** -----------------------------------------
 Initial State
 /** ---------------------------------------*/
export const INITIAL_STATE = Immutable({
    isFetching: false,
    message: '',
    currentData: null,
});

/** -----------------------------------------
 Selectors
 /** --------------------------------------*/
export const Selectors = {
    queryParam: (state: any) => state[PREFIX].queryParam,
};

/** -----------------------------------------
 Types and Action Creators
 /** ---------------------------------------*/
export const {Types, Creators: Action}: any = createActions(
    {
        // 取明細
        fetchCurrent: null,
        fetchCurrentBegin: null,
        fetchCurrentSuccess: ['data'],
        fetchCurrentFail: ['message'],
    },
    {prefix: `${PREFIX}/`}
);

/** -----------------------------------------
 Reducers
 /** ---------------------------------------*/

const Reducers = {
    // 查詢明細
    FetchCurrent: {
        begin(state: any) {
            return state.merge({
                isFetching: true,
                currentData: null,
            });
        },
        success(state: any, action: any) {
            return state.merge({
                isFetching: false,
                currentData: action.data,
                message: null,
            });
        },
        fail(state: any, action: any) {
            return state.merge({
                isFetching: false,
                message: action.message,
            });
        },
    },
};

/** ---------------------------------------------------------------
 Hookup Reducers To Types (注意更改 Types, Saga對應必須同步更改)
 /** -------------------------------------------------------------*/
export const reducer = createReducer(INITIAL_STATE, {
    [Types.FETCH_CURRENT_BEGIN]: Reducers.FetchCurrent.begin,
    [Types.FETCH_CURRENT_SUCCESS]: Reducers.FetchCurrent.success,
    [Types.FETCH_CURRENT_FAIL]: Reducers.FetchCurrent.fail,
});
