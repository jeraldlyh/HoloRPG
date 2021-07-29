import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import Activity from "../components/home/activity"
import CardLight from "../components/cardLight"
import BountyList from "../components/bounty/bountyList"
import { useRelationship } from "../hooks/useRelationship"
import { useProfile } from "../hooks/useProfile"
import { useAuth } from "../hooks/useAuth"
import { useBounty } from "../hooks/useBounty"
import { getFocusDesign } from "../utils/utils"
import PlaceBounty from "../components/bounty/placeBounty"
import moment from "moment"


function Bounty() {
    const { session } = useAuth()
    const { accessToken, user: { username } } = session
    const { data: relationshipData, loading: relationshipLoading } = useRelationship(username, accessToken)
    const { data: profileData, loading: profileLoading, mutate: profileMutate } = useProfile(username, accessToken)
    const { bountyData, playerData, lastUpdated, loading: bountyLoading } = useBounty(accessToken)
    const [currentIndex, setCurrentIndex] = useState(0)

    if (relationshipLoading || profileLoading || bountyLoading) {
        return <div className="flex items-center justify-center">Loading...</div>
    }
    const lastUpdatedTime = () => {
        return moment(lastUpdated).format("[Last updated at] DD/MM/YY [GMT]ZZ h:mm:ss a").toString()
    }

    return (
        <Layout
            profileData={profileData} profileMutate={profileMutate}
            relationshipData={relationshipData}
            accessToken={accessToken}
        >
            <div className="flex w-full h-full justify-between">
                {/* Left container */}
                <div className="flex flex-col w-7/12 h-full">
                    <p className="flex w-full font-semibold p-5 justify-between">
                        <p className="flex space-x-12">
                            <span className={getFocusDesign(0, currentIndex)} onClick={() => setCurrentIndex(0)}>Bounty List</span>
                            <span className={getFocusDesign(1, currentIndex)} onClick={() => setCurrentIndex(1)}>Place a Bounty</span>
                        </p>
                        <span className="font-normal text-xs text-white self-end">{lastUpdatedTime()}</span>
                    </p>
                    <CardLight height="full" width="full">
                        {
                            currentIndex === 0
                                ? <BountyList bountyData={bountyData} />
                                : <PlaceBounty playerData={playerData} lastUpdated={lastUpdated} />
                        }
                    </CardLight>
                </div>
                {/* Activity container */}
                <Activity />
            </div>
        </Layout>
    )
}


export default Bounty
