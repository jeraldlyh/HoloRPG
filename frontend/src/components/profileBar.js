import React, { useState, useEffect } from "react"
import moment from "moment"
import NumberFormat from "react-number-format"
import { GiPiercingSword, GiCheckedShield, GiRoundStar } from "react-icons/gi"
import { IoPersonAddOutline } from "react-icons/io5"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import FriendCard from "./friendCard"
import axiosInstance from "../axios/axiosInstance"
import Button from "./button"


function ProfileBar({ profileData, relationshipData, profileMutate, accessToken }) {
    const { username, character, attack, defence, current_health, max_health, net_worth, currency, level, reputation, account_age, income_accumulated, last_collected } = profileData
    const [countdown, setCountdown] = useState(0)

    const getHealthPercent = () => {
        return Math.ceil((current_health / max_health) * 100) + "%"
    }

    useEffect(() => {
        setCountdownTimer()
    }, [])

    useEffect(() => {
        console.log(countdown)
    }, [countdown])

    useEffect(() => {
        setCountdownTimer()
    }, [last_collected])

    const setCountdownTimer = () => {
        if (last_collected) {
            const dateNow = moment()
            const dateLastCollected = moment(last_collected)
            setCountdown(dateNow.diff(dateLastCollected))
        } else {
            setCountdown(0)
        }
    }

    const children = ({ remainingTime }) => {
        // const hours = Math.floor(remainingTime / 3600)
        var minutes = Math.floor((remainingTime % 3600) / 60)
        var seconds = remainingTime % 60

        if (seconds === 0) {
            seconds = "00"
        } else if (seconds < 10) {
            seconds = `0${seconds}`
        }

        if (minutes === 0) {
            minutes = "00"
        } else if (minutes < 10) {
            minutes = `0${minutes}`
        }

        return `${minutes}:${seconds}`
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

        profileMutate(response.data, false)
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
                <div className="ml-4">
                    <p className="text-white">{username}</p>
                    <p className="text-xs text-gray-300 font-semibold">Lv. {level} {character}</p>
                </div>
            </div>

            {/* HP */}
            <div className="flex mt-3 text-xs text-white items-center justify-between">
                <p>HP</p>
                <div className="flex w-3/5 h-1 rounded-full bg-custom-bg-progress shadow-progress">
                    <div
                        style={{ width: getHealthPercent() }}
                        className="rounded-full bg-custom-stats-health shadow-hp"
                    />
                </div>
                <p className="w-1/5 text-left font-semibold">{current_health}/{max_health}</p>
            </div>

            {/* XP */}
            <div className="flex text-xs text-white items-center justify-between">
                <p>XP</p>
                <div className="flex w-3/5 h-1 rounded-full bg-custom-bg-progress shadow-progress">
                    <div
                        style={{ width: "52%" }}
                        className="rounded-full bg-custom-stats-attack shadow-xp"
                    />
                </div>
                <p className="w-1/5 text-left font-semibold">52%</p>
            </div>

            {/* Stats */}
            <div className="flex justify-between items-center mt-3 text-sm">
                <div className="flex items-center">
                    <GiPiercingSword size={16} />
                    <p className="ml-2">{attack}</p>
                </div>
                <div className="flex items-center">
                    <GiCheckedShield size={16} />
                    <p className="ml-2">{defence}</p>
                </div>
                <div className="flex items-center">
                    <GiRoundStar size={16} />
                    <p className="ml-2">{reputation}</p>
                </div>
            </div>

            {/* Currency */}
            <div className="flex flex-col justify-center px-5 rounded-lg w-full h-16 mt-3 bg-gradient-to-r from-custom-currency-primary to-custom-currency-secondary shadow-white">
                <p className="text-xs font-medium">Currency</p>
                <p className="text-9x1 font-semibold">
                    <NumberFormat value={currency} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                </p>
            </div>

            {/* Income Stacked */}
            <div className="flex justify-around px-3 items-center rounded-lg w-full h-24 mt-3 bg-custom-card-light">
                <CountdownCircleTimer
                    isPlaying
                    size={80}
                    duration={countdown}
                    strokeWidth={5}
                    trailColor="#555555"
                    colors="#FFFFFF"
                    children={children}
                />

                {/* Income */}
                <div className="flex flex-col items-center justify-center ml-2">
                    <p className="text-xs font-medium">Income Stacked</p>
                    <p className="font-semibold mb-1">
                        <NumberFormat value={income_accumulated} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                    </p>
                    <Button width="auto" height="8" background={true} text="Collect" onClick={() => collectIncome()} disabled={income_accumulated === 0} />
                </div>
            </div>

            <hr className="border-custom-color-grey w-full my-5 shadow-white"></hr>

            {/* Friends */}
            <div className="flex flex-col gap-y-2">
                <div className="flex items-center justify-between">
                    <p className="font-semibold">Friends ({relationshipData ? relationshipData.length : 0})</p>
                    <div className="bg-custom-card-light rounded-full p-2">
                        <IoPersonAddOutline size={12} />
                    </div>
                </div>
                {
                    relationshipData && relationshipData.length !== 0
                        ? relationshipData.map((relationship, index) => {
                            return <FriendCard key={index} username={relationship.username} level={relationship.level} character={relationship.character} />
                        })
                        : <p className="flex justify-center items-center">You currently do not have any friends!</p>
                }
            </div>
        </div>
    )
}

export default ProfileBar