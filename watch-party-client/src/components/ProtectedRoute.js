import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const isAuthenticated = () => {
    //TODO
    //localStorage.getItem("token")
    return true
}

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
            props => isAuthenticated() ?
                <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        } />
    );
}
