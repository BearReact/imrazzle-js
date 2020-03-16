import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';
// import {DEFAULT_LOCALE} from '@i18n/i18n';
// import {CHANGE_LOCALE} from '@i18n/LanguageProvider/constants';

const PREFIX = 'language';

/** -----------------------------------------
 Initial State
 /** ---------------------------------------*/
export const INITIAL_STATE = Immutable({
    locale: 'en-US',
});

/** -----------------------------------------
 Selectors
 /** --------------------------------------*/
export const Selectors = {
    selectLanguage: (state: any) => state[PREFIX].locale,
};

/** -----------------------------------------
 Types and Action Creators
 /** ---------------------------------------*/
export const {Types, Creators}: any = createActions(
    {
        changeLocale: ['locale'],
    },
    {prefix: `${PREFIX}/`},
);

export default Creators;

/** -----------------------------------------
 Reducers
 /** ---------------------------------------*/

const Reducers = {
    changeLocale(state: any, action: any) {
        return state.merge({
            locale: action.locale,
        });
    },
};

/** ---------------------------------------------------------------
 Hookup Reducers To Types (注意更改 Types, Saga對應必須同步更改)
 /** -------------------------------------------------------------*/
export const reducer = createReducer(INITIAL_STATE, {
    [Types.CHANGE_LOCALE]: Reducers.changeLocale,
});
