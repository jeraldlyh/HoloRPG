import React from "react"
import Layout from "../components/Layout"
import Items from "../components/profile/Items"
import Statistics from "../components/profile/Statistics"
import Stocks from "../components/profile/Stock"
import Entities from "../components/profile/Entities"

export default function Profile() {
    return (
        <Layout>
            <div className="flex flex-col">
                <div className="text-white font-semibold m-5 space-x-12">
                    <span className="">Overview</span>
                    <span className="text-custom-misc-inactive">Stocks</span>
                    <span className="text-custom-misc-inactive">Entities</span>
                    <span className="text-custom-misc-inactive">Battles</span>
                </div>

                <div className="flex flex-col w-full h-full gap-y-3 overflow-y-auto scrollbar-hide">
                    <Statistics />
                    <Items />
                    <Stocks />
                    <Entities />
                </div>
            </div>
        </Layout>
    )
}
