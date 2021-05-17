import React, { Component, Fragment } from "react"
import ReactDOM from "react-dom"
import { Route, BrowserRouter, Switch } from "react-router-dom"
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'

import { configureStore } from "../storeConfig"
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

const { store, persistor } = configureStore()

const appDiv = document.getElementById("app");
ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>, appDiv)