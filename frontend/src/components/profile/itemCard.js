import React from "react"
import CardLight from "../cardLight"
import { RiHeartPulseFill } from "react-icons/ri"
import { GiPiercingSword, GiCheckedShield } from "react-icons/gi"

function ItemCard(props) {
    return (
        <CardLight height="40" width="40">
            <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-custom-color-lightgrey"></div>
                <span className="text-sm my-2.5">{props.name}</span>

                <div className="flex space-x-2">
                    <div className="flex items-center justify-center space-x-1">
                        <RiHeartPulseFill size={16} />
                        <span>{props.health}</span>
                    </div>

                    <div className="flex items-center justify-center space-x-1">
                        <GiPiercingSword size={16} />
                        <span>{props.attack}</span>
                    </div>

                    <div className="flex items-center justify-center space-x-1">
                        <GiCheckedShield size={16} />
                        <span>{props.defence}</span>
                    </div>
                </div>
            </div>
        </CardLight>
    )
}

export default ItemCard