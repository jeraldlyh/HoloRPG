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
        <div className="flex flex-row bg-custom-bg-main h-screen">
            <NavBar />
            <div className="flex flex-col">
                <Banner />
                {props.children}
                <Error />
            </div>
            <ProfileBar />
            <div className="w-14 bg-black h-min-screen"></div>
        </div>
    )
}

export default Layout