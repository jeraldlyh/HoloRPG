import React from 'react'
import Layout from '../components/layout'
import CardLight from '../components/cardLight'

export default function shop() {
    return (
        <Layout>
        {/* tabs */}
        <div className="flex flex-col w-full h-full">
        <p className="text-white font-semibold m-5 space-x-12">
                <span className="">Items</span>
                <span className="text-custom-misc-inactive">Entities</span>
        </p>

        {/* shop */}
        <CardLight height="full" width="full">
                <div className="flex justify-around mb-3">
                    <span className="w-12 text-center font-semibold">ITEM</span>
                    <span className="w-40 text-center font-semibold">NAME</span>
                    <span className="w-20 text-center font-semibold">INCOME</span>
                    <span className="w-20 text-center font-semibold">UPKEEP</span>
                    <span className="w-20 text-center font-semibold">COST</span>
                    <span className="w-28 text-center font-semibold"></span>
                </div>

                <hr className="border-custom-color-grey w-full mt-1 mb-2"></hr>

                <div className="flex justify-around items-center text-sm my-2">
                    <div className="w-12 h-12 bg-custom-color-lightgrey"></div>
                    <p className="w-40 text-center">Lorem Ipsum</p>
                    <p className="w-20 text-center">60</p>
                    <p className="w-20 text-center font-semibold">25</p>
                    <p className="w-20 text-center text-gray-300 text-xs">$20</p>
                    <button className="flex w-28 h-10 bg-custom-button-primary text-white font-bold py-2 px-4 rounded-lg justify-center items-center">
                        PURCHASE
                    </button>
                </div>
        </CardLight>
            
        </div>
        </Layout>
    )
}
