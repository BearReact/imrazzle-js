/* eslint-disable global-require */
import { all } from 'redux-saga/effects';
import Startup from './Startup/Saga';
import Login from './Login/Saga';
/** -----------------------------------------
            Connect Types To Sagas
 /** --------------------------------------*/
const rootSaga = function* root() {
    yield all([
        ...Startup,
        ...Login,
    ]);
};
export default rootSaga;
//# sourceMappingURL=rootSaga.js.map