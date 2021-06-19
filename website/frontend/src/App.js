import React from "react"
import { Route, BrowserRouter, Switch } from "react-router-dom"
import Login from "./pages/Login"
import Room from "./pages/Room"
import Bounty from "./pages/Bounty"
import Register from "./pages/Register"
import FAQ from "./pages/FAQ"
import Leaderboards from "./pages/Leaderboards"
import Shop from "./pages/Shop"
import CustomRoute from "./components/CustomRoute"
import Stock from "./pages/Stock"

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={FAQ} />
                <CustomRoute exact path="/room" component={Room} />
                <CustomRoute exact path="/bounty" component={Bounty} />
                <CustomRoute exact path="/stock" component={Stock} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/leaderboard" component={Leaderboards} />
                <CustomRoute exact path="/shop" component={Shop} />
            </Switch>
        </BrowserRouter>
    )
}

export default App