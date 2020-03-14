import { call, put, takeLatest, delay, } from 'redux-saga/effects';
import ApiService from '@services/Profile';
import { Action, Types } from './Reducer';
/**
 * 取明細資料
 * @returns {IterableIterator<*>}
 */
export function* fetchCurrent() {
    try {
        yield put(Action.fetchCurrentBegin());
        const { body } = yield call(ApiService.getProfile);
        yield delay(1000);
        yield put(Action.fetchCurrentSuccess(body.data));
    }
    catch (e) {
        yield put(Action.fetchCurrentFail(e.message));
    }
}
export default function* injectSagaRoot() {
    yield takeLatest(Types.FETCH_CURRENT, fetchCurrent);
}
//# sourceMappingURL=Saga.js.map