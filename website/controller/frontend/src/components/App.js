import React, { Fragment } from "react"
import { Route, BrowserRouter, Switch } from "react-router-dom"
import LoginForm from "./LoginForm"
import Room from "./Room"
import RegisterForm from "./RegisterForm"
import AuthRoute from "./AuthRoute"
import FAQ from "./FAQ"
import Header from "./layout/Header"
import Footer from "./layout/Footer"


function App() {
    return (
        <Fragment>
            <Header />
                <BrowserRouter>
                    <Switch>
                        <AuthRoute exact path="/" component={Room} />
                        <Route exact path="/faq" component={FAQ} />
                        <Route exact path="/login" component={LoginForm} />
                        <Route exact path="/register" component={RegisterForm} />
                    </Switch>
                </BrowserRouter>
            <Footer />
        </Fragment>
    )
}




export default App