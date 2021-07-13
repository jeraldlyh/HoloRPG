import React, { useEffect, useState, Fragment } from "react"
import _ from "lodash"
import { connect } from "react-redux"
import { IoPodiumOutline } from "react-icons/io5"
import { getAllProfile } from "../../store/actions/Profile"

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
                const sortedData = sortData(response.data)
                setUserProfiles(_.slice(sortedData, 0, 9))
            })
    }, [])

    function Leaderboard(props) {
        return (
            <div className="rounded-lg h-full w-7/12 p-4 bg-custom-card-light border border-custom-color-grey text-white">
                <div className="flex flex-col items-center max-w-max">
                    <hr className="border border-custom-misc-accent w-full mt-1" />
                </div>
                <div className="mt-3">
                    <div className="grid grid-cols-5">
                        <span className="text-center font-semibold">RANK</span>
                        <span className="text-center font-semibold">PLAYER</span>
                        <span className="text-center font-semibold">CLASS</span>
                        <span className="text-center font-semibold">AGE</span>
                        <span className="text-center font-semibold">NET WORTH</span>
                    </div>
                    {
                        userProfiles
                            ? userProfiles.map((profile, index) => {
                                return (
                                    <Fragment>
                                        <p>#{index + 1}</p>
                                        <div className="flex items-center">
                                            <div className="w-4 h-4 bg-white"></div>
                                            <p className="flex flex-col">
                                                <span>{profile.username}</span>
                                                <span>{profile.level}</span>
                                            </p>
                                        </div>
                                        <p>{profile.character}</p>
                                        <p>{profile.account_age}</p>
                                        <p>{profile.net_worth}</p>
                                    </Fragment>
                                )
                            })
                            : null
                    }
                </div>
            </div>
        )
    }
}

export default connect(null, { getAllProfile })(Leaderboard)