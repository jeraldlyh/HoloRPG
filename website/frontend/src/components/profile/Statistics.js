import React from "react"
import Card from "../Card"
import CardLight from "../CardLight"
import fighterIcon from "../../assets/avatars/fighter.svg"
import { IoStatsChart } from "react-icons/io5"

function Statistics() {
    return (
        <Card height="auto" width="auto" title="Statistics" icon={<IoStatsChart />}>
            <CardLight height="h-full" width="64">
                <div className="flex gap-x-2 justify-center items-center">
                    <hr className="border border-custom-color-grey w-20" />
                    <img className="w-14 h-14" src={fighterIcon} alt="avatar" />
                    <hr className="border border-custom-color-grey w-20" />
                </div>

                <div className="flex-col">
                <p>test</p>
                <p>test</p>
                <p>test</p>
                </div>
            </CardLight>
        </Card>
    )
}

export default Statistics