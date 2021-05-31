import React, { Fragment } from "react"
import { Route, BrowserRouter, Switch } from "react-router-dom"
import Login from "./pages/Login"
import Room from "./pages/Room"
import Bounty from "./pages/Bounty"
import Register from "./pages/Register"
import FAQ from "./pages/FAQ"
import Leaderboard from "./pages/Leaderboard"
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"


function App() {
    return (
        <Fragment>
            <Header />
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Bounty} />
                        <Route exact path="/room" component={Room} />
                        <Route exact path="/faq" component={FAQ} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/leaderboard" component={Leaderboard} />
                    </Switch>
                </BrowserRouter>
            <Footer />
        </Fragment>
    )
}




export default App