import React, { Fragment } from "react"
import { Route, BrowserRouter, Switch } from "react-router-dom"
import Login from "./components/Login"
import Room from "./components/Room"
import Register from "./components/Register"
import FAQ from "./components/FAQ"
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"


function App() {
    return (
        <Fragment>
            <Header />
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Room} />
                        <Route exact path="/faq" component={FAQ} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                    </Switch>
                </BrowserRouter>
            <Footer />
        </Fragment>
    )
}




export default App