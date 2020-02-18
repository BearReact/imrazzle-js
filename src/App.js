import React from 'react';
import {Route,Switch, Link} from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import BlockTitle from "@components/atoms/BlockTitle";


const App = () => (
    <>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
          </Switch>
          <Link to="/">GO HOME</Link><br/>
          <Link to="/about">GO ABOUT</Link>
    </>
);

export default App;
