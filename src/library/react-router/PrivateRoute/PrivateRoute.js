var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { Route, Redirect, } from 'react-router-dom';
// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute = (_a) => {
    var { isAuth, intl, component: Component, children } = _a, rest = __rest(_a, ["isAuth", "intl", "component", "children"]);
    const isClient = typeof window !== 'undefined';
    const { formatMessage: i18n } = intl;
    return (React.createElement(Route, Object.assign({}, rest, { render: (_a) => {
            var { location } = _a, props = __rest(_a, ["location"]);
            if (isAuth) {
                return React.createElement(Component, Object.assign({}, props));
            }
            if (isClient)
                window.alert(i18n({ id: 'errorHttp.401' }));
            return (React.createElement(Redirect, { to: {
                    pathname: '/',
                    state: { from: location },
                } }));
        } })));
};
export default PrivateRoute;
//# sourceMappingURL=PrivateRoute.js.map