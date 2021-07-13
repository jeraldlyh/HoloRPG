import React from "react"
import Card from "../Card"
import { FiActivity } from "react-icons/fi"
import moment from "moment"

function Activity() {
    const renderTime = () => {
        return moment(new Date()).format("DD/MM/YY hh:mm")
    }

    const renderText = (text) => {
        if (text.includes("online")) {
            return (
                <p>
                    {text.substr(0, text.indexOf("online"))}
                    <span className="text-custom-misc-online"> online</span>.
                </p>
            )
        } else if (text.includes("bounty")) {
            return (
                <p>
                    {text.substr(0, text.indexOf("bounty"))}
                    <span className="text-custom-misc-object"> bounty</span>.
                </p>
            )
        } else if (text.includes("attacked")) {
            return (
                <p>
                    {text.substr(0, text.indexOf("attacked"))}
                    <span className="text-custom-misc-status"> attacked</span>.
                </p>
            )
        }
    }

    return (
        <Card height="full" width="2/5" title="Activity" icon={<FiActivity />}>
            <div className="flex">
                <p className="text-custom-misc-datetime">[{renderTime()}]</p>&nbsp;
                {renderText("Player is online")}
            </div>
            <div className="flex">
                <p className="text-custom-misc-datetime">[{renderTime()}]</p>&nbsp;
                {renderText("You have claimed a bounty")}
            </div>
            <div className="flex">
                <p className="text-custom-misc-datetime">[{renderTime()}]</p>&nbsp;
                {renderText("You have been attacked")}
            </div>
        </Card>
    )
}

export default Activity