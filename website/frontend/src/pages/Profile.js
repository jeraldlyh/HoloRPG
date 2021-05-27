import React, { Fragment } from "react"
import Header from "../layout/Header"
import Footer from "../layout/Footer"
import ProfileCard from "../layout/ProfileCard"


function Profile() {
    return (
        <Fragment>
            <Header />
            <ProfileCard />
            <Footer />
        </Fragment>
    )
}

export default Profile