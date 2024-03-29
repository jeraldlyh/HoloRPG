import React from "react"
import CardLight from "../cardLight"
import NumberFormat from "react-number-format"

function EntityCard({ name, income }) {
    return (
        <CardLight height="40" width="40">
            <div className="flex flex-col justify-center items-center">
                <div className="w-14 h-14 bg-custom-color-grey" />
                <span>{name}</span>
                <span className="mt-1 text-lg font-medium"><NumberFormat value={income} displayType={"text"} thousandSeparator={true} prefix={"$"} /></span>
                <span className="text-custom-color-grey text-sm">per hr</span>
            </div>
        </CardLight>
    )
}

export default EntityCard