import React, { useEffect, useState } from "react"
import _ from "lodash"
import { connect } from "react-redux"
import { IoPodiumOutline } from "react-icons/io5"
import { getAllProfile } from "../../store/actions/Profile"
import NumberFormat from "react-number-format"
import CardLight from "../CardLight"

function Leaderboard(props) {
    const [userProfiles, setUserProfiles] = useState([])

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
                console.log(response)
                const sortedData = sortData(response.data)
                setUserProfiles(_.slice(sortedData, 0, 9))
            })
    }, [])

    return (
        <CardLight header={true} title="Leaderboards" icon={<IoPodiumOutline />}>
            <div className="flex justify-around mb-3">
                <span className="w-14 text-center font-semibold">RANK</span>
                <span className="w-32 text-center font-semibold">PLAYER</span>
                <span className="w-14 text-center font-semibold">CLASS</span>
                <span className="w-20 text-center font-semibold">AGE</span>
                <span className="w-24 text-center font-semibold">NET WORTH</span>
            </div>
            {
                userProfiles
                    ? userProfiles.map((profile, index) => {
                        return (
                            <div key={index} className="flex justify-around items-center text-sm">
                                <p className="w-14 text-center">#{index + 1}</p>
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
        </CardLight>
    )
}

export default connect(null, { getAllProfile })(Leaderboard)