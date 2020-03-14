import { takeLatest } from 'redux-saga/effects';
import { Types } from './Reducer';
/**
 * 查詢館別參加活動的資訊
 * @returns {IterableIterator<*>}
 * @param payload
 */
export function* changeLanguage(payload) {
}
export default [
    takeLatest(Types.CHANGE_LOCALE, changeLanguage),
];
//# sourceMappingURL=Saga.js.map