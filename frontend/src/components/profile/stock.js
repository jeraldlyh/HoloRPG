import React from "react"
import NumberFormat from "react-number-format"
import Card from "../card"
import { GiMoneyStack } from "react-icons/gi"
import StockCard from "./stockCard"

function Stocks({ setRef }) {
    return (
        <Card setRef={setRef} height="auto" width="auto" title="Stocks" icon={<GiMoneyStack />}>
            <div className="flex flex-col">
                {/* Summary */}
                <div className="flex gap-x-10">
                    <div className="flex flex-col">
                        <span className="text-xs text-custom-color-lightgrey">Total holdings</span>
                        <span className="text-lg font-semibold">
                            <NumberFormat value={"999888"} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-custom-color-lightgrey">Number of Passive</span>
                        <span className="text-lg font-semibold">2</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-custom-color-lightgrey">Number of Volatile</span>
                        <span className="text-lg font-semibold">8</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-custom-color-lightgrey">Number of Stocks</span>
                        <span className="text-lg font-semibold">10</span>
                    </div>
                </div>
            </div>
            <hr className="border-custom-color-grey w-full my-4"></hr>

            {/* Stocks */}
            <div className="flex flex-wrap h-52 pr-4 gap-x-3 gap-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-white scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                <StockCard name="Bitcoin" value="123456" quantity="3" />
                <StockCard name="Bitcoin" value="123456" quantity="3" />
                <StockCard name="Bitcoin" value="123456" quantity="3" />
                <StockCard name="Bitcoin" value="123456" quantity="3" />
                <StockCard name="Bitcoin" value="123456" quantity="3" />
                <StockCard name="Bitcoin" value="123456" quantity="3" />
                <StockCard name="Bitcoin" value="123456" quantity="3" />
                <StockCard name="Bitcoin" value="123456" quantity="3" />
                <StockCard name="Bitcoin" value="123456" quantity="3" />
                <StockCard name="Bitcoin" value="123456" quantity="3" />
                <StockCard name="Bitcoin" value="123456" quantity="3" />
                <StockCard name="Bitcoin" value="123456" quantity="3" />
                <StockCard name="Bitcoin" value="123456" quantity="3" />
            </div>
        </Card>
    )
}

export default Stocks
