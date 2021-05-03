import React from "react"
import { Typography, makeStyles, Button } from "@material-ui/core"

const useStyles = makeStyles(() => ({
    body: {
        paddingTop: "64px",
        minHeight: "85vh"
    },
    text: {
        fontFamily: "Open Sans, sans-serif",
        size: "15px",
    },
}))

export default function Body() {
    const { body, text } = useStyles()

    return (
        <div className={body}>
            <p className={text}>test</p>
        </div>
    )
}