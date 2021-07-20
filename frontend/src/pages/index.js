import React from "react"
import Activity from "../components/home/activity"
import Leaderboard from "../components/home/leaderboard"
import Layout from "../components/layout"
import { useAuth } from "../context/authContext"


export default function Home() {
    return (
        <Layout>
            <div className="flex w-full h-full justify-between">
                <Activity />
                <Leaderboard />
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    try {
        const { isAuthenticated } = useAuth()
        if (!isAuthenticated) {
            return {
                redirect: {
                    destination: "/login",
                    permanent: false
                }
            }
        }
        return { props: {} }
    } catch (error) {
        return { props: {} }
    }
}