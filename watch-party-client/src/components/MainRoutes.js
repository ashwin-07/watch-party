
import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import Room from '../features/room/Room';
import UserHome from '../features/userhome/UserHome';

function MainRoutes() {
    const location = useLocation();
    return (
        <Switch location={location}>
            <Route path="/" component={UserHome} exact />
            <Route path="/room/:id" component={Room} />
        </Switch>
    )
}

export default MainRoutes
