import React from "react"
import { Route, BrowserRouter, Switch } from "react-router-dom"
import Login from "./pages/Login"
import Room from "./pages/Room(old)"
import Profile from "./pages/Profile"
import Bounty from "./pages/Bounty"
import Register from "./pages/Register"
import Leaderboards from "./pages/Leaderboards(old)"
import Shop from "./pages/Shop(old)"
import CustomRoute from "./components/CustomRoute(old)"
import Stock from "./pages/Stock"
import HomePage from "./pages/Home"

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <CustomRoute exact path="/room" component={Room} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/bounty" component={Bounty} />
                <Route exact path="/stock" component={Stock} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/leaderboard" component={Leaderboards} />
                <CustomRoute exact path="/shop" component={Shop} />
            </Switch>
        </BrowserRouter>
    )
}

export default App