import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

function AuthRoute(props) {
    const { isLoading, isAuthenticated } = props.auth

    if (!isAuthenticated) {
        return <Redirect to="/login" />
    }
    return <Route {...props} />
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(AuthRoute)