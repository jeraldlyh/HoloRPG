import React, { useState, useEffect, Fragment } from "react"
import { connect } from "react-redux"
import axiosInstance from "../axios"
import Layout from "../components/layout/Layout"


function Bounty(props) {
    const { username } = props
    const [bounties, setBounties] = useState([])

    const fetchBountyData = () => {
        axiosInstance.get("/api/bounty")
            .then(response => {
                setBounties(response.data)
                console.log(response.data)
            })
    }

    useEffect(() => {
        fetchBountyData()
    }, [])

    const attackPlayer = (index) => {
        const body = {
            bounty: bounties[index],
            attacker: username
        }
        axiosInstance.patch(`/api/bounty/${bounties[index].id}/`, body)
            .then(response => {
                fetchBountyData()               // Option 1
                // window.location.reload()        // Option 2
            })
            .catch(error => {
                console.log(error)
            })

    }

    return (
        <Layout>
            <div className="sticky top-20 self-start grid grid-cols-6 my-5 mx-10 border-2 border-custom-green">
                <span className="pt-3 px-6 text-center uppercase font-bold col-span-2">Target</span>
                <span className="pt-3 px-6 text-center uppercase font-bold col-span-2">Paid by</span>
                <span className="py-3 px-6 text-center uppercase font-bold row-span-2 self-end">Placed at</span>
                <span className="py-3 px-6 text-center uppercase font-bold row-span-2 self-end">Action</span>
                <span className="py-3 px-6 text-center uppercase font-bold">User</span>
                <span className="py-3 px-6 text-center uppercase font-bold">HP</span>
                <span className="py-3 px-6 text-center uppercase font-bold">User</span>
                <span className="py-3 px-6 text-center uppercase font-bold">Bounty</span>
                {
                    bounties.length !== 0
                        ? bounties.map((bounty, index) => {
                            return (
                                <Fragment key={index}>
                                <div className="grid grid-cols-6 col-span-6 items-center hover:bg-gray-900">
                                    <div className="py-3 px-6 text-center">
                                        <span>{bounty.target}</span>
                                    </div>
                                    <div className="py-3 px-6 text-center">
                                    <span>{bounty.target_health.current_health}/{bounty.target_health.max_health}</span>
                                    </div>
                                    <div className="py-3 px-6 text-center">
                                        <span>{bounty.placed_by}</span>
                                    </div>
                                    <div className="py-3 px-6 text-center">
                                        <span>{bounty.value}</span>
                                    </div>
                                    <div className="py-3 px-6 text-center">
                                        <span>{bounty.placed_at.substr(bounty.placed_at.indexOf(" "))}</span>
                                    </div>
                                    <div className="py-3 px-6 text-center">
                                        <div className="border-2 border-custom-blue rounded-lg">
                                            <button className="p-1 focus:outline-none" type="button" onClick={() => attackPlayer(index)}>Attack</button>
                                        </div>
                                    </div>
                                </div>
                                {/* {
                                    index !== bounties.length - 1
                                    ? <div className="col-span-5 flex justify-center">
                                        <hr className="w-5/6 border-t-2 border-custom-green"/>
                                    </div>
                                    : null
                                } */}
                                </Fragment>
                            )
                        })
                    : <div className="col-span-6 h-64 w-full justify-center items-center text-sm">There's currently no bounties placed</div>
                }
            </div>
        </Layout>
    )
}

const mapStateToProps = state => ({
    username: state.auth.user
})


export default connect(mapStateToProps)(Bounty)