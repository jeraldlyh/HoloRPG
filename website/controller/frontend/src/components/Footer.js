import React from "react"
import { AppBar, Toolbar, Typography, makeStyles, Button, Grid, Container } from "@material-ui/core"
import { Link as RouterLink } from "react-router-dom"


const useStyles = makeStyles(() => ({
    appBar: {
        backgroundColor: "#1b1b1b",
        display: "flex",
        width: "100%",
        position: "static",
        marginTop: "auto"
    },
    toolBar: {
        display: "flex",
        justifyContent: "center",
    },
    text: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 650,
        size: "15px",
    },
}))

export default function Footer() {
    const { appBar, text, toolBar } = useStyles()

    return (
        <AppBar className={appBar}>
            <Toolbar className={toolBar}>
                <p className={text}>
                    &copy;{new Date().getFullYear()} ZeusRPG | All rights reserved | Terms Of Service | Privacy
                </p>
            </Toolbar>
        </AppBar>
    )
}