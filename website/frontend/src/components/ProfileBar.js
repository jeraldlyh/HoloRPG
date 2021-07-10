import React from "react"
import { GiPiercingSword, GiCheckedShield, GiRoundStar } from "react-icons/gi"
import { connect } from "react-redux"
import fighterIcon from "../assets/avatars/fighter.svg"

function ProfileBar() {
    return (
        // sidebar
        <div className="bg-custom-bg-nav text-white w-80 py-4 px-5 h-full">

            {/* user profile */}
            <div className="flex items-center">

                {/* avatar */}
                <div className="relative inline-block w-14 h-14">
                    <div className="border-2 rounded-full border-custom-misc-datetime p-3">
                        <img src={fighterIcon} alt="avatar" />
                        <span className="absolute bottom-1.5 right-0 inline-block w-3 h-3 bg-custom-misc-online rounded-full"></span>
                    </div>
                </div>

                {/* username/level/class */}
                <div className="ml-4">
                    <p className="text-white">Player_123</p>
                    <p className="text-xs text-gray-300 font-semibold">Lv. 20 Warrior</p>
                </div>
            </div>

            {/* hp */}
            <div className="flex flex-row mt-3 text-sm text-white items-center justify-between">
                <p>HP</p>
                <div className="w-3/5 h-1 flex rounded-full bg-custom-bg-progress">
                    <div style={{ width: "60%" }} className="rounded-full bg-custom-stats-health"></div>
                </div>
                <p className="w-1/5 font-semibold">60/100</p>
            </div>

            {/* xp */}
            <div className="flex flex-row mt-3 text-sm text-white items-center justify-between">
                <p>XP</p>
                <div className="w-3/5 h-1 flex rounded-full bg-custom-bg-progress">
                    <div style={{ width: "52%" }} className="rounded-full bg-custom-stats-attack"></div>
                </div>
                <p className="w-1/5 font-semibold text-center">52%</p>
            </div>

            {/* stats */}
            <div className="flex flex-row justify-between items-center mt-3">
                <div className="flex items-center">
                    <GiPiercingSword size={16} />
                    <p className="ml-2">70</p>
                </div>
                <div className="flex items-center">
                    <GiCheckedShield size={16} />
                    <p className="ml-2">120</p>
                </div>
                <div className="flex items-center">
                    <GiRoundStar size={16} />
                    <p className="ml-2">35</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer
})

export default ProfileBar