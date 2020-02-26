// @flow
import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import HomeLayout from '../layouts/HomeLayout';

function RootRouter() {

    return (
        <Switch>
            <Route path="/" component={HomeLayout}/>

            <Link to="/">GO HOME</Link><br/>
            <Link to="/about">GO ABOUT</Link>
            <Link to="/news">GO NEWS</Link>
        </Switch>
    );
}

export default RootRouter;
