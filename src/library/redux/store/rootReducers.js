/* eslint-disable global-require */

/** -----------------------------------------
            Assemble The Reducers
 /** ---------------------------------------*/
const rootReducers = {

    language: require('./Language/Reducer').reducer,
    ui: require('./Ui/Reducer').reducer,

};

export default rootReducers;
