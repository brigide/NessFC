import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './pages/Home';
import Players from './pages/Players';
import Player from './pages/Player';
import Positions from './pages/Positions';
import Position from './pages/Position';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/players" exact component={Players} />
                <Route path="/players/:id" component={Player} />
                <Route path="/positions" exact component={Positions} />
                <Route path="/positions/:id" component={Position} />
            </Switch>
        </BrowserRouter>
    );
}