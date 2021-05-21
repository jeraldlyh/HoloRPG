import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { GiLifeBar, GiMoneyStack, GiProgression, GiCrossedSwords, GiEdgedShield, GiAlliedStar } from "react-icons/gi"
import { getProfile } from "../../actions/profile"
import logo from "../../assets/power-button.jpeg"


function ProfileCard(props) {
    const { user, isAuthenticated } = props.auth
    const [userDetails, setUserDetails] = useState("")

    useEffect(() => {
        if (isAuthenticated) {
            props.getProfile(user.id)
            setUserDetails(props.profile.profile)
        }
    }, [user])

    if (isAuthenticated) {
        return (
            <div className="sticky top-20 flex flex-col w-60 h-96 rounded-lg bg-gray-900 border-2 border-custom-pink my-5 mx-10">
                <div className="p-3">
                    <img src={logo} alt={user.username} />
                    <p className="text-xl py-2 font-bold text-center">{user.username}</p>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 px-3">
                        <div className="flex gap-x-1 items-center">
                            <GiProgression size={32} />
                            <p className="w-full px-1">{userDetails.level}</p>
                        </div>
                        <div className="flex gap-x-1 items-center">
                            <GiMoneyStack size={32} />
                            <p className="w-full px-1">{userDetails.currency}</p>
                        </div>
                        <div className="flex gap-x-1 items-center">
                            <GiAlliedStar size={32} />
                            <p className="w-full px-1">{userDetails.reputation}</p>
                        </div>
                        <div className="flex gap-x-1 items-center">
                            <GiLifeBar size={32} />
                            <p className="w-full px-1">{userDetails.current_health}/{userDetails.max_health}</p>
                        </div>
                        <div className="flex gap-x-1 items-center">
                            <GiCrossedSwords size={32} />
                            <p className="w-full px-1">{userDetails.attack}</p>
                        </div>
                        <div className="flex gap-x-1 items-center">
                            <GiEdgedShield size={32} />
                            <p className="w-full px-1">{userDetails.defence}</p>
                        </div>
                        <p className="col-span-2">EXP bar maybe - {userDetails.experience}</p>
                    </div>
                </div>
            </div>
        )
    }
    return null
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
}) 

export default connect(mapStateToProps, { getProfile })(ProfileCard)