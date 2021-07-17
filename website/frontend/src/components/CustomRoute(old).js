import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProfile } from '../store/actions/Profile'
import { logoutUser } from '../store/actions/Auth'

function CustomRoute(props) {
    const { isLoading, isAuthenticated, user } = props.auth

    if (!isAuthenticated) {
        // props.logoutUser()
        return <Redirect to="/login" />
    } else if (isAuthenticated && !props.profile) {                     // Sets profile reducer just in case
        console.log("CALLED GET PROFILE IN CUSTOM ROUTE")
        props.getProfile(user)
    }
    //  else if (props.profile.character_class[0] === "Default") {        // User has yet to select a class
    //     return <Redirect to="/character" />
    // }
    return <Route {...props} />
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    profile: state.profileReducer.profile
})

const mapDispatchToProps = {
    getProfile,
    logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomRoute)