import React, { Component, Fragment } from "react"
import ReactDOM from "react-dom"
import { Route, BrowserRouter } from "react-router-dom"

import Header from "./layout/Header"
import Footer from "./layout/Footer"
import HomePage from "./HomePage"
import Login from "./Login"
import { CookiesProvider } from "react-cookie"


export default function App() {
    return (
        <CookiesProvider>
            <BrowserRouter>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/login" component={Login}/>
            </BrowserRouter>
        </CookiesProvider>
    )
    
}

const appDiv = document.getElementById("app");
ReactDOM.render(<App />, appDiv)