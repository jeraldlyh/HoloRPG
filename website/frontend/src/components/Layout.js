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
                <div className="p-3 h-full w-full overflow-hidden">
                    {props.children}
                </div>
            </div>
            <ProfileBar />
        </div>
    )
}

export default Layout