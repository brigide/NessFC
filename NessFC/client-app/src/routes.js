import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './pages/Home';
import Players from './pages/Players';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/players" component={Players} />
            </Switch>
        </BrowserRouter>
    );
}