import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

function CustomRoute(props) {
    const { isLoading, isAuthenticated } = props.auth
    const { character } = props.profile

    if (!isAuthenticated) {
        return <Redirect to="/login" />
    } else if (character === "1") {
        return <Redirect to="/character" />
    }
    return <Route {...props} />
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile.profile
})

export default connect(mapStateToProps)(CustomRoute)