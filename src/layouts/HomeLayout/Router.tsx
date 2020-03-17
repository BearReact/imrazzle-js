import React from 'react';
import {Switch, Route} from 'react-router-dom';
import NotFound from '@pages/NotFound';
import Home from '@pages/Home';
import News from '@pages/News/List';
import Profile from '@pages/Profile';
import {PrivateRoute} from '@router';

function Router() {

    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/news" component={News}/>
            <PrivateRoute exact path="/profile" component={Profile}/>

            <Route path="*" component={NotFound}/>
        </Switch>
    );
}

export default Router;
