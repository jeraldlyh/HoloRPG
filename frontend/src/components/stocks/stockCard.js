import React from "react"
import CardLight from "../cardLight"
import NumberFormat from "react-number-format"

function StockCard(props) {
    return (
        <CardLight height="24" width="full">
            <div className="flex flex-col justify-center w-full h-full">
                <p className="flex justify-between">
                    <span className="font-medium">{props.name}</span>
                    <span className="font-semibold"><NumberFormat value={props.value} displayType={"text"} thousandSeparator={true} prefix={"$"} /></span>
                </p>
                <p className="text-custom-color-grey text-sm">{props.symbol}</p>
            </div>
        </CardLight>
    )
}

export default StockCard