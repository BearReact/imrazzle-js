
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import NotFound from '@pages/NotFound';
import HomeLayout from '@layouts/HomeLayout';

function RootRouter() {

    return (
        <Switch>
            <Route path="/" component={HomeLayout}/>
            <Route path="*" component={NotFound}/>
        </Switch>
    );
}

export default RootRouter;
