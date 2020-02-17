/* eslint-disable global-require */

/** -----------------------------------------
            Assemble The Reducers
 /** ---------------------------------------*/
const rootReducers = {

    ui: require('./Ui/Reducer').reducer,

};

export default rootReducers;
