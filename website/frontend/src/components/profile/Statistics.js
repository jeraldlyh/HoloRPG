import React from "react"
import Card from "../Card"
import CardLight from "../CardLight"
import fighterIcon from "../../assets/avatars/fighter.svg"
import { IoStatsChart } from "react-icons/io5"

function Statistics() {
    return (
        <Card height="auto" width="auto" title="Statistics" icon={<IoStatsChart />}>
            <div className="flex gap-x-2">
                {/* Picture Card */}
                <CardLight height="h-full" width="64">
                    <div className="flex gap-x-2 justify-center items-center">
                        <hr className="border border-custom-color-grey w-20" />
                        <img className="w-14 h-14" src={fighterIcon} alt="avatar" />
                        <hr className="border border-custom-color-grey w-20" />
                    </div>
                    <div className="flex flex-col justify-center items-center text-custom-color-lightgrey">
                        <p>centralized profile card</p>
                        <p>class</p>
                        <p>level</p>
                        <p>economy grade</p>
                        <p>date joined</p>
                    </div>
                </CardLight>

                {/* Stats */}
                <div className="flex flex-col w-full">
                    <div className="flex justify-between">
                        <CardLight height="18" width="32">
                            <div className="flex flex-col justify-center">
                                <p className="text-xs text-custom-color-lightgrey">Net Worth</p>
                                <p className="font-semibold text-sm">$992,367.21</p>
                            </div>
                        </CardLight>
                        <CardLight height="18" width="32">
                            <div className="flex flex-col justify-center">
                                <p className="text-xs text-custom-color-lightgrey">Net Worth</p>
                                <p className="font-semibold text-sm">$992,367.21</p>
                            </div>
                        </CardLight>
                        <CardLight height="18" width="32">
                            <div className="flex flex-col justify-center">
                                <p className="text-xs text-custom-color-lightgrey">Net Worth</p>
                                <p className="font-semibold text-sm">$992,367.21</p>
                            </div>
                        </CardLight>
                        <CardLight height="18" width="32">
                            <div className="flex flex-col justify-center">
                                <p className="text-xs text-custom-color-lightgrey">Net Worth</p>
                                <p className="font-semibold text-sm">$992,367.21</p>
                            </div>
                        </CardLight>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default Statistics