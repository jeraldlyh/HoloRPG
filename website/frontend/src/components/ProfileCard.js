import React, { useEffect } from "react"
import { connect } from "react-redux"
import { GiLifeBar, GiMoneyStack, GiProgression, GiCrossedSwords, GiEdgedShield, GiAlliedStar, GiBank } from "react-icons/gi"
import { getProfile } from "../store/actions/Profile"
import { claimIncome } from "../store/actions/Entity"
import NumberFormat from "react-number-format"


function ProfileCard(props) {
    const { user, isAuthenticated } = props.auth
    const { profile } = props.profile

    useEffect(() => {
        if (isAuthenticated) {
            props.getProfile(user)
        }
        return () => { }
    }, [])

    const claimIncome = (amount) => {
        props.claimIncome(user, amount)
            .then(response => {
                if (response.status === 200) {
                    props.getProfile(user)
                } else {
                    console.log("UNABLE TO CLAIM INCOME")
                }
            })
            .catch(error => console.log(error))
    }

    const hasStackedIncome = () => {
        return profile.income_accumulated === 0
    }

    if (isAuthenticated && profile) {
        return (
                <div className="sticky top-20 flex flex-col p-3 self-start items-center w-60 rounded-lg border-2 border-custom-pink my-5 mx-10">
                    <img className="w-36 h-36" src={profile.image} alt={user} />
                    <p className="text-xl py-0.5 font-bold text-center">{user}</p>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 px-3">
                        <div className="flex gap-x-1 items-center">
                            <GiProgression size={32} />
                            <p className="w-full px-1">{profile.level}</p>
                        </div>
                        <div className="flex gap-x-1 items-center">
                            <GiMoneyStack size={32} />
                            <p className="w-full px-1"><NumberFormat value={profile.currency} displayType={"text"} thousandSeparator={true} prefix={"$"}/></p>
                        </div>
                        <div className="flex gap-x-1 items-center">
                            <GiAlliedStar size={32} />
                            <p className="w-full px-1">{profile.reputation}</p>
                        </div>
                        <div className="flex gap-x-1 items-center">
                            <GiLifeBar size={32} />
                            <p className="w-full px-1">{profile.current_health}/{profile.max_health}</p>
                        </div>
                        <div className="flex gap-x-1 items-center">
                            <GiCrossedSwords size={32} />
                            <p className="w-full px-1">{profile.attack}</p>
                        </div>
                        <div className="flex gap-x-1 items-center">
                            <GiEdgedShield size={32} />
                            <p className="w-full px-1">{profile.defence}</p>
                        </div>
                        <div className="col-span-2 w-full">
                            <div className="flex gap-x-1 items-center w-full">
                                <GiBank size={32} />
                                <p className="px-1"><NumberFormat value={profile.income_accumulated} displayType={"text"} thousandSeparator={true} prefix={"$"}/></p>
                                <button className="rounded-full ml-4 p-1 text-center border-2 border-custom-pink focus:outline-none disabled:bg-red-500 bg-custom-green"  disabled={hasStackedIncome()} onClick={() => claimIncome(profile.income_accumulated)}>Collect</button>
                            </div>
                        </div>
                        <p className="col-span-2">EXP bar maybe - {profile.experience}</p>
                    </div>
                </div>
        )
    }
    return null
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    profile: state.profileReducer
}) 

export default connect(mapStateToProps, { getProfile, claimIncome })(ProfileCard)