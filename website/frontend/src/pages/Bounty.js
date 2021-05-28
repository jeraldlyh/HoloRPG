import React, { useState, useEffect, Fragment } from "react"
import { connect } from "react-redux"
import axiosInstance from "../axios"
import Layout from "../components/layout/Layout"


function Bounty(props) {
    const { username } = props
    const [bounties, setBounties] = useState([])

    useEffect(() => {
        axiosInstance.get("/api/bounty")
            .then(response => {
                setBounties(response.data)
            })
    }, [])

    const attackPlayer = (index) => {
        const body = {
            target: bounties[index],
            user: username
        }
        console.log(body)
    }

    return (
        <Layout>
            <div className="sticky top-20 self-start my-5 min-w-screen border-2 border-custom-green">
                <table className="m-3 table-fixed">
                    <thead>
                        <tr className="uppercase">
                            <th className="py-3 px-6 text-center">Target</th>
                            <th className="py-3 px-6 text-center">Paid by</th>
                            <th className="py-3 px-6 text-center">Bounty</th>
                            <th className="py-3 px-6 text-center">Placed at</th>
                            <th className="py-3 px-6 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        bounties.length !== 0
                            ? bounties.map((bounty, index) => {
                                return (
                                    <tr key={index} className="hover:bg-gray-900">
                                        <td className="py-3 px-6 text-center">
                                            <span className="flex items-center">
                                                <span>{bounty.target}</span>
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <span className="flex items-center">
                                                <span>{bounty.placed_by}</span>
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <span>{bounty.value}</span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <span>{bounty.placed_at}</span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="border-2 border-custom-blue rounded-lg">
                                                <button className="p-1" type="button" onClick={() => attackPlayer(index)}>Attack</button>
                                            </div>
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

const mapStateToProps = state => ({
    username: state.auth.user
})


export default connect(mapStateToProps)(Bounty)