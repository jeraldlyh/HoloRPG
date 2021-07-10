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
            <div className="flex flex-row">
                <NavBar />
                <Error />
                {props.children}

                <div className="w-14 bg-black h-min-screen"></div>
            </div>
        </Fragment>
    )
}

export default Layout