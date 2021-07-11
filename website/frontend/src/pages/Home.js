import React from "react"
import Activity from "../components/home/Activity"
import Layout from "../components/Layout"


function HomePage() {
    return (
        <Layout>
            <div className="p-3 h-full">
                <Activity />
            </div>
        </Layout>
    )
}

export default HomePage