import React, { useState, useEffect } from "react"
import axiosInstance from "../axios"
import Layout from "../components/layout/Layout"


function Bounty() {
    const [bounties, setBounties] = useState([])

    useEffect(() => {
        axiosInstance.get("/api/bounty")
            .then(response => {
                setBounties(response.data)
            })
    }, [])

    return (
        <Layout>
            <div className="sticky top-20 self-start my-5 min-w-screen border-2 border-custom-green">
                <table className="m-3">
                    <thead>
                        <tr className="uppercase">
                            <th className="py-3 px-6 border-2 border-white text-center">Target</th>
                            <th className="py-3 px-6 border-2 border-white text-center">Paid by</th>
                            <th className="py-3 px-6 border-2 border-white text-center">Bounty</th>
                            <th className="py-3 px-6 border-2 border-white text-center">Placed at</th>
                            <th className="py-3 px-6 border-2 border-white text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        bounties.length !== 0
                            ? bounties.map((bounty, index) => {
                                return (
                                    <tr key={index} className="hover:bg-gray-900">
                                        <td className="py-3 px-6 border-2 border-white text-left">
                                            <span className="flex items-center">
                                                <span>{bounty.target}</span>
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 border-2 border-white text-left">
                                            <span className="flex items-center">
                                                <span>{bounty.placed_by}</span>
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 border-2 border-white text-center">
                                            <span>{bounty.value}</span>
                                        </td>
                                        <td className="py-3 px-6 border-2 border-white text-center">
                                            <span>{bounty.placed_at}</span>
                                        </td>
                                        <td className="py-3 px-6 border-2 border-white text-center">
                                            <button>DO STH</button>
                                        </td>
                                    </tr>
                                )
                            })
                        : null
                    }
                    </tbody>
                </table>
                { 
                    bounties.length === 0 
                    ? <div className="flex h-64 w-full justify-center items-center text-sm">There's currently no bounties placed</div>
                    : null
                }
            </div>
        </Layout>
    )
}

export default Bounty