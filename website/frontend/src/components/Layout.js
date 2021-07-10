import React, { Fragment } from "react"
import NavBar from "./NavBar"
import Error from "./Error"
import ProfileBar from "./ProfileBar"
import Banner from "./Banner"


function Layout(props) {
    return (
        <div className="flex bg-custom-bg-main h-screen">
            <NavBar />
            <div className="flex flex-col w-full">
                <Banner />
                <Error />
                {props.children}
            </div>
            <ProfileBar />
        </div>
    )
}

export default Layout