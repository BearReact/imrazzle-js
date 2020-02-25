/* eslint-disable no-underscore-dangle */
/**
 * Create the store with dynamic reducers
 */

import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
// import StartupActions from '@library/redux/store/Startup/Reducer';
// import {createApiService} from '@config/utils/configureApi';
// import appConfig from '@config/app';
// import reduxPersist from './config/reduxPersist';
import createReducer from './reducers';
// import Rehydration from './utils/rehydration';
import rootSaga from './store/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(preloadState = {}, history = null) {
    const isServer = typeof window === 'undefined';

    // Create the store with two middlewares
    // 1. sagaMiddleware: Makes redux-sagas work
    // 2. routerMiddleware: Syncs the location/URL path to the state
    const middlewares = [sagaMiddleware];

    if(history){
        middlewares.push(routerMiddleware(history));
    }
    const enhancers = [applyMiddleware(...middlewares)];

    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    const composeEnhancers = (process.env.NODE_ENV !== 'production'
        && !isServer
        // eslint-disable-next-line no-underscore-dangle
        && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
        || compose;


    const store = createStore(createReducer(), preloadState, composeEnhancers(...enhancers));


    // Create an object for any later reducers
    store.asyncReducers = {};
    store.asyncSagas = {};

    // Create an inject reducer function
    // This function adds the async reducer, and creates a new combined reducer
    store.injectReducer = (key, asyncReducer) => {
        store.asyncReducers[key] = asyncReducer;
        store.replaceReducer(createReducer(store.asyncReducers));
        return store;
    };

    // install Saga
    store.sagaTask = sagaMiddleware.run(rootSaga);

    // runSaga is middleware.run function
    // rootSaga is a your root saga for static saagas
    store.injectSaga = (key, saga) => {
        // Create a dictionary to keep track of injected sagas
        const isInjected = checkKey => typeof store.asyncSagas[checkKey] !== 'undefined';

        // We won't run saga if it is already injected
        if (isInjected(key)) return;

        // Sagas return task when they executed, which can be used
        // to cancel them
        sagaMiddleware.run(saga);

        // Save the task if we want to cancel it in the future
        store.asyncSagas[key] = key;
    };

    return store;
}