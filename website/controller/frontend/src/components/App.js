import React, { Fragment, useEffect } from "react"
import { Route, BrowserRouter, Switch } from "react-router-dom"
import { connect } from "react-redux"
import { loadUser } from "../actions/auth"
import HomePage from "./HomePage"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import AuthRoute from "./AuthRoute"
import FAQ from "./FAQ"
import Header from "./layout/Header"
import Footer from "./layout/Footer"


function App(props) {
    useEffect(() => {
        props.authenticateUser()
    }, [])

    return (
        <Fragment>
            <Header />
                <BrowserRouter>
                    <Switch>
                        <AuthRoute exact path="/" component={HomePage} />
                        <Route exact path="/faq" component={FAQ} />
                        <Route exact path="/login" component={LoginForm} />
                        <Route exact path="/register" component={RegisterForm} />
                        <AuthRoute exact path="/profile" component={Profile} />
                    </Switch>
                </BrowserRouter>
            <Footer />
        </Fragment>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        authenticateUser: () => dispatch(loadUser()),
    }
}

export default connect(null, mapDispatchToProps)(App)