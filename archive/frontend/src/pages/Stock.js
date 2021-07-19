import React from "react"
import StockCard from "../components/stocks/StockCard"
import Card from "../components/Card"
import Layout from "../components/Layout"
import CardLight from "../components/CardLight"
import PurchaseBar from "../components/stocks/PurchaseBar"
import Graph from "../components/stocks/Graph"

function Stock() {
    return (
        <Layout>
            <Card height="full" width="full">
                <div className="flex h-full w-full gap-x-3">
                    <div className="flex flex-col w-1/4 h-full">
                        <p className="text-white font-semibold m-5">Companies</p>
                        <div style={{ height: "70vh" }} className="flex flex-wrap pr-4 gap-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-white scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
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
                    </div>
                    <div className="flex flex-col w-3/5">
                        <p className="text-white font-semibold m-5">Market</p>
                        <Graph />
                        <PurchaseBar />
                    </div>
                </div>
            </Card>
        </Layout>
    )
}

export default Stock