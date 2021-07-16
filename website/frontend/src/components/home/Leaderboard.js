import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { IoPodiumOutline } from "react-icons/io5"
import { getAllProfile } from "../../store/actions/Profile"
import { BiSort } from "react-icons/bi"
import NumberFormat from "react-number-format"
import CardLight from "../CardLight"
import useSortableData from "../../hooks/Sortable"


function Leaderboard(props) {
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
        props.getAllProfile()
            .then(response => {
                const sortedData = sortData(response.data)
                setUserProfiles(sortedData)
            })
    }, [])

    return (
        <CardLight  height="full" width="7/12" header={true} title="Leaderboards" icon={<IoPodiumOutline />}>
            <div className="flex justify-around mb-3 text-sm">
                <span className="w-14 text-center font-semibold">RANK</span>
                <span className="w-32 text-center font-semibold">PLAYER</span>
                <span className="w-14 text-center font-semibold">CLASS</span>
                <span className="w-20 text-center font-semibold">AGE</span>
                <div className="flex items-center cursor-pointer" onClick={() => requestSort("net_worth")}>
                    <span className="w-24 text-center font-semibold">NET WORTH</span>
                    <BiSort />
                </div>
            </div>
            {
                items
                    ? items.map((profile, index) => {
                        return (
                            <div key={index} className={`flex justify-around items-center text-sm h-14 ${index % 2 === 0 ? "bg-custom-card-normal" : ""} `}>
                                <p className="w-14 text-center">#{profile.rank}</p>
                                <div className="flex items-center w-32">
                                    <div className="w-8 h-8 bg-white"></div>
                                    <p className="flex flex-col ml-3">
                                        <span>{profile.user}</span>
                                        <span>Lv. {profile.level}</span>
                                    </p>
                                </div>
                                <p className="w-14 text-center">{profile.character}</p>
                                <p className="w-20 text-center">{profile.account_age} days</p>
                                <p className="w-24 text-center text-custom-stats-net_worth">
                                    <NumberFormat value={profile.net_worth} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                                </p>
                            </div>
                        )
                    })
                    : null
            }
            {/* <div className={`flex justify-around items-center text-sm h-14 `}>
                <p className="w-14 text-center">#asdasd</p>
                <div className="flex items-center w-32">
                    <div className="w-8 h-8 bg-white"></div>
                    <p className="flex flex-col ml-3">
                        <span>asdasd</span>
                        <span>Lv. asdasd</span>
                    </p>
                </div>
                <p className="w-14 text-center">asdasd</p>
                <p className="w-20 text-center">asdasd days</p>
                <p className="w-24 text-center text-custom-stats-net_worth">
                    <NumberFormat value={1} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                </p>
            </div> */}
        </CardLight>
    )
}

export default connect(null, { getAllProfile })(Leaderboard)