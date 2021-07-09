import React, { Fragment } from "react"
import Footer from "./Footer"
import Header from "./Header"
import NavBar from "./NavBar"
import Error from "./Error"
import FriendBar from "./FriendBar"
import ProfileCard from "./ProfileCard"


function Layout(props) {
    return (
        <Fragment>
            <NavBar />
            <div className="flex flex-row mx-10 min-h-screen items-center justify-around">
                <Error />
                <FriendBar />
                { props.children }
                <ProfileCard />
            </div>
            <Footer />
        </Fragment>
    )
}

export default Layout