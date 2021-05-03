import React, { Component } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { Typography } from "@material-ui/core"
import Header from "./Header"
import Footer from "./Footer"
import Body from "./Body"

export default class HomePage extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Header />
                    <Body />
                    <Footer />
                </Router>
            </div>
        )
    }
}