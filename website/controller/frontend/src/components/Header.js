import React from "react"
import { AppBar, Toolbar, Typography, makeStyles, Button } from "@material-ui/core"
import { Link as RouterLink } from "react-router-dom"


const useStyles = makeStyles(() => ({
    appBar: {
        backgroundColor: "#1b1b1b",
        position: "fixed",
    },
    logo: {
        fontFamily: "Work Sans, sans-serif",
        fontWeight: 600,
        color: "#FFFEFE",
        textAlign: "left",
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
    },
    toolBar: {
        display: "flex",
        justifyContent: "space-between",
    }
}))

const headerData = [
    {
        label: "FAQ",
        href: "/faq",
    },
    {
        label: "Login",
        href: "/login",
    },
]

export default function Header() {
    const { appBar, logo, menuButton, toolBar } = useStyles()

    const getAppLogo = (
        <Typography variant="h6" component="h1" className={logo}>
            ZeusRPG
        </Typography>
    )
    const getMenuButtons = () => {
        return headerData.map(({ label, href }) => {
            return (
                <Button
                    {...{
                        key: label,
                        color: "inherit",
                        to: href,
                        component: RouterLink,
                        className: menuButton,
                    }}
                >
                    {label}
                </Button>
            )
        })
    }

    return (
        <header>
            <AppBar className={appBar}>
                <Toolbar className={toolBar}>
                    {getAppLogo}
                    <div>
                        {getMenuButtons()}
                    </div>
                </Toolbar>
            </AppBar>
        </header>
    )
}