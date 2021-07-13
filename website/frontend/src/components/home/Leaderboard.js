import React, { useEffect, useState, Fragment } from "react"
import _ from "lodash"
import { connect } from "react-redux"
import { IoPodiumOutline } from "react-icons/io5"
import { getAllProfile } from "../../store/actions/Profile"
import NumberFormat from "react-number-format"

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
        <div className="rounded-lg h-full w-7/12 p-4 bg-custom-card-light border border-custom-color-grey text-white">
            <div className="flex flex-col items-center max-w-max">
                <div className="flex justify-around items-center">
                    &nbsp;<IoPodiumOutline />
                    <p className="ml-3 font-bold text-lg">Leaderboards&nbsp;</p>
                </div>
                <hr className="border border-custom-misc-accent w-full mt-1" />
            </div>
            <div className="flex flex-col mt-3">
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
                                <div key={index} className="flex justify-around items-center">
                                    <p className="w-14 text-center">#{index + 1}</p>
                                    <div className="flex items-center w-32">
                                        <div className="w-4 h-4 bg-white"></div>
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
            </div>
        </div>
    )
}

export default connect(null, { getAllProfile })(Leaderboard)