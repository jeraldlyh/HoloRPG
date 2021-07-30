import React from "react"
import StockCard from "../components/stocks/stockCard"
import Card from "../components/card"
import CardLight from "../components/cardLight"
import Layout from "../components/layout"
import PurchaseBar from "../components/stocks/purchaseBar"
import Graph from  "../components/stocks/graph"


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
                    <div className="flex flex-col w-full">
                        <p className="text-white font-semibold m-5">Market</p>
                        <div className="h-full mb-3">
                            <CardLight height="full">
                                <Graph />
                            </CardLight>
                        </div>
                        <PurchaseBar />
                    </div>
                </div>
            </Card>
        </Layout>
    )
}

export default Stock