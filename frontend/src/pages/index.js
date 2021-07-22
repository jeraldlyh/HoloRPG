import React from "react"
import Activity from "../components/home/activity"
import Leaderboard from "../components/home/leaderboard"
import Layout from "../components/layout"
import { withAuth } from "../hooks/withAuth"


function Home(props) {
    return (
        <Layout>
            <div className="flex w-full h-full justify-between">
                <Activity />
                <Leaderboard />
            </div>
        </Layout>
    )
}

export default withAuth(60)(Home)
// export default Home