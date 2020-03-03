// @flow
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import NotFound from '@pages/NotFound';
import Home from '@pages/Home';
import News from '@pages/News/List';
import Profile from '@pages/Profile';

function Router() {

    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            {/*<Route exact path="/about" component={About} />*/}
            <Route exact path="/news" component={News}/>
            <Route exact path="/profile" component={Profile}/>
            <Route path="*" component={NotFound}/>
        </Switch>
    );
}

export default Router;