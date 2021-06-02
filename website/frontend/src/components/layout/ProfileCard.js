import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { GiLifeBar, GiMoneyStack, GiProgression, GiCrossedSwords, GiEdgedShield, GiAlliedStar } from "react-icons/gi"
import { getProfile } from "../../actions/profile"


function ProfileCard(props) {
    const { user, isAuthenticated } = props.auth
    const { profile } = props.profile
    const [userDetails, setUserDetails] = useState("")
    var isMounted = true

    useEffect(() => {                       // componentDidMount -> Retrieves profile data
        if (isAuthenticated) {
            if (!profile) {
                props.getProfile(user)
            }
        }
        return () => { isMounted = false }      // componentWillUnmount
    }, [])

    useEffect(() => {           // componentDidUpdate -> Sets profile data
        if (isMounted && profile) {
            setUserDetails(profile)
        }
    }, [profile])

    if (isAuthenticated && userDetails) {
        return (
                <div className="sticky top-20 flex flex-col p-3 self-start items-center w-60 rounded-lg border-2 border-custom-pink my-5 mx-10">
                    <img className="w-36 h-36" src={userDetails.image} alt={user} />
                    <p className="text-xl py-0.5 font-bold text-center">{user}</p>
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
        )
    }
    return null
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
}) 

export default connect(mapStateToProps, { getProfile })(ProfileCard)