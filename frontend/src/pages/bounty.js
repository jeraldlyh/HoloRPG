import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import Activity from "../components/home/activity"
import CardLight from "../components/cardLight"
import { GiSwordWound } from "react-icons/gi"

function Bounty() {
    return (
        <Layout>
            <div className="flex w-full h-full justify-between">
                <CardLight height="full" width="7/12">
                    <div className="flex justify-around mb-3">
                        <span className="w-32 text-center font-semibold">NAME</span>
                        <span className="w-20 text-center font-semibold">HP</span>
                        <span className="w-32 text-center font-semibold">PLACED BY</span>
                        <span className="w-36 text-center font-semibold">BOUNTY VALUE</span>
                        <span className="w-20 text-center font-semibold">TIME</span>
                        <span className="w-20 text-center font-semibold"></span>
                    </div>
                    <hr className="border-custom-color-grey w-full mt-1 mb-2"></hr>
                    <div className="flex justify-around items-center text-sm my-2">
                        <p className="w-32 text-center">Player_123</p>
                        <p className="w-20 text-center">52/80</p>
                        <p className="w-32 text-center">Player_456</p>
                        <p className="w-36 text-center font-semibold">$300.20</p>
                        <p className="w-20 text-center text-gray-300 text-xs">1m ago</p>
                        <button className="flex w-20 h-10 bg-custom-button-primary text-white font-bold py-2 px-4 rounded-lg justify-center items-center">
                            <GiSwordWound size={16} />
                        </button>
                        <div></div>
                    </div>
                </CardLight>
                <Activity />
            </div>
        </Layout>
    )
}


export default Bounty
