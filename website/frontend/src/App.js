import React, { Fragment } from "react"
import { Route, BrowserRouter, Switch } from "react-router-dom"
import Login from "./pages/login"
import Room from "./pages/room"
import Bounty from "./pages/bounty"
import Register from "./pages/register"
import FAQ from "./pages/faq"
import Leaderboard from "./pages/leaderboard"
import Shop from "./pages/shop"
import CustomRoute from "./components/customRoute"


function App() {
    return (
        <Fragment>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={FAQ} />
                    <CustomRoute exact path="/room" component={Room} />
                    <CustomRoute exact path="/bounty" component={Bounty} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/leaderboard" component={Leaderboard} />
                    <CustomRoute exact path="/shop" component={Shop} />
                </Switch>
            </BrowserRouter>
        </Fragment>
    )
}




export default App