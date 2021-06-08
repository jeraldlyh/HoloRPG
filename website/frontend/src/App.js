import React, { Fragment } from "react"
import { Route, BrowserRouter, Switch } from "react-router-dom"
import Login from "./pages/Login"
import Room from "./pages/Room"
import Bounty from "./pages/Bounty"
import Register from "./pages/Register"
import FAQ from "./pages/FAQ"
import Leaderboard from "./pages/Leaderboard"
import Shop from "./pages/Shop"
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import CustomRoute from "./components/CustomRoute"


function App() {
    return (
        <Fragment>
            <Header />
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
            <Footer />
        </Fragment>
    )
}




export default App