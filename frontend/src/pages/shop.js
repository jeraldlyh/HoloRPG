import React, { Fragment } from "react"
import Layout from "../components/layout"
import CardLight from "../components/cardLight"
import { useShop } from "../hooks/useShop"

export default function Shop() {
    const { data } = useShop()

    return (
        <Layout>
            {/* tabs */}
            <div className="flex flex-col w-full h-full overflow-y-auto scrollbar-hide">
                <p className="text-white font-semibold m-5 space-x-12">
                    <span className="">Items</span>
                    <span className="text-custom-misc-inactive">Entities</span>
                </p>

                {/* shop */}
                <CardLight height="full" width="full">
                    <div className="flex w-full items-center justify-around mb-3">
                        <span className="w-12 text-center font-semibold">ITEM</span>
                        <span className="w-40 text-center font-semibold">NAME</span>
                        <span className="w-20 text-center font-semibold">INCOME</span>
                        <span className="w-20 text-center font-semibold">UPKEEP</span>
                        <span className="w-20 text-center font-semibold">COST</span>
                        <span className="w-28 text-center font-semibold" />
                    </div>

                    <hr className="border-custom-color-grey w-full mt-1 mb-2"></hr>

                    <div className="flex flex-col w-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-white scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                        {
                            data
                                ? data.map((shop, index) => {
                                    return (
                                        <div key={index} className="flex w-full justify-around items-center text-sm my-2">
                                            <div className="w-12 h-12 bg-custom-color-lightgrey" />
                                            <p className="w-40 text-center">{shop.name}</p>
                                            <p className="w-20 text-center">${shop.income}</p>
                                            <p className="w-20 text-center">${shop.upkeep}</p>
                                            <p className="w-20 text-center">${shop.cost}</p>
                                            <div className="w-28 h-10 bg-custom-button-primary text-white font-bold py-2 px-4 rounded-lg cursor-pointer">
                                                PURCHASE
                                            </div>
                                        </div>
                                    )
                                })
                                : null
                        }
                    </div>
                </CardLight>
            </div>
        </Layout>
    )
}
