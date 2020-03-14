import {call, put, takeLatest} from 'redux-saga/effects';

import React from 'react';
import {Types} from './Reducer';

/**
 * 查詢館別參加活動的資訊
 * @returns {IterableIterator<*>}
 * @param payload
 */
export function* changeLanguage(payload: any) {

}

export default [
    takeLatest(Types.CHANGE_LOCALE, changeLanguage),
];
