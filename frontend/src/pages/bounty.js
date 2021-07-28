import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import Activity from "../components/home/activity"
import CardLight from "../components/cardLight"
import { GiSwordWound } from "react-icons/gi"
import { useRelationship } from "../hooks/useRelationship"
import { useProfile } from "../hooks/useProfile"
import { useAuth } from "../hooks/useAuth"
import { useBounty } from "../hooks/useBounty"
import moment from "moment"


function Bounty() {
    const { session } = useAuth()
    const { accessToken, user: { username } } = session
    const { data: relationshipData, loading: relationshipLoading } = useRelationship(username, accessToken)
    const { data: profileData, loading: profileLoading, mutate: profileMutate } = useProfile(username, accessToken)
    const { data: bountyData, loading: bountyLoading } = useBounty(accessToken)


    if (relationshipLoading || profileLoading || bountyLoading) {
        return <div className="flex items-center justify-center">Loading...</div>
    }

    return (
        <Layout
            profileData={profileData} profileMutate={profileMutate}
            relationshipData={relationshipData}
            accessToken={accessToken}
        >
            <div className="flex w-full h-full justify-between">
                <CardLight height="full" width="7/12">
                    <div className="flex justify-around mb-3">
                        <span className="w-32 text-center font-semibold">NAME</span>
                        <span className="w-20 text-center font-semibold">HP</span>
                        <span className="w-32 text-center font-semibold">PLACED BY</span>
                        <span className="w-36 text-center font-semibold">BOUNTY VALUE</span>
                        <span className="w-20 text-center font-semibold">TIME</span>
                        <span className="w-20 text-center font-semibold" />
                    </div>
                    <hr className="border-custom-color-grey w-full mt-1 mb-2" />
                    {
                        bountyData
                            ? bountyData.map(bounty => {
                                return (
                                    <div key={bounty.id} className="flex justify-around items-center text-sm my-2">
                                        <p className="w-32 text-center">{bounty.target}</p>
                                        <p className="w-20 text-center">{bounty.target_health.current_health}/{bounty.target_health.max_health}</p>
                                        <p className="w-32 text-center">{bounty.placed_by}</p>
                                        <p className="w-36 text-center font-semibold">
                                            <NumberFormat value={bounty.value} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                                        </p>
                                        <p className="w-20 text-center text-gray-300 text-xs">{moment(bounty.placed_at).fromNow()}</p>
                                        <button className="flex w-20 h-10 bg-custom-button-primary text-white font-bold py-2 px-4 rounded-lg justify-center items-center">
                                            <GiSwordWound size={16} />
                                        </button>
                                    </div>
                                )
                            })
                            : null
                    }
                </CardLight>
                <Activity />
            </div>
        </Layout>
    )
}


export default Bounty
