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
            <div className="grid grid-cols-5 items-center text-sm gap-y-1">
                <span className="text-center font-semibold">RANK</span>
                <span className="text-center font-semibold">PLAYER</span>
                <span className="text-center font-semibold">CLASS</span>
                <span className="text-center font-semibold">AGE</span>
                <div className="flex justify-center items-center cursor-pointer" onClick={() => requestSort("net_worth")}>
                    <span className="text-center font-semibold">NET WORTH</span>
                    <BiSort />
                </div>
                {
                    items
                        ? populateLeaderboards(items)
                        : null
                }
            </div>
        </CardLight>
    )
}

export default Leaderboard