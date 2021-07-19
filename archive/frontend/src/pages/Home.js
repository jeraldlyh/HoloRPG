import React from "react"
import Activity from "../components/home/Activity"
import Leaderboard from "../components/home/Leaderboard"
import Layout from "../components/Layout"


function HomePage() {
    return (
        <Layout>
            <div className="flex w-full h-full justify-between">
                <Activity />
                <Leaderboard />
            </div>
        </Layout>
    )
}

export default HomePage