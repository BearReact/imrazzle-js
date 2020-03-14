/* eslint-disable global-require */
/** -----------------------------------------
            Assemble The Reducers
 /** ---------------------------------------*/
const rootReducers = {
    language: require('./Language/Reducer').reducer,
    auth: require('./Auth/Reducer').reducer,
    login: require('./Login/Reducer').reducer,
    ui: require('./Ui/Reducer').reducer,
};
export default rootReducers;
//# sourceMappingURL=rootReducers.js.map