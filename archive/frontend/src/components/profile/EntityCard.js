import React from "react"
import CardLight from "../CardLight"
import NumberFormat from "react-number-format"

function EntityCard(props) {
    return (
        <CardLight height="40" width="40">
            <div className="flex flex-col justify-center items-center">
                <div className="w-14 h-14 bg-custom-color-grey" />
                <p>{props.name}</p>
                <p className="mt-1 text-lg font-medium"><NumberFormat value={props.value} displayType={"text"} thousandSeparator={true} prefix={"$"} /></p>
                <p className="text-custom-color-grey text-sm">per hr</p>
            </div>
        </CardLight>
    )
}

export default EntityCard