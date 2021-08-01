import React, { Fragment, useState, useEffect } from "react"
import moment from "moment"
import _ from "lodash"
import { FiPlusCircle } from "react-icons/fi"
import Layout from "../components/layout"
import Activity from "../components/home/activity"
import CardLight from "../components/cardLight"
import BountyList from "../components/bounty/bountyList"
import { useRelationship } from "../hooks/useRelationship"
import BountyModal from "../components/bounty/bountyModal"
import { useProfile } from "../hooks/useProfile"
import { useAuth } from "../hooks/useAuth"
import { useBounty } from "../hooks/useBounty"
import { getFocusDesign } from "../utils"
import Button from "../components/button"


function Bounty() {
    const { session } = useAuth()
    const { accessToken, user: { username } } = session
    const { data: relationshipData, loading: relationshipLoading } = useRelationship(username, accessToken)
    const { data: profileData, loading: profileLoading, mutate: profileMutate } = useProfile(username, accessToken)
    const { bountyData, playerData, lastUpdated, loading: bountyLoading, mutate: bountyMutate } = useBounty(accessToken)

    const [currentIndex, setCurrentIndex] = useState(0)
    const [filteredPlayerData, setFilteredPlayerData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const filtered = _.filter(playerData, function (player) {
            return player.username !== username
        })
        setFilteredPlayerData(filtered)
    }, [bountyData])

    if (relationshipLoading || profileLoading || bountyLoading) {
        return <div className="flex items-center justify-center">Loading...</div>
    }

    const handleButton = (target, net_worth) => {
        setUserData({
            target: target,
            net_worth: net_worth,
        })
        setShowModal(true)
    }

    const lastUpdatedTime = () => {
        return moment(lastUpdated).format("[Last updated at] DD/MM/YY [GMT]ZZ h:mm:ss a").toString()
    }

    return (
        <Fragment>
            {
                showModal
                    ? <BountyModal
                        toggleModal={() => setShowModal(false)}
                        userData={userData}
                        username={username}
                        accessToken={accessToken}
                        profileMutate={profileMutate}
                        bountyMutate={bountyMutate}
                    />
                    : null
            }
            <Layout
                profileData={profileData} profileMutate={profileMutate}
                relationshipData={relationshipData}
                accessToken={accessToken}
            >
                <div className="flex w-full h-full justify-between">
                    {/* Left container */}
                    <div className="flex flex-col w-7/12 h-full">
                        <div className="flex w-full font-semibold p-5 justify-between">
                            <div className="flex space-x-12">
                                <span className={getFocusDesign(0, currentIndex)} onClick={() => setCurrentIndex(0)}>Bounty List</span>
                                <span className={getFocusDesign(1, currentIndex)} onClick={() => setCurrentIndex(1)}>Place a Bounty</span>
                            </div>
                            <span className="font-normal text-xs text-white self-end">{lastUpdatedTime()}</span>
                        </div>
                        <CardLight height="full" width="full" header={true}>
                            {
                                currentIndex === 0
                                    ? <BountyList bountyData={bountyData} />
                                    : (         // Place bounty tab
                                        <Fragment>
                                            <div className="flex justify-around items-center mb-3">
                                                <span className="w-1/6 text-center font-semibold">RANK</span>
                                                <span className="w-1/6 text-center font-semibold">NAME</span>
                                                <span className="w-1/6 text-center font-semibold">CHARACTER</span>
                                                <span className="w-1/6 text-center font-semibold">NET WORTH</span>
                                                <span className="w-1/6" />
                                            </div>
                                            <hr className="border-custom-color-grey w-full mt-1 mb-2" />
                                            <div className="flex flex-col h-full">
                                                {
                                                    filteredPlayerData && filteredPlayerData.length !== 0
                                                        ? filteredPlayerData.map(player => {
                                                            return (
                                                                <div key={player.id} className="flex justify-around items-center text-sm" style={{ height: "10%" }}>
                                                                    <span className="w-1/6 text-center">#{player.rank}</span>
                                                                    <span className="w-1/6 text-center">{player.username}</span>
                                                                    <span className="w-1/6 text-center">{player.character ? player.character : "None"}</span>
                                                                    <span className="w-1/6 text-center">{player.net_worth}</span>
                                                                    <span
                                                                        className="flex w-1/6 justify-center hover:text-custom-button-primary"
                                                                        onClick={() => handleButton(player.username, player.net_worth)}
                                                                    >
                                                                        {/* <Button width="32" height="10" text="Purchase" background={true} onClick={() => handleButton(player.username, player.net_worth)}/>                                                         */}

                                                                        <FiPlusCircle />
                                                                    </span>
                                                                </div>
                                                            )
                                                        })
                                                        : <span className="text-center">No players available to be placed on the bounty list</span>
                                                }
                                            </div>
                                        </Fragment>
                                    )
                            }
                        </CardLight>
                    </div>
                    {/* Activity container */}
                    <Activity />
                </div>
            </Layout>
        </Fragment>
    )
}


export default Bounty
