import React, { Component, Fragment } from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import { Typography, Button, CssBaseline } from "@material-ui/core"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"

import store from "../store"
import Header from "./layout/Header"
import Footer from "./layout/Footer"
import Dashboard from "./leads/Dashboard"

const darkTheme = createMuiTheme({
    palette: {
        primary: {
            light: "hsl(0, 0%, 38%)",
            main: "hsl(0, 0%, 26%)",
            dark: "hsl(0, 0%, 14%)"
        },
        secondary: {
            light: "hsl(0, 0%, 70%)",
            main: "hsl(0, 0%, 100%)",
            dark: "hsl(0, 0%, 50%)"
        },
        text: {
            primary: "hsl(0, 0%, 95%)",
        },
        background: {
            default: "hsl(0, 0%, 5%)"
        }
    },
    typography: {
        fontFamily: "Open Sans, sans-serif",
        fontSize: 14,
        fontWeightRegular: 400,
        fontWeightMedium: 700,
        fontWeightBold: 800,
    }
})

export default function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Provider store={store}>
                <Fragment>
                    <Header />
                    <div 
                        className="container" 
                        style={{
                            paddingTop: "64px",
                            minHeight: "90vh",
                        }}
                    >
                        <Dashboard />
                    </div>
                    {/* <Router> */}
                    <Footer />
                    {/* </Router> */}
                </Fragment>
            </Provider>
        </ThemeProvider>
    )
    
}

const appDiv = document.getElementById("app");
ReactDOM.render(<App />, appDiv)