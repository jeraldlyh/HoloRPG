import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadUser } from "../actions/auth"

function AuthRoute(props) {
    const { isLoading, isAuthenticated } = props.auth

    useEffect(() => {
        if (isAuthenticated) {
            props.authenticateUser()
        } 
        // else {
        //     props.logoutUser()
        // }
    }, [])


    if (!isAuthenticated) {
        return <Redirect to="/login" />
    }
    return <Route {...props} />
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => {
    return {
        authenticateUser: () => dispatch(loadUser()),
        logoutUser: () => dispatch(logoutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute)