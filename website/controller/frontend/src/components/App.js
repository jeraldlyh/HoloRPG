import React, { Component, Fragment } from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"

import store from "../store"
import Header from "./layout/Header"
import Footer from "./layout/Footer"
import HomePage from "./HomePage"
import Login from "./Login"


export default function App() {
    return (
        <div className="flex flex-col">
            <Header />
            {/* <HomePage /> */}
            <Login />
            <Footer />
        </div>
    )
    
}

const appDiv = document.getElementById("app");
ReactDOM.render(<App />, appDiv)