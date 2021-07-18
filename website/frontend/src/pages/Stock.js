import React from "react"
import StockCard from "../components/stocks/StockCard"
import Card from "../components/Card"
import Layout from "../components/Layout"

function Stock() {
    return (
        <Layout>
            <div className="flex flex-col w-1/4 h-full">
                <p className="text-white font-semibold m-5">Companies</p>
                <Card height="full" width="full">
                    <div className="flex flex-wrap py-3 h-11/12 gap-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-white scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                        <StockCard name="Bitcoin" symbol="BTC" value="123456" />
                        <StockCard name="Bitcoin" symbol="BTC" value="123456" />
                        <StockCard name="Bitcoin" symbol="BTC" value="123456" />
                        <StockCard name="Bitcoin" symbol="BTC" value="123456" />
                        <StockCard name="Bitcoin" symbol="BTC" value="123456" />
                        <StockCard name="Bitcoin" symbol="BTC" value="123456" />
                        <StockCard name="Bitcoin" symbol="BTC" value="123456" />
                        <StockCard name="Bitcoin" symbol="BTC" value="123456" />
                        <StockCard name="Bitcoin" symbol="BTC" value="123456" />
                        <StockCard name="Bitcoin" symbol="BTC" value="123456" />
                        <StockCard name="Bitcoin" symbol="BTC" value="123456" />
                        <StockCard name="Bitcoin" symbol="BTC" value="123456" />
                        <StockCard name="Bitcoin" symbol="BTC" value="123456" />
                        <StockCard name="Bitcoin" symbol="BTC" value="123456" />
                        <StockCard name="Bitcoin" symbol="BTC" value="123456" />
                    </div>
                </Card>
            </div>
        </Layout>
    )
}

export default Stock