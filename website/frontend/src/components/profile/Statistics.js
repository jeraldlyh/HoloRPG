import React from "react"
import Card from "../Card"
import CardLight from "../CardLight"
import fighterIcon from "../../assets/avatars/fighter.svg"
import { IoStatsChart } from "react-icons/io5"
import { PieChart } from "react-minimal-pie-chart"
import { RiHeartPulseFill } from "react-icons/ri"
import { GiPiercingSword, GiCheckedShield } from "react-icons/gi"

function Statistics() {
    return (
        <Card height="auto" width="auto" title="Statistics" icon={<IoStatsChart />}>
            <div className="flex w-full h-full">
                {/* Profile Card */}
                <CardLight height="auto" width="96">
                    <div className="flex gap-x-2 justify-center items-center">
                        <hr className="border border-custom-color-grey w-20" />
                        <img className="w-14 h-14" src={fighterIcon} alt="avatar" />
                        <hr className="border border-custom-color-grey w-20" />
                    </div>
                    <div className="flex flex-col h-full text-center justify-center text-custom-color-lightgrey mt-1">
                        <div className="whitespace-nowrap">centralized profile card</div>
                        <p>class</p>
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
                                <p className="font-semibold">$999,888</p>
                            </div>
                        </CardLight>
                        <CardLight height="18" width="full">
                            <div className="flex flex-col justify-center">
                                <p className="text-xs text-custom-color-lightgrey">Currency</p>
                                <p className="font-semibold">$12,345,67</p>
                            </div>
                        </CardLight>
                        <CardLight height="18" width="full">
                            <div className="flex flex-col justify-center">
                                <p className="text-xs text-custom-color-lightgrey">Account Age</p>
                                <p className="font-semibold">730 days</p>
                            </div>
                        </CardLight>
                        <CardLight height="18" width="full">
                            <div className="flex flex-col justify-center">
                                <p className="text-xs text-custom-color-lightgrey">Reputation</p>
                                <p className="font-semibold">35 ★</p>
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
                                        { value: 30, color: "#F15E6C" },
                                        { value: 45, color: "#FFC35D" },
                                        { value: 25, color: "#49B79F" }
                                    ]}
                                />
                                <p className="absolute font-semibold">
                                    <span>Lv. </span>
                                    <span className="text-lg">20</span>
                                </p>
                            </div>

                            <div className="flex flex-col w-full ml-6">
                                <div className="flex items-center w-full justify-between">
                                    <p>HP</p>
                                    <div className="w-10/12 h-1 flex rounded-full bg-custom-bg-progress">
                                        <div
                                            style={{ width: "60%" }}
                                            className="rounded-full bg-white"
                                        ></div>
                                    </div>
                                    <p className="w-1/12 text-left">60/100</p>
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
                                                <p className="text-lg font-semibold">100</p>
                                                <p className="text-sm">Health</p>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card height="auto" width="full">
                                        <div className="flex items-center justify-center gap-x-3">
                                            <GiPiercingSword className="text-custom-stats-attack" size={32} />
                                            <hr className="border-0 w-px bg-custom-color-grey h-14" />
                                            <div className="flex flex-col">
                                                <p className="text-lg font-semibold">70</p>
                                                <p className="text-sm">Attack</p>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card height="auto" width="full">
                                        <div className="flex items-center justify-center gap-x-3">
                                            <GiCheckedShield className="text-custom-stats-defence" size={32} />
                                            <hr className="border-0 w-px bg-custom-color-grey h-14" />
                                            <div className="flex flex-col">
                                                <p className="text-lg font-semibold">120</p>
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