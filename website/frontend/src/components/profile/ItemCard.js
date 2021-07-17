import React from "react";
import CardLight from "../CardLight";
import { RiHeartPulseFill } from "react-icons/ri";
import { GiPiercingSword, GiCheckedShield } from "react-icons/gi";

function ItemCard(){
    return(
    <CardLight height="full" width="40">
        <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-custom-color-lightgrey"></div>
        <p className="text-sm my-2.5">Name</p>

        <div className="flex justify-around space-x-5">
            <div className="flex items-center justify-center space-x-1.5">
            <RiHeartPulseFill size={16} />
            <span>2</span>
            </div>

            <div className="flex items-center justify-center space-x-1.5">
            <GiPiercingSword size={16} />
            <span>5</span>
            </div>

            <div className="flex items-center justify-center space-x-1.5">
            <GiCheckedShield size={16} />
            <span>7</span>
            </div>

        </div> 
        </div>
    </CardLight>
    )
}

export default ItemCard