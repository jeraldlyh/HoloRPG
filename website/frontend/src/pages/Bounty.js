import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import axiosInstance from "../axios/axiosInstance"
import Layout from "../components/layout/Layout"


function Bounty(props) {
    const { user, current_health } = props.profile
    const [bounties, setBounties] = useState([])
    
    useEffect(() => {
        axiosInstance.get("/api/bounty")
            .then(response => {
                setBounties(response.data)
            })
    }, [])

    const attackPlayer = (index) => {
        const body = {
            bounty: bounties[index],
            attacker: user
        }
        axiosInstance.patch(`/api/bounty/${bounties[index].id}/`, body)
            .then(response => {
                console.log(response.data.bounty)
                setBounties(response.data.bounty)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const hasInsufficientHP = () => {
        return current_health === 0
    }

    return (
        <Layout>
            <div className="self-start grid grid-cols-6 my-5 mx-10 border-2 border-custom-green">
                <span className="pt-3 px-6 text-center uppercase font-bold col-span-2">Target</span>
                <span className="pt-3 px-6 text-center uppercase font-bold col-span-3">Paid by</span>
                <span className="py-3 px-6 text-center uppercase font-bold row-span-2 self-end">Action</span>
                <span className="py-3 px-6 text-center uppercase font-bold">User</span>
                <span className="py-3 px-6 text-center uppercase font-bold">HP</span>
                <span className="py-3 px-6 text-center uppercase font-bold">User</span>
                <span className="py-3 px-6 text-center uppercase font-bold">Bounty</span>
                <span className="py-3 px-6 text-center uppercase font-bold">Placed at</span>
                {
                    bounties.length !== 0
                    ? bounties.map((bounty, index) => {
                        return (
                            <div key={index} className="grid grid-cols-6 col-span-6 items-center hover:bg-gray-900">
                                <span className="py-3 px-3 text-center">{bounty.target}</span>
                                <span className="py-3 px-3 text-center">{bounty.target_health.current_health}/{bounty.target_health.max_health}</span>
                                <span className="py-3 px-3 text-center">{bounty.placed_by}</span>
                                <span className="py-3 px-3 text-center">{bounty.value}</span>
                                <span className="py-3 px-3 text-center">{bounty.placed_at.substr(bounty.placed_at.indexOf(" "))}</span>
                                <div className="py-3 px-3 text-center">
                                    <button className="border-2 border-custom-blue rounded-lg p-1 focus:outline-none disabled:bg-red-500" type="button" disabled={hasInsufficientHP()} onClick={() => attackPlayer(index)}>Attack</button>
                                </div>
                            </div>
                        )
                    })
                    : <div className="col-span-6 h-64 flex justify-center items-center text-sm">There's currently no bounties placed</div>
                }
            </div>
        </Layout>
    )
}

const mapStateToProps = state => ({
    profile: state.profileReducer.profile
})


export default connect(mapStateToProps)(Bounty)