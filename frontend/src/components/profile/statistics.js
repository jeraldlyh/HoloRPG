import React from "react"
import Card from "../card"
import CardLight from "../cardLight"
import NumberFormat from "react-number-format"
import { IoStatsChart } from "react-icons/io5"
import { PieChart } from "react-minimal-pie-chart"
import { RiHeartPulseFill } from "react-icons/ri"
import { GiPiercingSword, GiCheckedShield } from "react-icons/gi"

function Statistics({ data }) {
    const { character, attack, defence, current_health, max_health, net_worth, currency, level, reputation, account_age } = data

    const getPercentage = (value) => {
        const total = max_health + attack + defence
        return Math.ceil((value / total) * 100)
    }

    const getHealthPercent = () => {
        return Math.ceil((current_health / max_health) * 100) + "%"
    }

    return (
        <Card height="auto" width="auto" title="Statistics" icon={<IoStatsChart />}>
            <div className="flex w-full h-full">
                {/* Profile Card */}
                <CardLight height="auto" width="96">
                    <div className="flex gap-x-2 justify-center items-center">
                        <hr className="border border-custom-color-grey w-20" />
                        <img className="w-14 h-14" src="/assets/avatars/fighter.svg" alt="avatar" />
                        <hr className="border border-custom-color-grey w-20" />
                    </div>
                    <div className="flex flex-col h-full text-center justify-center text-custom-color-lightgrey mt-1">
                        <div className="whitespace-nowrap">centralized profile card</div>
                        <p>{character}</p>
                        <p>level</p>
                        <p>economy grade</p>
                        <p>date joined</p>
                    </div>
                </CardLight>

                {/* Stats */}
                <div className="flex flex-col w-full ml-3">
                    {/* 3 Cards */}
                    <div className="flex gap-x-3 mb-2">
                        <CardLight height="18" width="full">
                            <div className="flex flex-col justify-center">
                                <p className="text-xs text-custom-color-lightgrey">Net Worth</p>
                                <p className="font-semibold">
                                    <NumberFormat value={net_worth} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                                </p>
                            </div>
                        </CardLight>
                        <CardLight height="18" width="full">
                            <div className="flex flex-col justify-center">
                                <p className="text-xs text-custom-color-lightgrey">Currency</p>
                                <p className="font-semibold">
                                    <NumberFormat value={currency} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                                </p>
                            </div>
                        </CardLight>
                        <CardLight height="18" width="full">
                            <div className="flex flex-col justify-center">
                                <p className="text-xs text-custom-color-lightgrey">Account Age</p>
                                <p className="font-semibold">{account_age} days</p>
                            </div>
                        </CardLight>
                        <CardLight height="18" width="full">
                            <div className="flex flex-col justify-center">
                                <p className="text-xs text-custom-color-lightgrey">Reputation</p>
                                <p className="font-semibold">{reputation} ★</p>
                            </div>
                        </CardLight>
                    </div>

                    {/* Stats Bar */}
                    <CardLight height="full" width="full">
                        <div className="flex">
                            <div className="flex relative items-center justify-center w-36 h-auto">
                                <PieChart
                                    lineWidth={35}
                                    data={[
                                        { value: getPercentage(max_health), color: "#F15E6C" },
                                        { value: getPercentage(attack), color: "#FFC35D" },
                                        { value: getPercentage(defence), color: "#49B79F" }
                                    ]}
                                />
                                <p className="absolute font-semibold">
                                    <span>Lv. </span>
                                    <span className="text-lg">{level}</span>
                                </p>
                            </div>

                            <div className="flex flex-col w-full ml-6">
                                <div className="flex items-center w-full justify-between">
                                    <p>HP</p>
                                    <div className="w-10/12 h-1 flex rounded-full bg-custom-bg-progress">
                                        <div
                                            style={{ width: getHealthPercent() }}
                                            className="rounded-full bg-white"
                                        ></div>
                                    </div>
                                    <p className="w-1/12 text-left">{current_health}/{max_health}</p>
                                </div>
                                <div className="flex items-center w-full justify-between">
                                    <p>XP</p>
                                    <div className="w-10/12 h-1 flex rounded-full bg-custom-bg-progress">
                                        <div
                                            style={{ width: "52%" }}
                                            className="rounded-full bg-white"
                                        ></div>
                                    </div>
                                    <p className="w-1/12 text-left">52%</p>
                                </div>

                                {/* Health/Attack/Defence */}
                                <div className="flex gap-x-3 mt-2">
                                    <Card height="auto" width="full">
                                        <div className="flex items-center justify-center gap-x-3">
                                            <RiHeartPulseFill className="text-custom-stats-health" size={32} />
                                            <hr className="border-0 w-px bg-custom-color-grey h-14" />
                                            <div className="flex flex-col">
                                                <p className="text-lg font-semibold">{max_health}</p>
                                                <p className="text-sm">Health</p>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card height="auto" width="full">
                                        <div className="flex items-center justify-center gap-x-3">
                                            <GiPiercingSword className="text-custom-stats-attack" size={32} />
                                            <hr className="border-0 w-px bg-custom-color-grey h-14" />
                                            <div className="flex flex-col">
                                                <p className="text-lg font-semibold">{attack}</p>
                                                <p className="text-sm">Attack</p>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card height="auto" width="full">
                                        <div className="flex items-center justify-center gap-x-3">
                                            <GiCheckedShield className="text-custom-stats-defence" size={32} />
                                            <hr className="border-0 w-px bg-custom-color-grey h-14" />
                                            <div className="flex flex-col">
                                                <p className="text-lg font-semibold">{defence}</p>
                                                <p className="text-sm">Defence</p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </CardLight>
                </div>
            </div>
        </Card>
    )
}

export default Statistics