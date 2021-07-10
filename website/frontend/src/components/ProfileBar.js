import React from "react"
import { MdPerson, MdSettings } from "react-icons/md"
import { GiHumanTarget, GiCrossedSwords, GiMoneyStack, GiShop, GiAxeSwing } from "react-icons/gi"
import { connect } from "react-redux"
import { logoutUser } from "../store/actions/Auth"
// import attack - sword icon 138128' from "../assets/icons"

function NavBar() {
    return (
        // sidebar
        <div className="bg-custom-bg-nav text-white w-64 py-4 px-5 h-full fixed">

            {/* user profile */}
            <div className="flex items-center">

                {/* avatar */}
                <div className="relative inline-block w-16 h-16">
                    <img className="rounded-full border border-gray-300" src="https://icons.iconarchive.com/icons/thesquid.ink/free-flat-sample/64/rubber-duck-icon.png" alt="user image" />
                    <span class="absolute bottom-1.5 right-0 inline-block w-3 h-3 bg-custom-misc-online rounded-full"></span>
                </div>   

                {/* username/level/class */}   
                <div className="pl-4">
                    <p className="text-white font-normal">Player_123</p>
                    <p className="text-xs text-gray-300 font-semibold">Lv. 20 Warrior</p>
                </div>                
            </div>

            {/* hp */}
            <div className="relative pt-3 text-sm text-white">
                <p>HP</p> 
                <div className="overflow-hidden h-1 flex rounded bg-custom-bg-progress">
                    <div style={{ width: "60%" }} className="shadow-none flex flex-col bg-custom-stats-health"></div>
                </div>
                <p className="font-semibold">60/100</p>
            </div>
                
            {/* xp */}
            <div className="relative pt-3 text-sm text-white">
                <p>XP</p>
                <div className="overflow-hidden h-1 flex rounded bg-custom-bg-progress">
                    <div style={{ width: "52%" }} className="shadow-none flex flex-col bg-custom-stats-attack"></div>
                </div>
                <p className="font-semibold">52.60%</p>
            </div>

            {/* stats */}
            <div className="flex flex-row justify-between items-center mt-3">
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                    <p>70</p>
                </div>

                <div className="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.41 16.4"><defs><style>.cls-1{fill:#fff;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path id="sword_icon_138128" data-name="sword icon 138128" class="cls-1" d="M3.73,1.9H1.9l8.56,8.56.95-.9m4.72,5.77-.8.8a1,1,0,0,1-1.34,0h0l-3-3L8.47,15.69,7.13,14.35,8.48,13,0,4.52V0H4.52L13,8.48l1.35-1.35L15.7,8.47,13.16,11l3,3a.94.94,0,0,1,0,1.34Z"/></g></g></svg>
                120
                </div>

                <div>
                    <img></img>
                    <p>35</p>
                </div>
            </div>
            
            <div className="flex flex-col justify-center items-center">
                <hr className="border-custom-grey w-4/5 mt-3 "></hr>
            </div>

           
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer
})

export default NavBar