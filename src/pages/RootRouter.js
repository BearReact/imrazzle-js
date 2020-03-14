import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from '@pages/NotFound';
import HomeLayout from '@layouts/HomeLayout';
function RootRouter() {
    return (React.createElement(Switch, null,
        React.createElement(Route, { path: "/", component: HomeLayout }),
        React.createElement(Route, { path: "*", component: NotFound })));
}
export default RootRouter;
//# sourceMappingURL=RootRouter.js.map