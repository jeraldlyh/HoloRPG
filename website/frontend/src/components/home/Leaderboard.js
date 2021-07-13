import React from "react"
import { IoPodiumOutline } from "react-icons/io5";

function Leaderboard() {
    return (
        <div className={`rounded-lg h-full w-7/12 p-4 bg-custom-card-light border border-custom-color-grey text-white`}>
            <div className="flex flex-col items-center max-w-max">
                <div className="flex justify-around items-center">
                    &nbsp;<IoPodiumOutline />
                    <p className="ml-3 font-bold text-lg">Leaderboards&nbsp;</p>
                </div>
                <hr className="border border-custom-misc-accent w-full mt-1" />
            </div>
            <div className="mt-3">
            </div>
        </div>
    )
}

export default Leaderboard