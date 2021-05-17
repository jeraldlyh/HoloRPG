import React, { useState, useEffect } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { getProfile } from "../../actions/profile"


function ProfileCard(props) {
    const { user } = props.auth
    const [userDetails, setUserDetails] = useState("")

    useEffect(() => {
        props.getProfile(user.id)
        setUserDetails(props.profile.profile)
    }, [userDetails])

    return (
        <div className="flex place-content-center">
            <div className="rounded rounded-lg bg-gray-900 border-1 border-red-500 my-5 mx-10">
                <div className="max-w-full">
                    <h2 className="font-bold">{userDetails.level}aaaaaaa</h2>
                    <p className="mt-2">{user.username}</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
}) 

export default connect(mapStateToProps, { getProfile })(ProfileCard)