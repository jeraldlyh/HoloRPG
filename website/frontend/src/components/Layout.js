import React from "react"
import NavBar from "./NavBar"
import Error from "./Error(old)"
import ProfileBar from "./ProfileBar"
import Banner from "./Banner"


function Layout(props) {
    return (
        <div className="flex bg-custom-bg-main h-screen">
            <NavBar />
            <div className="flex flex-col w-full h-full">
                <Banner />
                <Error />
                <div className="flex p-3 w-full h-full overflow-hidden">
                    {props.children}
                </div>
            </div>
            <ProfileBar />
        </div>
    )
}

export default Layout