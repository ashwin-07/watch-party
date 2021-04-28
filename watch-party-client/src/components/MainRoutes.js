
import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute';
import Login from '../features/auth/Login';
import Signup from '../features/auth/Signup';
import Room from '../features/room/Room';
import UserHome from '../features/userhome/UserHome';

function MainRoutes() {
    const location = useLocation();
    return (
        <Switch location={location}>
            <ProtectedRoute path="/" component={UserHome} exact />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/room/:id" component={Room} />
        </Switch>
    )
}

export default MainRoutes
