import React, { Fragment } from "react"
import { Route, BrowserRouter, Switch } from "react-router-dom"

import Profile from "./Profile"
import HomePage from "./HomePage"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import PrivateRoute from "./PrivateRoute"


export default function App() {
    return (
        <Fragment>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/login" component={LoginForm}/>
                    <Route exact path="/register" component={RegisterForm}/>
                    <PrivateRoute exact path="/profile" component={Profile}/>
                </Switch>
            </BrowserRouter>
        </Fragment>
    )
    
}
