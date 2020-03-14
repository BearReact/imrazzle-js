/* eslint-disable */
import { take, call, select, } from 'redux-saga/effects';
import get from 'lodash/get';
import setWith from 'lodash/setWith';
import Cookies from 'universal-cookie';
import appConfig from '@config/app';
import { isEmpty } from '@utils/equal';
import { PRELOAD_STATE } from '../../../../constants';
/**
 * 將 Redux狀態同步到Cookie
 * @returns {IterableIterator<*>}
 */
function* watchStateSyncCookie() {
    const cookies = new Cookies();
    const { reduxPreloadWhileList } = appConfig;
    while (true) {
        yield take('*');
        let newPreloadState = {};
        // 目前 Cookie State Object
        let preloadState = cookies.get(PRELOAD_STATE) || {};
        // 目前 Redux State Object
        const reduxState = yield select(state => state);
        for (let i = 0; i < reduxPreloadWhileList.length; i++) {
            const statePath = reduxPreloadWhileList[i];
            const selectState = get(reduxState, statePath);
            const selectPreloadState = get(preloadState, statePath, null);
            if (selectState !== selectPreloadState) {
                newPreloadState = setWith(newPreloadState, statePath, selectState, Object);
            }
        }
        // 將新的更新同步到Cookie
        if (!isEmpty(newPreloadState)) {
            cookies.set(PRELOAD_STATE, newPreloadState, { path: '/' });
        }
    }
}
export default [
    call(watchStateSyncCookie),
];
//# sourceMappingURL=Saga.js.map