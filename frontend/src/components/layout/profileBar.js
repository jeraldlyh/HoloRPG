import React, { useState } from "react"
import moment from "moment"
import NumberFormat from "react-number-format"
import { GiPiercingSword, GiCheckedShield, GiRoundStar } from "react-icons/gi"
import { IoPersonAddOutline } from "react-icons/io5"
import Countdown from "react-countdown"
import FriendCard from "./friendCard"
import axiosInstance from "../../axios"
import { v4 as uuidv4 } from 'uuid'


function ProfileBar({ profileData, relationshipData, profileMutate, accessToken }) {
    const { username, character, attack, defence, current_health, max_health, currency, level, reputation, income_accumulated, last_collected, experience, exp_required } = profileData
    const [key, setKey] = useState(0)

    const getPercent = (value, max_value) => {
        return Math.ceil((value / max_value) * 100) + "%"
    }

    const getNextCooldown = (time) => {
        var nextHour = moment(time).add(1, "hour")
        var currentTime = moment()
        // while (nextHour.diff(currentTime) < 0) {
        //     nextHour = nextHour.add(1, "hour")
        // }
        var duration = nextHour.diff(currentTime)
        return duration > 0 ? duration : 0
    }

    const addPaddingToNumber = (number) => {
        if (number === 0) {
            return "00"
        } else if (number < 10) {
            return "0" + number
        }
        return number
    }

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span>Collect now</span>
        }
        return <span>Collect in {addPaddingToNumber(minutes)}:{addPaddingToNumber(seconds)}</span>
    }

    const collectIncome = async () => {
        axiosInstance.interceptors.request.use(function (config) {
            config.headers.Authorization = "Bearer " + accessToken
            return config
        })
        profileMutate(() => {
            profileData.currency += profileData.income_accumulated
            profileData.income_accumulated = 0
            profileData.last_collected = ""
            return profileData
        }, false)

        axiosInstance.interceptors.request.use(function (config) {
            config.headers.Authorization = "Bearer " + accessToken
            return config
        })
        const response = await axiosInstance.post("/api/income/", { username: username })
        await profileMutate(response.data, false)
        setKey(uuidv4())
    }

    return (
        <div className="bg-custom-bg-nav shadow-white-lg text-white w-80 py-4 px-5 h-full z-10">
            {/* User Profile */}
            <div className="flex items-center">
                {/* Avatar */}
                <div className="relative inline-block w-14 h-14">
                    <div className="border-2 rounded-full border-custom-color-grey p-3 bg-custom-color-darkblue">
                        <img src="/assets/avatars/fighter.svg" alt="avatar" />
                        <span className="absolute bottom-1.5 right-0 inline-block w-2 h-2 bg-custom-misc-online rounded-full" />
                    </div>
                </div>

                {/* Username/Level/Class */}
                <div className="flex flex-col ml-4">
                    <span className="text-white">{username}</span>
                    <span className="text-xs text-gray-300 font-semibold">Lv. {level} {character}</span>
                </div>
            </div>

            {/* HP */}
            <div className="flex mt-3 text-xs text-white items-center justify-between">
                <span>HP</span>
                <div className="flex w-3/5 h-1 rounded-full bg-custom-bg-progress shadow-progress">
                    <div
                        style={{ width: getPercent(current_health, max_health) }}
                        className="rounded-full bg-custom-stats-health shadow-hp"
                    />
                </div>
                <span className="w-1/5 text-left font-semibold">{current_health}/{max_health}</span>
            </div>

            {/* XP */}
            <div className="flex text-xs text-white items-center justify-between">
                <span>XP</span>
                <div className="flex w-3/5 h-1 rounded-full bg-custom-bg-progress shadow-progress">
                    <div
                        style={{ width: getPercent(experience, exp_required) }}
                        className="rounded-full bg-custom-stats-attack shadow-xp"
                    />
                </div>
                <span className="w-1/5 text-left font-semibold">{getPercent(experience, exp_required)}</span>
            </div>

            {/* Stats */}
            <div className="flex justify-between items-center mt-3 text-sm">
                <div className="flex items-center">
                    <GiPiercingSword size={16} />
                    <span className="ml-2">{attack}</span>
                </div>
                <div className="flex items-center">
                    <GiCheckedShield size={16} />
                    <span className="ml-2">{defence}</span>
                </div>
                <div className="flex items-center">
                    <GiRoundStar size={16} />
                    <span className="ml-2">{reputation}</span>
                </div>
            </div>

            {/* Currency */}
            <div className="flex flex-col justify-center px-5 rounded-lg w-full h-16 mt-3 bg-gradient-to-r from-custom-currency-primary to-custom-currency-secondary shadow-white">
                <span className="text-xs font-medium">Currency</span>
                <span className="text-9x1 font-semibold">
                    <NumberFormat value={currency} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                </span>
            </div>

            {/* Income Stacked */}
            <div className="flex justify-around px-3 items-center rounded-lg w-full h-24 mt-3 bg-custom-card-light">
                {/* Income */}

                <div className="flex flex-col items-center justify-center ml-2">
                    <span className="text-xs font-medium">Income Stacked</span>
                    <span className="font-semibold mb-1">
                        <NumberFormat value={income_accumulated} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                    </span>
                    {/* <Button width="auto" height="8" background={true} text="Collect" onClick={() => collectIncome()} disabled={income_accumulated === 0} /> */}
                    <button
                        className="bg-custom-button-primary shadow-button rounded-lg  text-white text-sm  uppercase font-semibold py-2 px-4  justify-center items-center  disabled:cursor-not-allowed  disabled:opacity-50 hover:bg-opacity-90"
                        disabled={!getNextCooldown(last_collected) || getNextCooldown(last_collected) !== 0}
                        onClick={() => collectIncome()}
                    >
                        <Countdown
                            key={key}
                            date={Date.now() + getNextCooldown(last_collected)}
                            renderer={renderer}
                        />
                    </button>
                </div>
            </div>

            <hr className="border-custom-color-grey w-full my-5 shadow-white"></hr>

            {/* Friends */}
            <div className="flex flex-col gap-y-2">
                <div className="flex items-center justify-between">
                    <span className="font-semibold">Friends ({relationshipData ? relationshipData.length : 0})</span>
                    <div className="bg-custom-card-light rounded-full p-2">
                        <IoPersonAddOutline size={12} />
                    </div>
                </div>
                {
                    relationshipData && relationshipData.length !== 0
                        ? relationshipData.map((relationship, index) => {
                            return <FriendCard key={index} username={relationship.username} level={relationship.level} character={relationship.character} />
                        })
                        : <span>You currently do not have any friends!</span>
                }
            </div>
        </div>
    )
}

export default ProfileBar