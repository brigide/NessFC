import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './pages/Home';
import Players from './pages/Players';
import Player from './pages/Player';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/players" exact component={Players} />
                <Route path="/players/:id" component={Player} />
            </Switch>
        </BrowserRouter>
    );
}