import React, { Fragment } from "react"
import { Route, BrowserRouter, Switch } from "react-router-dom"
import Profile from "./Profile"
import HomePage from "./HomePage"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import PrivateRoute from "./PrivateRoute"
import FAQ from "./FAQ"
import Header from "./layout/Header"
import Footer from "./layout/Footer"
import FriendBar from "./layout/FriendBar"
import ProfileCard from "./layout/ProfileCard"


export default function App() {
    return (
        <Fragment>
            <Header />
            <div className="grid grid-cols-3 mx-10 my-5 min-h-screen justify-items-center" style={{gridTemplateColumns: "255px 1fr 255px"}}>
                <FriendBar />
                <BrowserRouter>
                    <Switch>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <Route exact path="/faq" component={FAQ} />
                        <Route exact path="/login" component={LoginForm} />
                        <Route exact path="/register" component={RegisterForm} />
                        <PrivateRoute exact path="/profile" component={Profile} />
                    </Switch>
                <ProfileCard />
                </BrowserRouter>
            </div>
            <Footer />
        </Fragment>
    )
    
}
