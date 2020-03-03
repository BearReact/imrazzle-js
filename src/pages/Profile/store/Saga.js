import {
    call, put, takeLatest, delay, race, all,
} from 'redux-saga/effects';
import ApiService from '@services/Profile';
import Actions, {Types} from './Reducer';

/**
 * 取明細資料
 * @returns {IterableIterator<*>}
 */
export function* fetchCurrent() {
    try {
        yield put(Actions.fetchCurrentBegin());

        const {body} = yield call(ApiService.getProfile);

        yield delay(1000);

        yield put(Actions.fetchCurrentSuccess(body.data));

    } catch (e) {
        yield put(Actions.fetchCurrentFail(e.message));
    }
}

export default function* injectSagaRoot() {
    yield takeLatest(Types.FETCH_CURRENT, fetchCurrent);
}
