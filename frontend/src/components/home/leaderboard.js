import React, { useEffect, useState } from "react"
import { IoPodiumOutline } from "react-icons/io5"
import { BiSort } from "react-icons/bi"
import NumberFormat from "react-number-format"
import CardLight from "../cardLight"
import useSortableData from "../../hooks/sortable"
import _ from "lodash"


function Leaderboard({ leaderboardData }) {
    const [userProfiles, setUserProfiles] = useState([])
    const { items, requestSort } = useSortableData(userProfiles)

    const sortData = (data) => {
        return data.sort((a, b) => {
            if (a.level > b.level) {
                return -1
            } else if (a.level < b.level) {
                return 1
            }
            return 0
        })
    }

    useEffect(() => {
        const sortedData = sortData(leaderboardData)
        setUserProfiles(sortedData)
    }, [])

    const populateLeaderboards = (data) => {
        const leaderboards = []

        _.each(data, function (profile, index) {
            const evenInteration = index % 2 === 0

            leaderboards.push(<div className={`flex items-center justify-center h-full ${evenInteration ? "bg-custom-card-normal" : null}`}>#{profile.rank}</div>)
            leaderboards.push(
                <div className={`flex items-center h-full py-2 ${evenInteration ? "bg-custom-card-normal" : null}`}>
                    <div className="w-8 h-8 bg-white"></div>
                    <p className="flex flex-col ml-3">
                        <span>{profile.username}</span>
                        <span>Lv. {profile.level}</span>
                    </p>
                </div>
            )
            leaderboards.push(<div className={`flex items-center justify-center h-full ${evenInteration ? "bg-custom-card-normal" : null}`}>{profile.character ? profile.character : "None"}</div>)
            leaderboards.push(<div className={`flex items-center justify-center h-full ${evenInteration ? "bg-custom-card-normal" : null}`}>{profile.account_age} days</div>)
            leaderboards.push(
                <div className={`flex items-center justify-center h-full text-custom-stats-net_worth ${evenInteration ? "bg-custom-card-normal" : null}`}>
                    <NumberFormat value={profile.net_worth} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                </div>
            )
        })
        return leaderboards
    }

    return (
        <CardLight height="full" width="7/12" header={true} title="Leaderboards" icon={<IoPodiumOutline />}>
            <div className="flex flex-col h-full text-sm">
                <div className="flex w-full items-center justify-around mb-2">
                    <span className="w-1/6 text-center font-semibold">RANK</span>
                    <span className="w-1/6 text-center font-semibold">PLAYER</span>
                    <span className="w-1/6 text-center font-semibold">CLASS</span>
                    <span className="w-1/6 text-center font-semibold">AGE</span>
                    <div className="flex w-1/6 justify-center items-center cursor-pointer" onClick={() => requestSort("net_worth")}>
                        <span className="text-center font-semibold">NET WORTH</span>
                        <BiSort />
                    </div>
                </div>
                <div className="flex flex-col w-full h-full">
                    {
                        items
                            ? items.map((profile, index) => {
                                const isEven = index % 2 === 0
                                return (
                                    <div className={`flex items-center justify-around w-full ${isEven ? "bg-custom-card-normal" : null}`} style={{ height: "9%" }}>
                                        <span className="w-1/6  text-center">#{profile.rank}</span>
                                        <div className="flex w-1/6  justify-start items-center">
                                            <div className="w-8 h-8 bg-white" />
                                            <p className="flex flex-col ml-3">
                                                <span>{profile.username}</span>
                                                <span>Lv. {profile.level}</span>
                                            </p>
                                        </div>
                                        <span className="w-1/6 text-center">{profile.character ? profile.character : "None"}</span>
                                        <span className="w-1/6 text-center">{profile.account_age} days</span>
                                        <span className="w-1/6 text-center"><NumberFormat value={profile.net_worth} displayType={"text"} thousandSeparator={true} prefix={"$"} /></span>
                                    </div>
                                )
                            })
                            : null
                    }
                </div>
            </div>
        </CardLight >
    )
}

export default Leaderboard