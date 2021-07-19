import React from "react"
import NumberFormat from "react-number-format"
import Card from "../Card"
import { GiMoneyStack } from "react-icons/gi"
import StockCard from "./StockCard"

function Stocks() {
    return (
        <Card height="auto" width="auto" title="Stocks" icon={<GiMoneyStack />}>
            <div className="flex flex-col">
                {/* Summary */}
                <div className="flex gap-x-10">
                    <p className="flex flex-col">
                        <span className="text-xs text-custom-color-lightgrey">Total holdings</span>
                        <span className="text-lg font-semibold">
                            <NumberFormat value={"999888"} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                        </span>
                    </p>
                    <p className="flex flex-col">
                        <span className="text-xs text-custom-color-lightgrey">Number of Passive</span>
                        <span className="text-lg font-semibold">2</span>
                    </p>
                    <p className="flex flex-col">
                        <span className="text-xs text-custom-color-lightgrey">Number of Volatile</span>
                        <span className="text-lg font-semibold">8</span>
                    </p>
                    <p className="flex flex-col">
                        <span className="text-xs text-custom-color-lightgrey">Number of Stocks</span>
                        <span className="text-lg font-semibold">10</span>
                    </p>
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
