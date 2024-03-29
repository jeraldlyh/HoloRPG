import React from "react"
import CardLight from "../cardLight"
import NumberFormat from "react-number-format"

function StockCard(props) {
    return (
        <CardLight height="24" width="96">
            <div className="flex w-full">
                <div className="flex-none w-14 h-14 rounded-full bg-custom-color-grey" />
                <div className="flex flex-col w-full justify-center ml-3">
                    <div className="flex justify-between font-semibold">
                        <span>{props.name}</span>
                        <span><NumberFormat value={props.value} displayType={"text"} thousandSeparator={true} prefix={"$"} /></span>
                    </div>
                    <div className="flex justify-between">
                        <span>Quantity</span>
                        <span>{props.quantity}</span>
                    </div>
                </div>
            </div>
        </CardLight>
    )
}

export default StockCard