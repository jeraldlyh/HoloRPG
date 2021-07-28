import React from "react"
import Activity from "../components/home/activity"
import Leaderboard from "../components/home/leaderboard"
import Layout from "../components/layout"
import { useProfile } from "../hooks/useProfile"
import { useRelationship } from "../hooks/useRelationship"
import { useLeaderboard } from "../hooks/useLeaderboard"
import { useAuth } from "../hooks/useAuth"


function Home() {
    const { session } = useAuth()
    const { accessToken, user: { username } } = session
    const { data: relationshipData, loading: relationshipLoading } = useRelationship(username, accessToken)
    const { data: profileData, loading: profileLoading, mutate: profileMutate } = useProfile(username, accessToken)
    const { data: leaderboardData, loading: leaderboardLoading } = useLeaderboard(accessToken)

    if (relationshipLoading || profileLoading || leaderboardLoading) {
        return <div className="flex items-center justify-center">Loading...</div>
    }

    return (
        <Layout
            profileData={profileData} profileMutate={profileMutate}
            relationshipData={relationshipData}
            accessToken={accessToken}
        >
            <div className="flex w-full h-full justify-between">
                <Activity />
                <Leaderboard leaderboardData={leaderboardData} />
            </div>
        </Layout>
    )
}

export default Home