import React, { Fragment } from "react"
import Footer from "./Footer"
import Header from "./Header"
import NavBar from "./NavBar"
import Error from "./Error"
import ProfileBar from "./ProfileBar"
import FriendBar from "./FriendBar"
import ProfileCard from "./ProfileCard"
import Banner from "./Banner"


function Layout(props) {
    return (
        <Fragment>
            <div className="flex flex-row">
                <NavBar />
                <Error />
                {props.children}

                <div className="w-14 bg-black h-min-screen"></div>
                <ProfileBar />
            </div>
        </Fragment>
    )
}

export default Layout