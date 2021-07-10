import React from "react"
import { GiPiercingSword, GiCheckedShield, GiRoundStar } from "react-icons/gi"
import { FaUserFriends } from "react-icons/fa"
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
            <div className="flex mt-3 text-xs text-white items-center justify-between">
                <p>HP</p>
                <div className="w-3/5 h-1 flex rounded-full bg-custom-bg-progress">
                    <div style={{ width: "60%" }} className="rounded-full bg-custom-stats-health"></div>
                </div>
                <p className="w-1/5 text-left font-semibold">60/100</p>
            </div>

            {/* xp */}
            <div className="flex text-sm text-white items-center justify-between">
                <p>XP</p>
                <div className="w-3/5 h-1 flex rounded-full bg-custom-bg-progress">
                    <div style={{ width: "52%" }} className="rounded-full bg-custom-stats-attack"></div>
                </div>
                <p className="w-1/5 text-left font-semibold">52%</p>
            </div>

            {/* stats */}
            <div className="flex justify-between items-center mt-3 text-sm">
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

            {/* currency */}
            <div className="flex flex-col justify-center px-5 rounded-lg w-full h-16 mt-3 bg-gradient-to-r from-custom-currency-primary to-custom-currency-secondary">
                    <p className="text-xs font-medium">Currency</p>
                    <p className="text-9x1 font-semibold">$12,345.67</p>
            </div>
            
            {/* income stacked */}
            <div className="flex justify-between px-5 rounded-lg w-full h-24 mt-3 bg-custom-misc-cardlight">

                {/* timer */}
                <div className="flex flex-col items-center justify-center rounded-full w-20 h-20 border-2 border-white">
                    <p className="text-sm font-semibold">02:35</p>
                </div>

                {/* income */}
                <div className="flex flex-col items-center justify-center ml-2">
                    <p className="text-xs font-medium">Income Stacked</p>
                    <p className="text-9x1 font-semibold mb-1">$326.80</p>
                    <div className="w-24 h-7 pt-1.5 rounded-full bg-custom-button-primary text-center text-xs font-semibold">COLLECT</div>                   
                </div>       
            </div>

            <hr className="border-custom-grey w-full mt-5"></hr>

            {/* friends */}
            
            <div className="flex items-center mt-3 text-9x1 font-medium">
                <FaUserFriends size={16} />
                <p className="ml-3">Friends</p>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer
})

export default ProfileBar