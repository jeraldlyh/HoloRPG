import React, { useState, useEffect, useMemo } from "react"
import { BiSort } from "react-icons/bi"
import axiosInstance from "../axios"
import Layout from "../components/layout/Layout"
import useSortableData from "../components/hooks/Sortable"
import PageHeader from "../components/layout/PageHeader"


function Leaderboard() {
    const [userProfiles, setUserProfiles] = useState([])

    useEffect(() => {
        axiosInstance.get("/api/profile")
            .then(response => {
                const sortedData = response.data.sort((a, b) => {
                    if (a.level > b.level) {
                        return -1
                    } else if (a.level < b.level) {
                        return 1
                    }
                    return 0
                })
                setUserProfiles(sortedData)
            })
    }, [])

    const { items, requestSort } = useSortableData(userProfiles)

    return (
        <Layout>
            <div className="flex flex-col self-start">
                <PageHeader header="Leaderboards"/>
                <div className="grid grid-cols-7 border-2 border-custom-green items-center">
                    <div className="flex p-3 justify-center items-center gap-x-2">
                        <span className="text-center uppercase font-bold">Rank</span>
                        <button type="button" onClick={() => requestSort("rank")}><BiSort /></button>
                    </div>

                    <span className="text-center uppercase font-bold p-3">Player</span>
                    <span className="text-center uppercase font-bold p-3">Main Class</span>
                    <span className="text-center uppercase font-bold p-3">Sub Class</span>

                    <div className="flex p-3 justify-center items-center gap-x-2">
                        <span className="text-center uppercase font-bold">Level</span>
                        <button type="button" onClick={() => requestSort("level")}><BiSort /></button>
                    </div>
                    <div className="flex p-3 justify-center items-center gap-x-2">
                        <span className="text-center uppercase font-bold">Age</span>
                        <button type="button" onClick={() => requestSort("account_age")}><BiSort /></button>
                    </div>
                    <div className="flex p-3 justify-center items-center gap-x-2">
                        <span className="text-center uppercase font-bold">Net Worth</span>
                        <button type="button" onClick={() => requestSort("net_worth")}><BiSort /></button>
                    </div>
                    {
                        items !== 0
                        ? items.map((profile, index) => {
                            return (
                                <div key={index} className="grid grid-cols-7 col-span-7 items-center hover:bg-gray-900">
                                    <span className="py-3 px-3 text-center">#{profile.rank}</span>
                                    <span className="py-3 px-3 text-center">{profile.user}</span>
                                    <span className="py-3 px-3 text-center">{profile.character_class[0]}</span>
                                    <span className="py-3 px-3 text-center">{profile.character_class[1]}</span>
                                    <span className="py-3 px-3 text-center">{profile.level}</span>
                                    <span className="py-3 px-3 text-center">{profile.account_age}</span>
                                    <span className="py-3 px-3 text-center">TBC</span>
                                </div>
                            )
                        })
                        : null
                    }
                </div>
            </div>
        </Layout>
    )
}


export default Leaderboard