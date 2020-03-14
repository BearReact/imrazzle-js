import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from '@pages/NotFound';
import Home from '@pages/Home';
import News from '@pages/News/List';
import Profile from '@pages/Profile';
import { PrivateRoute } from '@router';
function Router() {
    return (React.createElement(Switch, null,
        React.createElement(Route, { exact: true, path: "/", component: Home }),
        React.createElement(Route, { exact: true, path: "/news", component: News }),
        React.createElement(PrivateRoute, { exact: true, path: "/profile", component: Profile }),
        React.createElement(Route, { path: "*", component: NotFound })));
}
export default Router;
//# sourceMappingURL=Router.js.map