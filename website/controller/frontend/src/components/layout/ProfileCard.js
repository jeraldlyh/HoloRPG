import React, { useState, useEffect } from "react"
import axios from "axios"
import { connect } from "react-redux"


function ProfileCard(props) {
    const { user } = props.auth

    const [userDetails, setUserDetails] = useState({
        username: "",
        level: "",
        experience: "",
        currency: "",
        reputation: "",
        max_health: "",
        current_health: "",
        attack: "",
        defence: ""
    })

    useEffect(async () => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await axios.get(`http://localhost:8000/api/useraccount/${user.username}`, config)
            .then(console.log(response))
            .then(setUserDetails(response.data))
            .catch(error => console.log(error))
    })

    return (
        <div className="max-w py-4 px-8 my-20 bg-gray-900 shadow-lg rounded-lg">
            <div>
                <h2 className="font-bold">{userDetails.username}</h2>
                <p className="mt-2">{userDetails.level}</p>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
}) 

export default connect(mapStateToProps)(ProfileCard)