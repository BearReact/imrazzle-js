/* eslint-disable global-require */

import {all} from 'redux-saga/effects';
import Startup from './Startup/Saga';
import Login from './Login/Saga';

/** -----------------------------------------
            Connect Types To Sagas
 /** --------------------------------------*/
const rootSaga = function* root() {
    yield all([
        // ...require('@library/intl/store/Saga').default,
        ...Startup,
        ...Login,
        // ...require('./System/Saga').default,
        // ...require('./Notice/Saga').default,
        //
        // ...require('./Home/Saga').default,
        // ...require('./GameLobby/Saga').default,
        // ...require('./Promotion/Saga').default,
        // ...require('./Deposit/Saga').default,
        //
        // ...require('./Withdrawal/Saga').default,
        // ...require('./Profile/Saga').default,
        // ...require('./Wallet/Saga').default,
        // ...require('./History/Saga').default,
        // ...require('./Vip/Saga').default,

    ]);
};

export default rootSaga;
